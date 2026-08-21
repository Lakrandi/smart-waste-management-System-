const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register Logic
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, district } = req.body;

    if (!district) {
      return res.status(400).json({ message: 'District is required' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'resident',
      district
    });

    await user.save();

    // Generate JWT Token with district and role
    const token = jwt.sign(
      { id: user._id, role: user.role, district: user.district },
      process.env.JWT_SECRET || 'cleantrack_secret_key',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        district: user.district
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Login Logic
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    // Generate JWT Token including district inside payload
    const token = jwt.sign(
      { id: user._id, role: user.role, district: user.district },
      process.env.JWT_SECRET || 'cleantrack_secret_key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        district: user.district
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};