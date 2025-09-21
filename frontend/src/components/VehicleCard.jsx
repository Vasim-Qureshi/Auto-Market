// File: components/VehicleCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => (
  <div className="col-md-4 mb-4">
    <div className="card h-100">
      <img
        src={vehicle.image || '/images/default.jpg'}
        className="card-img-top"
        alt={vehicle.title}
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <div className="card-body">
        <h5 className="card-title">{vehicle.title}</h5>
        <p className="card-text">₹{vehicle.price}</p>
        <Link to={`/vehicle/${vehicle._id}`} className="btn btn-sm btn-outline-primary">
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default VehicleCard;
