const Schedule = require('../models/Schedule');

// 1. Create a new schedule (Admin)
exports.createSchedule = async (req, res) => {
  try {
    const { area, date, timeSlot, wasteType, driverName } = req.body;
    const newSchedule = new Schedule({
      area,
      date,
      timeSlot,
      wasteType,
      driverName
    });
    await newSchedule.save();
    res.status(201).json({ message: "Schedule created successfully", data: newSchedule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get all schedules (Residents & Admin)
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ createdAt: -1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Update schedule status (Admin)
exports.updateScheduleStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    schedule.status = status || schedule.status;
    await schedule.save();

    res.json({ message: "Schedule updated successfully", data: schedule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Delete schedule (Admin)
exports.deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};