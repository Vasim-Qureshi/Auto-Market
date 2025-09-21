// File: pages/VehicleSubCategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import URL from '../services/api';

const VehicleSubCategoryPage = () => {
  const { type,brand,model } = useParams(); // e.g., diesel, tata, electric
  console.log("type:",type,brand,model);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategoryVehicles = async () => {
      try {
        const res = await axios.get(`${URL}/api/vehicles/subcategory/${model}`);
        setVehicles(res.data);
      } catch (err) {
        console.error('Error loading subcategory vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategoryVehicles();
  }, [model]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-capitalize">Vehicles - {type} - {brand} - {model} </h3>
      {loading ? (
        <p>Loading...</p>
      ) : vehicles.length === 0 ? (
        <p>No vehicles found for this subcategory.</p>
      ) : (
        <div className="row">
          {vehicles.map((vehicle) => (
            <div className="col-md-4 mb-4" key={vehicle._id}>
              <div className="card h-100">
                <img
                  src={vehicle.image || '/images/default.jpg'}
                  className="card-img-top"
                  alt={vehicle.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                {vehicle && (
                  <div className="mt-2">
                    <img src={`${URL}${vehicle.image}`} alt="Preview" height="100" />
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{vehicle.title}</h5>
                  <p className="card-text">₹{vehicle.price}</p>
                  <Link to={`/vehicle/${vehicle._id}`} className="btn btn-sm btn-outline-success">
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

export default VehicleSubCategoryPage;
