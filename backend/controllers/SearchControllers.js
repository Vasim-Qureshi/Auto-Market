// File: controllers/searchControl.js
import Vehicle from '../models/Vehicle.js';

export const searchVehicles = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    const regex = new RegExp(query, 'i');

    const results = await Vehicle.find({
      $or: [
        { title: { $regex: regex } },
        { brand: { $regex: regex } },
        { category: { $regex: regex } },
        { location: { $regex: regex } },
      ],
    });

    res.status(200).json({ results });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
