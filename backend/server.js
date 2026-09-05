const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db.js');

const app = express();
const server = http.createServer(app);

// Socket.io Configuration
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling']
});

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Tracking Schema & Model
const trackingSchema = new mongoose.Schema({
  district: { type: String, required: true, unique: true },
  status: { type: String, default: 'Disconnected' },
  isTracking: { type: Boolean, default: false },
  lat: { type: Number, default: 6.9271 },
  lng: { type: Number, default: 79.8612 },
  updatedAt: { type: Date, default: Date.now }
});

const TrackingModel = mongoose.models.Tracking || mongoose.model('Tracking', trackingSchema);

// Memory state fallback
let truckLocation = { 
  lat: 6.9271, 
  lng: 79.8612, 
  isTracking: false, 
  status: 'Disconnected', 
  district: 'Gampaha' 
};

// Socket.io Real-time Event Handlers
io.on('connection', async (socket) => {
  console.log(`Client Connected: ${socket.id}`);

  // Send active tracking data from MongoDB immediately upon client connect/refresh
  try {
    const activeRecord = await TrackingModel.findOne({ isTracking: true });
    if (activeRecord) {
      socket.emit('locationUpdate', {
        lat: activeRecord.lat,
        lng: activeRecord.lng,
        isTracking: true,
        status: activeRecord.status,
        district: activeRecord.district
      });
    }
  } catch (err) {
    console.error('Error fetching DB state on connection:', err);
  }

  // Location Broadcast Handler
  const handleLocationUpdate = async (data) => {
    if (!data || data.lat === undefined || data.lng === undefined) return;

    const targetDistrict = data.district || 'Gampaha';
    const payload = {
      lat: data.lat,
      lng: data.lng,
      isTracking: true,
      status: 'On Route',
      district: targetDistrict
    };

    // Broadcast to all clients
    io.emit('locationUpdate', payload);

    // Save to MongoDB with Case-Insensitive District Matching
    try {
      await TrackingModel.findOneAndUpdate(
        { district: { $regex: new RegExp(`^${targetDistrict}$`, 'i') } },
        { 
          district: targetDistrict,
          lat: data.lat, 
          lng: data.lng, 
          isTracking: true, 
          status: 'On Route', 
          updatedAt: new Date() 
        },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.error('Error auto-saving location to DB:', err);
    }
  };

  socket.on('locationUpdate', handleLocationUpdate);
  socket.on('updateLocation', handleLocationUpdate);

  // Stop Event Handler
  socket.on('stopLocation', async (data) => {
    const targetDistrict = data?.district || 'Gampaha';

    try {
      await TrackingModel.findOneAndUpdate(
        { district: { $regex: new RegExp(`^${targetDistrict}$`, 'i') } },
        { status: 'Disconnected', isTracking: false, updatedAt: new Date() }
      );
    } catch (err) {
      console.error('Error updating stop status in DB:', err);
    }

    io.emit('driverStopped', { district: targetDistrict });
  });

  socket.on('disconnect', () => {
    console.log(`Client Disconnected: ${socket.id}`);
  });
});

// Location API Routes
app.post('/api/location/status', async (req, res) => {
  try {
    const { status, isTracking, district, lat, lng } = req.body;
    const targetDistrict = district || 'Gampaha';

    const updateData = { 
      status: status, 
      isTracking: isTracking, 
      district: targetDistrict,
      updatedAt: new Date() 
    };

    if (lat !== undefined && lng !== undefined) {
      updateData.lat = lat;
      updateData.lng = lng;
    }

    await TrackingModel.findOneAndUpdate(
      { district: { $regex: new RegExp(`^${targetDistrict}$`, 'i') } },
      updateData,
      { upsert: true, new: true }
    );

    // Broadcast Socket Event when status changes via REST API
    if (isTracking) {
      io.emit('locationUpdate', {
        lat: lat || 6.9271,
        lng: lng || 79.8612,
        isTracking: true,
        status: status,
        district: targetDistrict
      });
    } else {
      io.emit('driverStopped', { district: targetDistrict });
    }

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Failed to update tracking status' });
  }
});

app.get('/api/location/status/:district', async (req, res) => {
  try {
    const { district } = req.params;
    const record = await TrackingModel.findOne({ 
      district: { $regex: new RegExp(`^${district}$`, 'i') } 
    });

    if (!record) {
      return res.json({ status: 'Disconnected', isTracking: false, lat: 6.9271, lng: 79.8612 });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({ error: 'Failed to fetch tracking status' });
  }
});

// Service Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/waste', require('./routes/WasteRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/schedules', require('./routes/scheduleRoutes'));
app.use('/api/schedule', require('./routes/scheduleRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/sms', require('./routes/smsRoute'));

app.get('/', (req, res) => {
  res.send('CleanTrack API is running...');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));