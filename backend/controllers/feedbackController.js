const Feedback = require('../models/Feedback');

// 1. Submit new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { rating, comment, serviceType, complaintId, type } = req.body;

    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    const newFeedback = new Feedback({
      user: req.user._id || req.user.id,
      rating: Number(rating),
      comment: comment || '',
      serviceType: serviceType || type || (complaintId ? 'Complaint' : 'General'),
      complaint: complaintId || null
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", data: newFeedback });
  } catch (error) {
    console.error("Feedback creation error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 2. Get all feedbacks (Admin & Users)
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};