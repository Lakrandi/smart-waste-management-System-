const express = require('express');
const router = express.Router();
const { 
  createComplaint, 
  getMyComplaints, 
  getAllComplaints, 
  updateComplaintStatus 
} = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

// Resident Routes
router.post('/create', protect, createComplaint);
router.get('/my-complaints', protect, getMyComplaints);

// Admin Routes
router.get('/all', protect, getAllComplaints);
router.put('/update/:id', protect, updateComplaintStatus);

module.exports = router;