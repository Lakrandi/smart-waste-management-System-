const express = require('express');
const router = express.Router();

const {
  createFeedback,
  getAllFeedbacks,
  deleteFeedback
} = require('../controllers/feedbackController');

const { protect } = require('../middleware/authMiddleware');

// Resident submits feedback
router.post('/', protect, createFeedback);
router.post('/create', protect, createFeedback);

// Admin views feedback
router.get('/all', getAllFeedbacks);
router.get('/', getAllFeedbacks);

// Delete feedback
router.delete('/delete/:id', protect, deleteFeedback);
router.delete('/:id', protect, deleteFeedback);

module.exports = router;