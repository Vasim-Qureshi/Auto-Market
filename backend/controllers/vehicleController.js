import Vehicle from '../models/Vehicle.js';

// Get all vehicles
export const getAllVehicles = async (req, res) => {
  const { type, subType } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (subType) filter.subType = subType;

  try {
    const vehicles = await Vehicle.find(filter);
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single vehicle by ID
export const getVehiclesByCategory = async (req, res) => {
  try {
    const { type } = req.params;
    // console.log(`Fetching vehicles for category: ${type}`);

    const vehicles = await Vehicle.find({ type: type.toLowerCase() }).populate('ownerId', "name email phone");
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicles by category' });
  }
};

// Get by Subcategory
export const getVehiclesBySubcategory = async (req, res) => {
  try {
    const { subtype } = req.params;
    const vehicles = await Vehicle.find({ subcategory: subtype.toLowerCase() });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicles by subcategory' });
  }
};

// Get Vehicle Details
export const getVehicleDetails = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('ownerId', "name email phone");
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicle details' });
  }
};


// Admin: Add vehicle
export const createVehicle = async (req, res) => {
  try {
    const newVehicle = await Vehicle.create({ ...req.body, ownerId: req.user.id });
    res.status(201).json({message: 'Vehicle created successfully', vehicle: newVehicle});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
