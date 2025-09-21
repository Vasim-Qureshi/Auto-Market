// File: backend/routes/cartRoutes.js
import { Router } from 'express';
import { addItemToCart, getCartItems, removeItemFromCart, updateItemQuantity, clearCart } from '../controllers/cartController.js'; // Placeholder for actual controller functions

const router = Router();

// Add item to cart
router.post('/add', addItemToCart);

// Get all items in cart
router.get('/', getCartItems);

// Remove item from cart
router.delete('/remove/:itemId', removeItemFromCart);

// Update item quantity
router.put('/update/:itemId', updateItemQuantity);

// Clear cart
router.delete('/clear', clearCart);

export default router;