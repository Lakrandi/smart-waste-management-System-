const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  area: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  timeSlot: { 
    type: String, 
    required: true 
  },
  wasteType: { 
    type: String, 
    required: true 
  },
  driverName: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Scheduled', 'In Progress', 'Completed'], 
    default: 'Scheduled' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);