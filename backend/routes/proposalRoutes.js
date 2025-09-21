import { Router } from "express";
import { createProposal } from '../controllers/proposalController.js';

const router = Router();

// POST /api/proposal
router.post('/', createProposal);


export default router;
