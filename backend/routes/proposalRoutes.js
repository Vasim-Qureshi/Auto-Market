import { Router } from "express";
import { createProposal, getProposals, getProposalsByBuyerEmail, getProposalsBySellerEmail, deleteProposal } from '../controllers/proposalController.js';
import { adminOnly, buyerOnly, protect, sellerOnly } from "../middleware/authMiddleware.js";

const router = Router();

// POST /api/proposal
router.post('/', protect, buyerOnly, createProposal);

// ✅ GET all proposals
router.get("/",protect, adminOnly, getProposals);
router.delete("/:id",protect,adminOnly, deleteProposal);
router.get("/filter/buyer",protect, buyerOnly, getProposalsByBuyerEmail);
router.get("/filter/seller",protect, sellerOnly, getProposalsBySellerEmail);

export default router;
