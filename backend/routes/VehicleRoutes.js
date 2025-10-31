import express from 'express';
import {
  getVehiclesByCategory,
  getVehiclesBySubcategory,
  getVehicleDetails,
  getAllVehicles,
  // getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController.js';
import { protect, adminOnly, buyerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllVehicles);
// router.get('/:id', getVehicleById);
router.get('/category/:type', protect, buyerOnly, getVehiclesByCategory);
router.get('/subcategory/:subtype', getVehiclesBySubcategory);
router.get('/:id', protect, buyerOnly, getVehicleDetails); // must be last

// Admin Routes
router.post('/', protect, adminOnly, createVehicle);
router.put('/:id', protect, adminOnly, updateVehicle);
router.delete('/:id', protect, adminOnly, deleteVehicle);

export default router;
