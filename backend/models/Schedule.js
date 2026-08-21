const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
    enum: [
      "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", 
      "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", 
      "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", 
      "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", 
      "Trincomalee", "Vavuniya"
    ]
  },
  date: {
    type: String,
    required: true
  },
  day: {
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
  }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);