const Schedule = require('../models/Schedule');

// 1. Create a new schedule (Admin)
exports.createSchedule = async (req, res) => {
  try {
    const { district, area, date, timeSlot, wasteType, driverName } = req.body;

    if (!district) {
      return res.status(400).json({ message: "District is required" });
    }

    const newSchedule = new Schedule({
      district,
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
    const { district } = req.query;
    const filter = district ? { district } : {};

    const schedules = await Schedule.find(filter).sort({ createdAt: -1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Update schedule status / details (Admin)
exports.updateScheduleStatus = async (req, res) => {
  try {
    const { status, district, area, date, timeSlot, wasteType, driverName } = req.body;
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    schedule.status = status || schedule.status;
    schedule.district = district || schedule.district;
    schedule.area = area || schedule.area;
    schedule.date = date || schedule.date;
    schedule.timeSlot = timeSlot || schedule.timeSlot;
    schedule.wasteType = wasteType || schedule.wasteType;
    schedule.driverName = driverName || schedule.driverName;

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