// File: pages/VehicleCategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import URL from '../services/api';

const VehicleCategoryPage = () => {
  const { type } = useParams(); // e.g., truck, car, bus
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get(`${URL}/api/vehicles/category/${type}`);
        setVehicles(res.data);
      } catch (err) {
        console.error('Error loading vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [type]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-capitalize">{type} Listings</h3>
      {loading ? (
        <p>Loading vehicles...</p>
      ) : vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <div className="row">
          {vehicles && Array.isArray(vehicles) && vehicles.map((vehicle) => (
            <div className="col-md-4 mb-4" key={vehicle._id}>
              <div className="card h-100">
                <img
                  src={`${URL}${vehicle.image}` || '/images/default.jpg'}
                  className="card-img-top"
                  alt={vehicle.title}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{vehicle.title}</h5>
                  <p className="card-text">₹{vehicle.price}</p>
                  <Link to={`/${type}/${vehicle.brand}/${vehicle.subcategory}`} className='btn me-2 btn-sm btn-outline-primary'>varients</Link>
                  <Link to={`/vehicle/${vehicle._id}`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleCategoryPage;
