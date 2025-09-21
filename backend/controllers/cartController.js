//cartCotroller.js
import Cart from '../models/Cart.js';
import Vehicle from '../models/Vehicle.js';
import User from '../models/User.js';


// Add item to cart
export const addItemToCart = async (req, res) => {
    const { vehicleId, userId, quantity } = req.body;

    if (!vehicleId || !userId || !quantity) {
        return res.status(400).json({ message: 'Vehicle ID, User ID and quantity are required.' });
    }

    try {
        // Find the vehicle
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found.' });
        }

        // Find or create the cart for the user
        let user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the item already exists in the cart
        const existingItemIndex = cart.items.findIndex(item => item.vehicle.toString() === vehicleId);

        if (existingItemIndex > -1) {
            // Update existing item quantity
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].price = vehicle.price * cart.items[existingItemIndex].quantity;
        } else {
            // Add new item to cart
            cart.items.push({
                vehicle: vehicleId,
                quantity,
                price: vehicle.price * quantity,
            });
        }
        // Save the cart
        await cart.save();
        res.status(200).json({ message: 'Item added to cart successfully.', cart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get all items in cart
export const getCartItems = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.vehicle');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
    const { itemId } = req.params;

    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        // Find the item index
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart.' });
        }

        // Remove the item
        cart.items.splice(itemIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart successfully.', cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        // Clear the cart items
        cart.items = [];

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Cart cleared successfully.', cart });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update item quantity in cart
export const updateItemQuantity = async (req, res) => {
    const { itemId, quantity } = req.body;

    if (!itemId || !quantity) {
        return res.status(400).json({ message: 'Item ID and quantity are required.' });
    }

    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        // Find the item index
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart.' });
        }

        // Update the item quantity
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].price = cart.items[itemIndex].vehicle.price * quantity;

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Item quantity updated successfully.', cart });
    } catch (error) {
        console.error('Error updating item quantity:', error);
        res.status(500).json({ message: 'Server error' });
    }
};