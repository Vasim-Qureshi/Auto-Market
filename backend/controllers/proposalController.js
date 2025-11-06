import Proposal from "../models/Proposal.js";

export const createProposal = async (req, res) => {
  try {
    const { vehicle, buyer, offer, seller } = req.body;

    if (!vehicle || !buyer || !offer) {
      return res.status(400).json({ message: "All fields (vehicle, buyer, offer) are required" });
    }

    // console.log("Creating proposal with:", { vehicle, buyer, offer, seller });

    const newProposal = await Proposal.create({
      vehicle,
      buyer,
      offer,
      seller,
    });

    res.status(201).json(newProposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    res.status(500).json({
      message: "Failed to create proposal",
      error: error.message,
    });
  }
};

export const getProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.status(200).json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).json({ message: "Error fetching proposals" });
  }
}

export const getProposalsByBuyerEmail = async (req, res) => {
  try {
    const { buyerEmail } = req.query;
    const filter = buyerEmail ? { "buyer.email": buyerEmail } : {};
    const proposals = await Proposal.find(filter).sort({ createdAt: -1 });
    res.status(200).json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching proposals" });
  }
};

export const getProposalsBySellerEmail = async (req, res) => {
  try {
    const { sellerEmail } = req.query;
    const filter = sellerEmail ? { "seller.email": sellerEmail } : {};
    const proposals = await Proposal.find(filter).sort({ createdAt: -1 });
    res.status(200).json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching proposals" });
  }
};
