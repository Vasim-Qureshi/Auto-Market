import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import URL from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVehicles: 0,
    totalOrders: 0,
    totalSales: 0,
  });

  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setStats(res.data);
        console.log('res:', res.data);
        console.log("stats:",stats);
        
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container-fluid" style={{paddingTop:"100px"}}>
      <h3 className="mb-4">Admin Dashboard</h3>

      {/* Stats Cards */}
      <div className="row mb-5">
        <div className="col-md-3">
          <div className="card text-white bg-primary shadow-sm mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-4">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success shadow-sm mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Vehicles</h5>
              <p className="card-text fs-4">{stats.totalVehicles}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning shadow-sm mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text fs-4">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-dark shadow-sm mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Sales</h5>
              <p className="card-text fs-4">₹{stats.sales}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Shortcuts 
      <div className="row">
        <div className="col-md-4 mb-3">
          <Link to="/admin/add-vehicle" className="btn btn-outline-primary w-100 py-3">
            ➕ Add Vehicle
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/admin/manage-vehicles" className="btn btn-outline-success w-100 py-3">
            🛠 Manage Vehicles
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-outline-secondary w-100 py-3"
            onClick={() => {
              const id = prompt('Enter vehicle ID to edit:');
              if (id) navigate(`/admin/edit-vehicle/${id}`);
            }}
          >
            ✏️ Edit Vehicle (via ID)
          </button>
        </div>
      </div>
      */}
    </div>
  );
};

export default AdminDashboard;
