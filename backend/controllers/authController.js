import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyOTPbyPhone, sendOTPbyPhone } from '../utils/twilio.js';
import bcrypt from 'bcrypt';

// Generate JWT token
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

// ============================
// SIGNUP
// ============================
export const signup = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashed = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashed,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================
// LOGIN with HttpOnly cookie
// ============================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = bcrypt.compareSync(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    // Set HttpOnly Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,       // set false in localhost
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
      message: "Login successful",
      user: { ...user._doc, password: undefined },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================
// /api/logout - Clear cookie
// ============================
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// ============================
// /api/me - Get user from token
// ============================
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================
// SEND OTP
// ============================
export const sendOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    const otp = await sendOTPbyPhone(phone);
    res.json({ message: "OTP sent successfully", otp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================
// VERIFY OTP
// ============================
export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const isValid = await verifyOTPbyPhone(phone, otp);
    if (!isValid)
      return res.status(400).json({ message: "Invalid OTP" });

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================
// UPDATE PASSWORD with OTP
// ============================
export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const { password, otp } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Verify OTP
    const isValid = await verifyOTPbyPhone(user.phone, otp);
    if (!isValid)
      return res.status(400).json({ message: "Invalid OTP" });

    // Update Password
    user.password = bcrypt.hashSync(password, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
