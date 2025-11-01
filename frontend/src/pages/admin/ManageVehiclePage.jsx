import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import URL from '../../services/api';

const ManageVehiclePage = () => {
  const [vehicles, setVehicles] = useState({});

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${URL}/api/admin/vehicles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(res.data);
      console.log('Fetched vehicles:', res.data,"vehicles:",vehicles);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch vehicles');
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${URL}/api/admin/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(vehicles.filter((v) => v._id !== id));
      alert('Vehicle deleted');
    } catch (err) {
      console.error(err);
      alert('Failed to delete vehicle');
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="container" style={{ minHeight: '80vh', padding: '100px 0 100px 0' }}>
      <h3>Manage Vehicles</h3>
      <div className="row">
        { vehicles.length === 0 ? (
          <p>No vehicles found.</p>
        ) : (
          Array.isArray(vehicles) && vehicles.map((vehicle) => (
            <div className="col-md-4 mb-4" key={vehicle._id}>
              <div className="card shadow-sm" style={{ padding: '10px' }}>
                {vehicle.image && (
                  <img
                    src={`${vehicle.image}`}
                    alt={vehicle.type}
                    className="card-img-top "
                    style={{ height: '180px', width: '100%', objectFit: 'contain', zoom: '1.2' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}</h5>
                  <p className="card-text">
                    <strong>Make:</strong> {vehicle.make}<br />
                    <strong>Model:</strong> {vehicle.model}<br />
                    <strong>Year:</strong> {vehicle.year}<br />
                    <strong>Price:</strong> ₹{vehicle.price}<br />
                    <strong>Fuel:</strong> {vehicle.fuelType}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/admin/edit-vehicle/${vehicle._id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteVehicle(vehicle._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageVehiclePage;
