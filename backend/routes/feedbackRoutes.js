const express = require('express');
const router = express.Router();
const { 
  createFeedback, 
  getAllFeedbacks, 
  deleteFeedback 
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

// Resident Routes (Supports both / and /create)
router.post('/', protect, createFeedback);
router.post('/create', protect, createFeedback);

// Admin Routes (Supports both / and /all)
router.get('/all', protect, getAllFeedbacks);
router.get('/', protect, getAllFeedbacks);

// Delete Route
router.delete('/delete/:id', protect, deleteFeedback);
router.delete('/:id', protect, deleteFeedback);

module.exports = router;