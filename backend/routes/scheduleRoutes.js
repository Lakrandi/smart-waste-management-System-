const express = require('express');
const router = express.Router();
const { 
  getSchedules, 
  addSchedule, 
  deleteSchedule 
} = require('../controllers/scheduleController');

// Get Schedules
router.get('/', getSchedules);
router.get('/all', getSchedules);

// Add Schedule
router.post('/', addSchedule);
router.post('/create', addSchedule);

// Delete Schedule
router.delete('/:id', deleteSchedule);
router.delete('/delete/:id', deleteSchedule);

module.exports = router;