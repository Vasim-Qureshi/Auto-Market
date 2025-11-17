import express from 'express';
import { signup, login, logout, me, updatePassword,sendOTP,verifyOTP } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// Authentication routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, me);
// router.get('/profile', protect, getProfile);
router.post('/send-otp', sendOTP); // Send OTP to user's phone
router.post('/verify-otp', verifyOTP); // Verify OTP sent to user's phone
router.put('/update-password', protect, updatePassword); // Update password with OTP verification

export default router;
