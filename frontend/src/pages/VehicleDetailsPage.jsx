// File: pages/VehicleDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import URL from '../services/api';

const VehicleDetailsPage = () => {
  const { id } = useParams(); // vehicle ID from route
  const [vehicle, setVehicle] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicleRes = await axios.get(`${URL}/api/vehicles/${id}`);
        setVehicle(vehicleRes.data);
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userRes = await axios.get(`${URL}/api/users/${userId}`);
          setUser(userRes.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error fetching vehicle:', err);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${URL}/api/cart/add`,
        { vehicleId: vehicle._id, userId: user._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Vehicle added to cart!');
    } catch (err) {
      setMessage('Please login to add items to cart.');
    }
  };

  if (!vehicle) return <div className="container mt-4">Loading vehicle details...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: '900px', minHeight: '80vh', overflowY: 'auto', padding: '60px' }}>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`${URL}${vehicle.image}`}
            alt={vehicle.title}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h2>{vehicle.type}</h2>
          <p><strong>Make:</strong> {vehicle.make}</p>
          <p><strong>Model:</strong> {vehicle.model}</p>
          <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
          <p><strong>Year:</strong> {vehicle.year}</p>
          <p><strong>Location:</strong> {vehicle.location}</p>
          <p><strong>Description:</strong> {vehicle.description}</p>
          <h4 className="mt-4">Price: ₹{vehicle.price?.toLocaleString("en-IN")}</h4>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Give Proposal
          </button>
          {message && <div className="mt-2 alert alert-info">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
