const WasteRequest = require('../models/WasteRequest');

// create the request
exports.createRequest = async (req, res) => {
  try {
    const newRequest = new WasteRequest({
      user: req.user._id, 
      wasteType: req.body.wasteType,
      address: req.body.address
    });
    await newRequest.save();
    res.status(201).json({ message: "Request created successfully", data: newRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await WasteRequest.find({ user: req.user._id });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};