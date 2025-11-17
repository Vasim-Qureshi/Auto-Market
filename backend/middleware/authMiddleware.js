import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  // Token from HttpOnly Cookie
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user and remove password
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// =====================================
// ROLE BASED ACCESS
// =====================================

export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

export const buyerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "buyer") {
    return res.status(403).json({ message: "Buyer access only" });
  }
  next();
};

export const sellerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "seller") {
    return res.status(403).json({ message: "Seller access only" });
  }
  next();
};
