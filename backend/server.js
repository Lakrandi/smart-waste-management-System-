const express = require('express');
const http = require('http'); // 1. Import HTTP Server module
const { Server } = require('socket.io'); // 2. Import Socket.io
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.js');

const app = express();
const server = http.createServer(app); // 3. Wrap Express app with HTTP server

// 4. Socket.io Configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React Frontend URL
    methods: ["GET", "POST"]
  }
});

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// 5. Socket.io Live Tracking Logic
let truckLocation = { lat: 6.9271, lng: 79.8612 }; // Default Initial Location (Colombo)

io.on('connection', (socket) => {
  console.log(`Client Connected: ${socket.id}`);

  // Send current location to newly connected client
  socket.emit('locationUpdate', truckLocation);

  // Listen for coordinates from truck / simulator
  socket.on('updateLocation', (data) => {
    truckLocation = { lat: data.lat, lng: data.lng };
    // Broadcast updated location to all connected clients in real-time
    io.emit('locationUpdate', truckLocation);
  });

  socket.on('disconnect', () => {
    console.log(`Client Disconnected: ${socket.id}`);
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.send('CleanTrack API is running...');
});

const PORT = process.env.PORT || 5000;

// 6. Use server.listen instead of app.listen
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));