const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { name: user.name, email: user.email } });
  res.status(400).json({ error: 'User already exists' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ 
      token,
      user: { 
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.editProfile = async (req, res) => {
    const { name, email } = req.body;
    const userId = req.userId;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email },
        { new: true }
      );
      res.json({ name: updatedUser.name, email: updatedUser.email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update profile" });
    }
  };
  module.exports = {
    signup: exports.signup,
    login: exports.login,
    editProfile: exports.editProfile
  };