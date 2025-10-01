// src/pages/SellingVehicleDetails.jsx
import React, { use } from "react";
import { useParams, useNavigate } from "react-router-dom"; // for navigation
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import URL from "../services/api"; // Adjust the import path as necessary
/*
const vehicles = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    category: "Truck",
    image: "http://images3.alphacoders.com/281/281477.jpg", // main image
    moreImages: [
        "http://images3.alphacoders.com/281/281477.jpg",
        "http://images3.alphacoders.com/281/281477.jpg",
        "http://images3.alphacoders.com/281/281477.jpg",
        "http://images3.alphacoders.com/281/281477.jpg",
        "http://images3.alphacoders.com/281/281477.jpg",
        "http://images3.alphacoders.com/281/281477.jpg",
        "http://images3.alphacoders.com/281/281477.jpg",
        "http://images3.alphacoders.com/281/281477.jpg",
        "http://images3.alphacoders.com/281/281477.jpg",
    ], // extra images
    name: `Truck Model ${i + 1}`,
    price: `$${(i + 1) * 5000}`,
    description: "Well maintained, powerful engine, good mileage.",
    seller: {
        name: `Seller ${i + 1}`,
        contact: `+91-98765${i}432${i}`,
    },
}));
*/
const SellingVehicleDetails = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { type } = useParams(); // Get the vehicle type from the URL params

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await axios.get(`${URL}/api/vehicles/category/${type}`);
                setVehicles(res.data);
                console.log('Vehicles loaded:', res.data);
            } catch (err) {
                console.error('Error loading vehicles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [type]);



    const handleContactClick = (vehicle) => {
        // Navigate to BuyerProposalForm with vehicle details
        navigate("/buyerproposal");
    };
    return (
        <div className="container my-4" style={{ maxWidth: "900px", maxHeight: "90vh", overflowY: "auto", padding: "35px", paddingBottom: "60px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <h2 className="text-center mb-4">Available Trucks for Sale</h2>
            {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="card mb-4 shadow-sm">
                    <div className="card-body">
                        {/* First Row */}
                        <div className="row align-items-center mb-3">
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
                                    <strong>Price:</strong> {vehicle.price}
                                </p>
                                <p className="text-muted small">{vehicle.description}</p>
                            </div>

                            {/* Seller Details */}
                            <div className="col-md-3">
                                <h6>Seller Info</h6>
                                <p className="mb-1">
                                    {/* <strong>Name:</strong> {vehicle.seller.name} */}
                                </p>
                                <p className="mb-1">
                                    {/* <strong>Contact:</strong> {vehicle.seller.contact} */}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="col-md-3 text-center">
                                <button className="btn btn-warning me-2">Edit</button>
                                <button className="btn btn-danger">Delete</button>
                            </div>
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
                                <button onClick={(vehicle) => handleContactClick(vehicle)} className="btn btn-success w-50">
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

export default SellingVehicleDetails;
