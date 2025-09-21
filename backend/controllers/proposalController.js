import Proposal from "../models/Proposal.js";
export const createProposal = (req, res) => {
    const { vehicle, buyer, offer } = req.body;
    // Logic to handle proposal would go here
    const newProposal = new Proposal({
        vehicle,
        buyer,
        offer
    });
    newProposal.save()
        .then(proposal => res.status(201).json(proposal))
        .catch(err => res.status(500).json({ error: err.message }));
};