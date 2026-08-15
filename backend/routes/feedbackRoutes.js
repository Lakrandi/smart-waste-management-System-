const express = require('express');
const router = express.Router();
const { 
  createFeedback, 
  getAllFeedbacks, 
  deleteFeedback 
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createFeedback);
router.get('/all', protect, getAllFeedbacks);
router.delete('/delete/:id', protect, deleteFeedback);

module.exports = router;