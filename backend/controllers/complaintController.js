const Complaint = require('../models/Complaint');

// 1. Create a new complaint (Resident)
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, district } = req.body;
    
    // If district is not provided in the request body, use the district from the logged-in user's profile
    const userDistrict = district || req.user?.district;

    if (!userDistrict) {
      return res.status(400).json({ message: "District is required to submit a complaint" });
    }

    const newComplaint = new Complaint({
      user: req.user._id,
      title,
      description,
      district: userDistrict
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

// 3. Get all complaints with District Filtering (Admin View)
exports.getAllComplaints = async (req, res) => {
  try {
    const { district } = req.query;
    let query = {};

    // If a district is provided in the query, filter complaints by that district
    if (district) {
      query.district = district;
    }

    const complaints = await Complaint.find(query)
      .populate('user', 'name email district')
      .sort({ createdAt: -1 });

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