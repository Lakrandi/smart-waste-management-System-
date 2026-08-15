const express = require('express');
const router = express.Router();
const { 
  createSchedule, 
  getAllSchedules, 
  updateScheduleStatus, 
  deleteSchedule 
} = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createSchedule);
router.get('/all', protect, getAllSchedules);
router.put('/update/:id', protect, updateScheduleStatus);
router.delete('/delete/:id', protect, deleteSchedule);

module.exports = router;