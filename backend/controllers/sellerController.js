// File: controllers/adminController.js
import Vehicle from '../models/Vehicle.js';

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

// Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update vehicle' });
  }
};

// Delete vehicle
export const deleteVehicle = async (req, res) => {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
  if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

  res.json({ message: 'Vehicle deleted successfully' });
};

// ✅ Get all vehicles for a particular seller
export const getVehiclesBySeller = async (req, res) => {
  try {
    const { sellerId } = req.query;

    // if (!sellerId) {
    //   return res.status(400).json({ message: 'Seller Id required' });
    // }

    const filter = sellerId ? { "ownerId": sellerId } : {};
    // console.log(filter);
    
    const vehicles = await Vehicle.find(filter);
    // console.log(vehicles);
    
    if (!vehicles.length) {
      return res.status(404).json({ message: 'No vehicles found for this seller' });
    }

    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};