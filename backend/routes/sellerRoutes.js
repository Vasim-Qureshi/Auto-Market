// File: routes/adminRoutes.js
import express from 'express';
import {
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getVehiclesBySeller,
} from '../controllers/sellerController.js';
import { protect, sellerOnly } from '../middleware/authMiddleware.js';
import { createVehicle } from '../controllers/vehicleController.js';

const router = express.Router();

router.post('/vehicles', protect, sellerOnly, createVehicle);
router.put('/vehicles/:id', protect, sellerOnly, updateVehicle);
router.delete('/vehicles/:id', protect, sellerOnly, deleteVehicle);
router.get('/vehicles', protect, sellerOnly, getVehiclesBySeller);

export default router;
