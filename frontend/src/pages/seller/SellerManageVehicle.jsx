import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import URL from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const SellerManageVehiclePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const {user} = useAuth();
  const ownerId = user.id
  // console.log(user.id);

  // ✅ Fetch seller's own vehicles only
  const fetchVehicles = async (owenerId) => {
    if (!ownerId) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${URL}/api/seller/vehicles?sellerId=${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVehicles(res.data || []);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      alert('Failed to fetch your vehicles');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete vehicle (seller only)
  const deleteVehicle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${URL}/api/seller/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVehicles(vehicles.filter((v) => v._id !== id));
      alert('Vehicle deleted successfully');
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      alert('Failed to delete vehicle');
    }
  };

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div
      className="container"
      style={{ minHeight: '80vh', padding: '100px 0 100px 0' }}
    >
      <h3 className="mb-4 text-primary">My Vehicles</h3>

      {loading ? (
        <p>Loading your vehicles...</p>
      ) : vehicles.length === 0 ? (
        <div className="text-center">
          <p className="text-muted">You haven’t added any vehicles yet.</p>
          <Link to="/seller/add-vehicle" className="btn btn-success">
            + Add New Vehicle
          </Link>
        </div>
      ) : (
        <div className="row">
          {vehicles.map((vehicle) => (
            <div className="col-md-4 mb-4" key={vehicle._id}>
              <div
                className="card shadow-sm border-0"
                style={{ padding: '10px', borderRadius: '10px' }}
              >
                {vehicle.image && (
                  <img
                    src={vehicle.image}
                    alt={vehicle.type}
                    className="card-img-top rounded"
                    style={{
                      height: '180px',
                      width: '100%',
                      objectFit: 'contain',
                      background: '#f7f7f7',
                    }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title text-capitalize">
                    {vehicle.type}
                  </h5>
                  <p className="card-text">
                    <strong>Make:</strong> {vehicle.make} <br />
                    <strong>Model:</strong> {vehicle.model} <br />
                    <strong>Year:</strong> {vehicle.year} <br />
                    <strong>Price:</strong> ₹{vehicle.price.toLocaleString()} <br />
                    <strong>Fuel:</strong> {vehicle.fuelType}
                  </p>

                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/seller/edit-vehicle/${vehicle._id}`}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerManageVehiclePage;
