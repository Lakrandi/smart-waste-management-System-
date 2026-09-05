const Complaint = require('../models/Complaint');


// 1. CREATE COMPLAINT - Resident
 
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, district } = req.body;

    // Logged-in user's district can also be used
    const userDistrict = district || req.user?.district;

    if (!userDistrict) {
      return res.status(400).json({
        message: "District is required to submit a complaint"
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const newComplaint = new Complaint({
      user: req.user._id,
      title,
      description,
      district: userDistrict
    });

    await newComplaint.save();

    return res.status(201).json({
      message: "Complaint submitted successfully",
      data: newComplaint
    });

  } catch (error) {
    console.error("Create complaint error:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};


 
// 2. GET LOGGED-IN USER'S COMPLAINTS

exports.getMyComplaints = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    const userId = req.user._id || req.user.id;

    const complaints = await Complaint.find({
      user: userId
    }).sort({
      createdAt: -1
    });

    return res.status(200).json(complaints);

  } catch (error) {
    console.error("Get my complaints error:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};


 
// 3. GET LOGGED-IN USER'S RESOLVED COMPLAINTS
//Only complaints that have NOT been rated
 
exports.getMyResolvedComplaints = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    const userId = req.user._id || req.user.id;

    const resolvedComplaints = await Complaint.find({
      user: userId,

      status: {
        $regex: /^resolved$/i
      },

      isRated: {
        $ne: true
      }

    }).sort({
      createdAt: -1
    });

    return res.status(200).json(resolvedComplaints);

  } catch (error) {
    console.error("Get resolved complaints error:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};


 
// 4. GET ALL COMPLAINTS - Admin
//Can filter by district
 
exports.getAllComplaints = async (req, res) => {
  try {
    const { district } = req.query;

    const query = {};

    if (district) {
      query.district = district;
    }

    const complaints = await Complaint.find(query)
      .populate(
        'user',
        'name email district'
      )
      .sort({
        createdAt: -1
      });

    return res.status(200).json(complaints);

  } catch (error) {
    console.error("Get all complaints error:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};


 
// 5. UPDATE COMPLAINT STATUS - Admin
 
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    const validStatuses = [
      'Pending',
      'In Progress',
      'Resolved'
    ];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid complaint status"
      });
    }

    if (status) {
      complaint.status = status;
    }

    await complaint.save();

    return res.status(200).json({
      message: "Complaint status updated successfully",
      data: complaint
    });

  } catch (error) {
    console.error("Update complaint status error:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};