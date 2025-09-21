import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import vehicleRoutes from './routes/VehicleRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import searchRoute from './routes/searchRoutes.js';
import cartRoutes from "./routes/cartRoutes.js"
import proposalRoutes from './routes/proposalRoutes.js';
// import dns from 'dns';

dotenv.config();

// Force IPv4 to avoid IPv6 timeout issues
// dns.setDefaultResultOrder('ipv4first');
// Set mongoose to debug mode for better error tracking
// mongoose.set('debug', true);

const app = express();

// Middleware
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true, // Important for cookies
  }
));

app.use(express.json());
//Search routes
app.use('/api/search', searchRoute);
// authentication routes
app.use('/api/auth', authRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// Vehicle routes
app.use('/api/vehicles', vehicleRoutes);

// Order routes
app.use('/api/orders', orderRoutes);

// Cart routes
app.use('/api/cart', cartRoutes);

// checkout routesr
app.use('/api/checkout', (req, res) => {
  // Placeholder for checkout routes
  res.status(501).send('Checkout API not implemented yet');
});

// Upload routes for images by multer
app.use('/api/upload', uploadRoutes);
// Serve static image files in the uploads directory
app.use('/uploads', express.static('uploads'));

// proposal routes
app.use('/api/proposal', proposalRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
.catch(err => console.error(err));
