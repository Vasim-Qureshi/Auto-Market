import { Router } from "express";
import { createProposal, getProposals, getProposalsByBuyerEmail, getProposalsBySellerEmail } from '../controllers/proposalController.js';
import { buyerOnly, protect } from "../middleware/authMiddleware.js";

const router = Router();

// POST /api/proposal
router.post('/', protect, buyerOnly, createProposal);

// ✅ GET all proposals
router.get("/", getProposals);
router.get("/filter/buyer", getProposalsByBuyerEmail);
router.get("/filter/seller", getProposalsBySellerEmail);

export default router;
