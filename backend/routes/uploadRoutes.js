// routes/uploadRoutes.js
import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/upload/image
router.post('/image', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

export default router;
