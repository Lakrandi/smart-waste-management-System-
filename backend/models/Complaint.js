const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  district: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved'], 
    default: 'Pending' 
  },
  isRated: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);