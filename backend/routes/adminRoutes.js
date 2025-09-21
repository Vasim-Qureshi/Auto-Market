// File: routes/adminRoutes.js
import express from 'express';
import {
  addVehicle,
  getAdminStats,
  updateVehicle,
  deleteVehicle,
  getAllVehicles
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { createVehicle } from '../controllers/vehicleController.js';

const router = express.Router();

router.post('/vehicles', protect, adminOnly, createVehicle);
router.put('/vehicles/:id', protect, adminOnly, updateVehicle);
router.delete('/vehicles/:id', protect, adminOnly, deleteVehicle);
router.get('/vehicles', protect, adminOnly, getAllVehicles);
router.get('/stats', protect, adminOnly, getAdminStats);

export default router;
