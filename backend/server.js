import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import vehicleRoutes from './routes/VehicleRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import searchRoute from './routes/searchRoutes.js';
import proposalRoutes from './routes/proposalRoutes.js';
import usersRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
// import dns from 'dns';

dotenv.config();

// Force IPv4 to avoid IPv6 timeout issues
// dns.setDefaultResultOrder('ipv4first');
// Set mongoose to debug mode for better error tracking
// mongoose.set('debug', true);

const app = express();
app.use(cookieParser());

const allowedOrigins = ["https://auto-market-neon.vercel.app", "https://automarket.globalinfotechnology.in", "http://localhost:5173"]

// Middleware
app.use(cors(
  {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use('/api/users', usersRoutes);

// Seller routes
app.use('/api/seller', sellerRoutes);

// Vehicle routes
app.use('/api/vehicles', vehicleRoutes);

// Upload routes for images by multer
app.use('/api/upload', uploadRoutes);

// proposal routes
app.use('/api/proposal', proposalRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
.catch(err => console.error(err));
