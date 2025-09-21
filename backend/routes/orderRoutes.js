import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createOrder, getUserOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);

export default router;
