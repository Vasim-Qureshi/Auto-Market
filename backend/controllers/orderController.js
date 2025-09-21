import Order from '../models/Order.js';
import Vehicle from '../models/Vehicle.js';

export const createOrder = async (req, res) => {
  const { vehicles } = req.body; // Expect array of { vehicleId }

  try {
    const fetchedVehicles = await Vehicle.find({
      _id: { $in: vehicles.map(v => v.vehicleId) }
    });

    const orderItems = fetchedVehicles.map(v => ({
      vehicleId: v._id,
      price: v.price
    }));

    const totalAmount = orderItems.reduce((acc, item) => acc + item.price, 0);

    const order = await Order.create({
      user: req.user._id,
      vehicles: orderItems,
      totalAmount
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('vehicles.vehicleId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
