import { Router } from "express";
import { createProposal, getProposals, getProposalsByEmail } from '../controllers/proposalController.js';

const router = Router();

// POST /api/proposal
router.post('/', createProposal);

// ✅ GET all proposals
router.get("/", getProposals);
router.get("/filter", getProposalsByEmail);


export default router;
