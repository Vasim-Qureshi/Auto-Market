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

    console.log("Proposal created successfully:", newProposal);

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
