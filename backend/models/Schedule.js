const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  district: { type: String, required: true },
  area: { type: String },
  date: { type: String, required: true },
  day: { type: String, required: true },
  timeSlot: { type: String, required: true },
  wasteType: { type: String, required: true },
  driverName: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);