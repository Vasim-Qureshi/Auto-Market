import React, { useState, useEffect } from "react";
import URL from "../services/api";
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';

function BuyerProposalForm() {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  // vehicle prop (optional) can contain: { id, title, make, model, year, price, image }
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    preferredContact: "phone",
    budget: "",
    offer: "",
    message: "",
    contactTime: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [vehicle, setVehicle] = useState({});
  const token = localStorage.getItem('token');
  const { vehicleId } = useParams(); // Get vehicleId from URL params

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicleRes = await axios.get(`${URL}/api/vehicles/${vehicleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicle(vehicleRes.data);
        // console.log(vehicleRes.data);

        if (token) {
          const res = await axios.get(`${URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
          // console.log("Fetched user data:", res.data);

        } else {
          setUser(null);
        }
      } catch (err) {
        // console.error('Error fetching vehicle:', err);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  // console.log(vehicle);

  function validate() {
    const e = {};
    if (!user?.name?.trim()) e.fullName = "Full name is required.";
    if (!user?.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email.";
    if (!String(user?.phone || '').match(/^\+?[0-9]{10,15}$/)) e.phone = "Enter a valid phone number.";
    if (!form.offer || Number(form.offer) <= 0) e.offer = "Please enter your offer amount.";
    if (!form.acceptTerms) e.acceptTerms = "You must accept terms to proceed.";
    return e;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true);
    try {
      // Demo behaviour: prepare payload and trigger a download of JSON.
      const payload = {
        vehicle: {
          id: vehicleId || "unknown",
          type: vehicle.type || "unknown",
          make: vehicle.make || "unknown",
          model: vehicle.model || "unknown",
          image: vehicle.image || "unknown",
          year: Number(vehicle.year) || "unknown",
          price: Number(vehicle.price) || "unknown",
        },
        buyer: {
          fullName: user.name,
          email: user.email,
          phone: String(user.phone),
          city: form.city,
          preferredContact: form.preferredContact,
          contactTime: form.contactTime,
        },
        offer: {
          budget: Number(form.budget),
          offerAmount: Number(form.offer),
          message: form.message,
          when: new Date(),
        },
        seller: {
          name: vehicle.ownerId.name,
          phone: vehicle.ownerId.phone,
          email: vehicle.ownerId.email,
        }
      };
      // console.log("Submitting proposal:", payload);


      // TODO: replace this with your real API call, e.g.:
      const proposalRes = await fetch(`${URL}/api/proposal`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
      if (proposalRes.status === 201) {
        setSuccessMsg("Proposal submitted successfully. The seller will contact you soon.");
      }

      setForm((s) => ({
        ...s,
        offer: "",
      }));
      setErrors({});
    } catch (err) {
      // console.error(err);
      setErrors({ submit: "Failed to submit. Check console for details." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card shadow-sm mb-4" style={{ maxHeight: "90vh", overflowY: "auto", padding: '65px 5px' }}>
      <div className="card-body">
        <h5 className="card-title mb-3">Contact / Buyer Proposal</h5>

        <div className="row gy-3">
          <div className="col-12 col-lg-4">
            <div className="border rounded p-3 h-100 d-flex flex-column">
              <div className="text-center mb-3">
                {vehicle.image ? (
                  <img src={vehicle.image} alt={vehicle.type || "Vehicle"} className="img-fluid rounded" />
                ) : (
                  <div className="bg-light rounded p-5">No image</div>
                )}
              </div>
              <div>
                <label className="form-label">Contacting seller about:</label>
                {/* Vehicle details */}
                <div className="border rounded p-2 bg-light">
                  <h5 className="mb-1">{`${vehicle.type || "Unknown"}`}</h5>
                  <h6>{`${vehicle.make || ""} ${vehicle.model || ""}`}</h6>
                  <p className="small text-muted mb-1">Year: {vehicle.year || "—"}</p>
                  <p className="small text-muted mb-1">Listed price: {vehicle.price ? `₹ ${vehicle.price}` : "—"}</p>
                  <p className="small text-muted">Vehicle ID: {vehicleId || "—"}</p>
                </div>
              </div>
            </div>
          </div>

          {/*  Form section */}
          <div className="col-12 col-lg-8">
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label me-2">Full name</label>
                  <input
                    name="fullName"
                    value={user.name}
                    onChange={handleChange}
                    className={`form - control ${errors.fullName ? "is-invalid" : ""}`}
                    placeholder="e.g. Rahul Sharma"
                  />
                  <div className="invalid-feedback">{errors.fullName}</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label me-2">Email</label>
                  <input name="email" value={user.email} onChange={handleChange} className={`form - control ${errors.email ? "is-invalid" : ""}`} placeholder="name@example.com" />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label me-4">Phone</label>
                  <input name="phone" value={user.phone} onChange={handleChange} className={`form - control ${errors.phone ? "is-invalid" : ""}`} placeholder="+91 98765 43210" />
                  <div className="invalid-feedback">{errors.phone}</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input name="city" value={form.city} onChange={handleChange} className="form-control" placeholder="e.g. Pune" />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Preferred contact</label>
                  <select name="preferredContact" value={form.preferredContact} onChange={handleChange} className="form-select">
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Best time to call</label>
                  <input name="contactTime" value={form.contactTime} onChange={handleChange} className="form-control" placeholder="e.g. Weekdays 6–8pm" />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Your budget (optional)</label>
                  <input name="budget" value={form.budget} onChange={handleChange} className="form-control" placeholder="e.g. ₹ 3,50,000" />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Offer amount</label>
                  <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input name="offer" value={form.offer} onChange={handleChange} className={`form - control ${errors.offer ? "is-invalid" : ""}`} placeholder="Amount you offer" />
                    <div className="invalid-feedback">{errors.offer}</div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Message (optional)</label>
                  <input name="message" value={form.message} onChange={handleChange} className="form-control" placeholder="Any note for seller, preferred closing date etc." />
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input name="acceptTerms" id="acceptTerms" checked={form.acceptTerms} onChange={handleChange} className={`form - check - input ${errors.acceptTerms ? "is-invalid" : ""}`} type="checkbox" />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      I confirm that the information provided is correct and I am genuinely interested in buying this vehicle.
                    </label>
                    <div className="invalid-feedback">{errors.acceptTerms}</div>
                  </div>
                </div>

                {errors.submit && (
                  <div className="col-12">
                    <div className="alert alert-danger">{errors.submit}</div>
                  </div>
                )}

                {successMsg && (
                  <div className="col-12">
                    <div className="alert alert-success">{successMsg}</div>
                  </div>
                )}

                <div className="col-12 d-flex gap-2 justify-content-end">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => window.history.back()}>
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? "Submitting..." : "Send Proposal"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerProposalForm;