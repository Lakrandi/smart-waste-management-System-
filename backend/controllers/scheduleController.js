const Schedule = require('../models/Schedule');

// 1. Get schedules (supports district filtering)
exports.getSchedules = async (req, res) => {
  try {
    const { district } = req.query;
    let filter = {};

    if (district) {
      filter.district = { $regex: new RegExp(district, 'i') };
    }

    const schedules = await Schedule.find(filter).sort({ createdAt: -1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Add new schedule
exports.addSchedule = async (req, res) => {
  try {
    const { district, area, date, timeSlot, wasteType, day, driverName } = req.body;

    const calculatedDay = day || (date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long' }) : 'Monday');

    const newSchedule = new Schedule({
      district,
      area,
      date,
      day: calculatedDay,
      timeSlot,
      wasteType,
      driverName
    });

    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};