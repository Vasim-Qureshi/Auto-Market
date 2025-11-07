import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../services/api"; // your backend API base URL

const ManageProposals = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    // Fetch all proposals
    const fetchProposals = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/api/proposal`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProposals(response.data || []);
        } catch (err) {
            setError("Failed to load proposals");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProposals();
    }, []);

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this proposal?")) return;
        try {
            await axios.delete(`${URL}/api/proposal/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProposals(proposals.filter((p) => p._id !== id));
        } catch (err) {
            alert("Error deleting proposal");
        }
    };

    return (
        <div className="container" style={{ padding: "100px 20px 100px 20px" }}>
            <h2 className="text-center mb-4 fw-bold">Manage Proposals</h2>

            {loading && <div className="text-center text-muted">Loading proposals...</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {!loading && proposals.length === 0 && (
                <div className="text-center text-muted">No proposals found.</div>
            )}

            <div className="row">
                {proposals.map((proposal) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={proposal._id}>
                        <div className="card shadow-sm border-0 h-100">
                            <img
                                src={proposal.vehicle?.image || "https://via.placeholder.com/400x250?text=No+Image"}
                                className="card-img-top"
                                alt={proposal.vehicle?.model}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title text-primary fw-semibold">
                                    {proposal.vehicle?.make} {proposal.vehicle?.model} ({proposal.vehicle?.year})
                                </h5>
                                <p className="mb-1">
                                    <strong>Type:</strong> {proposal.vehicle?.type}
                                </p>
                                <p className="mb-1">
                                    <strong>Price:</strong> ₹{proposal.vehicle?.price.toLocaleString()}
                                </p>
                                <hr />
                                <h6 className="text-secondary">Buyer Info</h6>
                                <p className="mb-1"><strong>Name:</strong> {proposal.buyer?.fullName}</p>
                                <p className="mb-1"><strong>Email:</strong> {proposal.buyer?.email}</p>
                                <p className="mb-1"><strong>Phone:</strong> {proposal.buyer?.phone}</p>
                                <p className="mb-1"><strong>City:</strong> {proposal.buyer?.city}</p>

                                <hr />
                                <h6 className="text-secondary">Offer Details</h6>
                                <p className="mb-1"><strong>Budget:</strong> ₹{proposal.offer?.budget.toLocaleString()}</p>
                                <p className="mb-1"><strong>Offer Amount:</strong> ₹{proposal.offer?.offerAmount.toLocaleString()}</p>
                                <p className="mb-1"><strong>Message:</strong> {proposal.offer?.message || "—"}</p>
                                <p className="mb-1 text-muted">
                                    <small>Sent: {new Date(proposal.offer.when).toLocaleString()}</small>
                                </p>

                                <hr />
                                <h6 className="text-secondary">Seller Info</h6>
                                <p className="mb-1"><strong>Name:</strong> {proposal.seller?.name}</p>
                                <p className="mb-1"><strong>Email:</strong> {proposal.seller?.email}</p>
                                <p className="mb-3"><strong>Phone:</strong> {proposal.seller?.phone}</p>

                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(proposal._id)}
                                    >
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => alert("Feature Coming Soon")}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProposals;
