const Complaint = require('../models/Complaint');

// 1. Create a new complaint (Resident)
exports.createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newComplaint = new Complaint({
      user: req.user._id,
      title,
      description
    });
    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully", data: newComplaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get complaints of logged-in user (Resident)
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get all complaints (Admin View)
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Update complaint status (Admin)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status || complaint.status;
    await complaint.save();

    res.json({ message: "Complaint status updated successfully", data: complaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};