// routes/uploadRoutes.js
import express from 'express';
// import upload from '../middleware/uploadMiddleware.js';
import upload from '../middleware/cloudinaryMiddleware.js';
import { protect, adminOnly, sellerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();


// Cloudinary upload route
router.post("/admin/image/cloudinary", protect, adminOnly, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  // console.log('Uploaded file info:', req.file); // Debugging line
  // console.log('Cloudinary URL:', req.file.path); // Debugging line

  res.json({ imageUrl: req.file.path }); // Cloudinary ka URL
});

router.post("/seller/image/cloudinary", protect, sellerOnly, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  // console.log('Uploaded file info:', req.file); // Debugging line
  // console.log('Cloudinary URL:', req.file.path); // Debugging line

  res.json({ imageUrl: req.file.path }); // Cloudinary ka URL
});




export default router;
