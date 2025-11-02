import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import URL from "../../services/api";

const BuyerDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyerEmail, setBuyerEmail] = useState("");

  // ✅ Get buyer email from login (JWT/localStorage/session)
  useEffect(() => {
    const email = "vasimqureshi2025@gmail.com";
    if (email) {
      setBuyerEmail(email);
    }
  }, []);

  // ✅ Fetch only proposals of this buyer
  useEffect(() => {
    if (buyerEmail) {
      fetchProposals(buyerEmail);
    }
  }, [buyerEmail]);

  const fetchProposals = async (email) => {
    try {
      const res = await axios.get(`${URL}/api/proposal/filter/buyer?buyerEmail=${email}`);
      setProposals(res.data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{padding:"100px 20px 150px 20px"}}>
      <div className="text-center mb-4">
        <h2 className="text-primary">Buyer Dashboard</h2>
        <p className="text-muted mb-0">
          Showing proposals for: <strong>{buyerEmail || "Unknown Buyer"}</strong>
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading your proposals...</p>
        </div>
      ) : proposals.length === 0 ? (
        <div className="alert alert-info text-center">
          <strong>No proposals found.</strong>
        </div>
      ) : (
        <div className="table-responsive shadow-sm border rounded">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Vehicle</th>
                <th>Price</th>
                <th>Offer</th>
                <th>Seller</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div>
                      <strong>
                        {p.vehicle.make.toUpperCase()} <br />
                         {p.vehicle.model}
                      </strong>{" "}
                      ({p.vehicle.year})
                      <br />
                      <small className="text-muted">{p.vehicle.type}</small>
                    </div>
                  </td>
                  <td>₹{p.vehicle.price.toLocaleString()}</td>
                  <td>
                    ₹{p.offer.offerAmount.toLocaleString()}
                    <br />
                    <small className="text-muted">{p.offer.message || "-"}</small>
                  </td>
                  <td>
                    {p.seller?.name}
                    <br />
                    <small className="text-muted">{p.seller?.email}</small>
                    <br />
                    <small>{p.seller?.phone}</small>
                  </td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
