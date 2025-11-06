// File: controllers/adminController.js
import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';
import Proposal from '../models/Proposal.js';
// Add new vehicle
export const addVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    const saved = await vehicle.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add vehicle' });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVehicles = await Vehicle.countDocuments();
    const totalProposals = await Proposal.countDocuments();

    const salesData = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: '$totalAmount' } } }
    ]);

    const totalSales = salesData[0]?.totalSales || 0;

    res.json({
      totalUsers,
      totalVehicles,
      totalProposals,
      totalSales
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load admin stats' });
  }
};


// Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update vehicle' });
  }
};

// Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete vehicle' });
  }
};

// Get all vehicles (for admin dashboard)
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
};
