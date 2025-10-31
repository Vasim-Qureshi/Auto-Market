import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    // req.user = decoded
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access only' });
  next();
};

export const buyerOnly = (req, res, next) => {
  if (req.user.role !== 'buyer') return res.status(403).json({ message: 'buyer access only' });
  next();
};

export const sellerOnly = (req, res, next) => {
  if (req.user.role !== 'seller') return res.status(403).json({ message: 'seller access only' });
  next();
};
