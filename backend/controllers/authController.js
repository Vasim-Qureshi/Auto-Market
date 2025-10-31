import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyOTPbyPhone } from '../utils/twilio.js'; // Assuming you have a utility to verify OTPs
import { sendOTPbyPhone } from '../utils/twilio.js'; // Assuming you have a utility to send OTPs
import bcrypt from 'bcrypt';

const generateToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const signup = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const password = bcrypt.hashSync(req.body.password, 10);
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.create({ name, email, phone, password, role });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const comparePassword = bcrypt.compareSync(password, user.password);
    // console.log('User:', user, 'Password Match:', comparePassword);
    if (!user || !comparePassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user), user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Send OTP to user's phone number
export const sendOTP = async (req, res) => {
  const { phone } = req.body;
  try {
    const otp = await sendOTPbyPhone(phone);
    res.json({ message: 'OTP sent successfully', otp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify OTP sent to user's phone number
export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const isValid = await verifyOTPbyPhone(phone, otp);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update password with twilio verification , when update password than send otp to user phone number and verify it
export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { password, otp } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Verify OTP
    const isValid = await verifyOTP(user.phone, otp);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.password = password;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
