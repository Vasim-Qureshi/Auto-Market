// routes/uploadRoutes.js
import express from 'express';
// import upload from '../middleware/uploadMiddleware.js';
import upload from '../middleware/cloudinaryMiddleware.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Local upload route
router.post('/image', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Cloudinary upload route
router.post("/image/cloudinary", protect, adminOnly, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ imageUrl: req.file.path }); // Cloudinary ka URL
});


export default router;
