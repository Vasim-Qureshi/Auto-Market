// File: models/Vehicle.js
import mongoose from 'mongoose';

// Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  type: String,    // e.g., "Car", "Bus", "Truck"
  make: String,  // e.g., "Toyota", "Honda"
  model: String, // e.g., "Camry", "Civic"
  year: String, // e.g., "2020", "2018"
  fuelType: String, // e.g., "Petrol", "Diesel", "Electric"
  price: String,  // e.g., "20000 USD"
  description: String,    // e.g., "Well maintained, single owner"
  category: String,      // e.g., "suv", "passenger", "loading"
  location: String,   // e.g., "New York", "Los Angeles"
  mileage: String,       // e.g., "15 km/l"
  color: String,         // e.g., "Red", "Blue"
  transmission: String,  // e.g., "Automatic", "Manual"
  image: String,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
