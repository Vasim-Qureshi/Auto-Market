import { Router } from "express";
import { createProposal, getProposals } from '../controllers/proposalController.js';

const router = Router();

// POST /api/proposal
router.post('/', createProposal);

// ✅ GET all proposals
router.get("/", getProposals);


export default router;
