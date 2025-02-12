//authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Authentication = require('../models/Authentication');

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const userExists = await Authentication.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const user = new Authentication({ name, email, password, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.MONGO_URI, { expiresIn: '30d' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required.' });
  }

  try {
    const user = await Authentication.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.MONGO_URI, { expiresIn: '30d' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
