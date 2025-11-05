// src/pages/SellingVehicleDetails.jsx
import React, { use } from "react";
import { useParams, useNavigate } from "react-router-dom"; // for navigation
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import URL from "../services/api"; // Adjust the import path as necessary

const VehicleCard = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { type } = useParams(); // Get the vehicle type from the URL params

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${URL}/api/vehicles/category/${type}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setVehicles(res.data);
                // console.log('Vehicles loaded:', res.data);
            } catch (err) {
                // console.error('Error loading vehicles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [type]);


    const handleContactClick = (vehicle) => {
        // Navigate to BuyerProposalForm with vehicle details
        navigate(`/vehicle/${vehicle._id}`)
        // navigate("/buyerproposal", { state: { vehicleId: vehicle._id } });
    };

    return (
        <div className="container my-4" style={{ padding: "55px 20px 100px 20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <h2 className="text-center mb-4">Available {type.charAt(0).toUpperCase() + type.slice(1)}s for Sale</h2>
            {vehicles.map((vehicle) => (
                <div key={vehicle._id} className="card mb-4 shadow-sm">
                    <div className="card-body">
                        {/* First Row */}
                        <div className="row align-items-center mb-3 border-bottom pb-3">
                            {/* Vehicle Image */}
                            <div className="col-md-3 text-center">
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                    className="img-fluid rounded"
                                />
                            </div>

                            {/* Vehicle Details */}
                            <div className="col-md-3">
                                <h5>{vehicle.name}</h5>
                                <p className="mb-1">
                                    <strong>Category:</strong> {vehicle.category}
                                </p>
                                <p className="mb-1">
                                    <strong>Make:</strong> {vehicle.make}
                                </p>
                                <p className="mb-1">
                                    <strong>Model:</strong> {vehicle.model}
                                </p>
                                <p className="mb-1">
                                    <strong>Year:</strong> {vehicle.year}
                                </p>
                                <p className="mb-1">
                                    <strong>Price:</strong> {vehicle.price}
                                </p>
                                <p className="mb-1 text-muted small">{vehicle.description}</p>
                                <button className="btn btn-link">more details</button>
                            </div>

                            {/* Seller Details */}
                            <div className="col-md-3">
                                <h6>Seller Info</h6>
                                <p className="mb-1">
                                    {/* <strong>Name:</strong> Seller Name */}
                                    <strong>Name:</strong> {vehicle.ownerId?.name}
                                </p>
                                <p className="mb-1">
                                    <strong>Location:</strong> Seller Location
                                    {/* <strong>Location:</strong> {vehicle.seller.location} */}
                                </p>
                                <p className="mb-1">
                                    {/* <strong>Contact:</strong> +91 9999999999 */}
                                    <strong>Contact:</strong> {vehicle.ownerId?.phone}
                                </p>
                                <button className="btn btn-link">more details</button>
                            </div>

                            {/* Action Buttons 
                            <div className="col-md-3 text-center">
                                <button className="btn btn-warning me-2">Edit</button>
                                <button className="btn btn-danger">Delete</button>
                            </div> 
                            */}
                        </div>

                        {/* Extra Images Row */}
                        <div className="row mb-3">
                            {/* <div className="col text-center">
                                {vehicle.moreImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`extra-${index}`}
                                        className="img-thumbnail mx-2"
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                    />
                                ))}
                            </div> */}
                        </div>

                        {/* Contact for Buy Row */}
                        <div className="row">
                            <div className="col text-center">
                                <button onClick={() => handleContactClick(vehicle)} className="btn btn-success w-50">
                                    Contact for Buy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VehicleCard;
