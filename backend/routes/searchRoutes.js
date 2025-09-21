// File: routes/searchRoute.js
import express from 'express';
import { searchVehicles } from '../controllers/SearchControllers.js';

const router = express.Router();

router.get('/', searchVehicles);

export default router;
