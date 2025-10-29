import Proposal from "../models/Proposal.js";

export const createProposal = async (req, res) => {
  try {
    const { vehicle, buyer, offer } = req.body;

    if (!vehicle || !buyer || !offer) {
      return res.status(400).json({ message: "All fields (vehicle, buyer, offer) are required" });
    }

    console.log("Creating proposal with:", { vehicle, buyer, offer });

    const newProposal = await Proposal.create({
      vehicle,
      buyer,
      offer,
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
