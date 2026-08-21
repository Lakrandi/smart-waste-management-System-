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
router.post('/', protect, createComplaint);
router.get('/my', protect, getMyComplaints);

// Admin Routes
router.get('/all', protect, getAllComplaints);
router.get('/', protect, getAllComplaints);
router.put('/update/:id', protect, updateComplaintStatus);
router.put('/:id', protect, updateComplaintStatus);

module.exports = router;