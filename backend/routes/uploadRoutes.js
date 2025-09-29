// routes/uploadRoutes.js
import express from 'express';
// import upload from '../middleware/uploadMiddleware.js';
import upload from '../middleware/cloudinaryMiddleware.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Local upload route
router.post('/image', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  // const imageUrl = `/uploads/${req.file.filename}`;
  const baseUrl = 'https://res.cloudinary.com/duzg7qsjz/image/upload/';
  const imagePath = 'v1759081342/vehicles/' + req.file.filename; // Adjust based on your Cloudinary folder structure
  const imageUrl = baseUrl + imagePath;
  res.json({ imageUrl });
});

// Cloudinary upload route
router.post("/image/cloudinary", protect, adminOnly, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  console.log('Uploaded file info:', req.file); // Debugging line
  console.log('Cloudinary URL:', req.file.path); // Debugging line

  res.json({ imageUrl: req.file.path }); // Cloudinary ka URL
});


export default router;
