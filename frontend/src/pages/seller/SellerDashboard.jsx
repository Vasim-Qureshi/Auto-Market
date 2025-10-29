import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../services/api";

const SellerDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch proposals from backend
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(`${URL}/api/proposal`);
        setProposals(response.data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading proposals...</p>
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="text-center mt-5 text-muted">
        <h5>No proposals found.</h5>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxHeight: "100%", padding: "100px 0 100px 0" }}>
      <h2 className="text-center fw-bold text-primary mb-4">Seller Dashboard</h2>

      <div className="row">
        {proposals.map((proposal) => (
          <div className="col-md-6 mb-4" key={proposal._id}>
            <div className="card shadow-sm border-0">
              <img
                src={proposal.vehicle.image}
                alt={proposal.vehicle.model}
                className="card-img-top"
                style={{ height: "230px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title text-capitalize">
                  {proposal.vehicle.make} {proposal.vehicle.model}
                </h5>
                <p className="text-muted mb-2">
                  {proposal.vehicle.type} • {proposal.vehicle.year}
                </p>
                <p className="fw-bold text-dark mb-3">
                  Price: ₹{proposal.vehicle.price.toLocaleString()}
                </p>

                <div className="border-top pt-3">
                  <h6 className="fw-semibold text-primary">Buyer Info</h6>
                  <p className="mb-0">{proposal.buyer.fullName}</p>
                  <small className="text-muted">
                    {proposal.buyer.city} | {proposal.buyer.phone}
                  </small>
                </div>

                <div className="border-top pt-3 mt-3">
                  <h6 className="fw-semibold text-success">Offer Details</h6>
                  <p className="mb-1">
                    Offer: ₹{proposal.offer.offerAmount.toLocaleString()} / Budget: ₹
                    {proposal.offer.budget.toLocaleString()}
                  </p>
                  <p className="small text-muted mb-2">{proposal.offer.message}</p>
                  <small className="text-muted">
                    Date: {new Date(proposal.offer.when).toLocaleString()}
                  </small>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-success btn-sm w-50">Accept</button>
                  <button className="btn btn-danger btn-sm w-50">Reject</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
