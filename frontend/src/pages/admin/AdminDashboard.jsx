import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import URL from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVehicles: 0,
    totalProposals: 0,
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
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container-fluid" style={{ paddingTop: "100px" }}>
      <h3 className="mb-4">Admin Dashboard</h3>

      {/* Stats Cards */}
      <div className="row mb-5">

        {/* Total Users */}
        <div className="col-md-3">
          <Link to="/admin/users-manager" style={{ textDecoration: 'none' }}>
            <div className="card text-white bg-primary shadow-sm mb-3 hover-zoom">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text fs-4">{stats.totalUsers}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Total Vehicles */}
        <div className="col-md-3">
          <Link to="/admin/manage-vehicles" style={{ textDecoration: 'none' }}>
            <div className="card text-white bg-success shadow-sm mb-3 hover-zoom">
              <div className="card-body">
                <h5 className="card-title">Total Vehicles</h5>
                <p className="card-text fs-4">{stats.totalVehicles}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Total Proposals */}
        <div className="col-md-3">
          <Link to="/admin/manage-proposals" style={{ textDecoration: 'none' }}>
            <div className="card text-white bg-warning shadow-sm mb-3 hover-zoom">
              <div className="card-body">
                <h5 className="card-title">Total Proposals</h5>
                <p className="card-text fs-4">{stats.totalProposals}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Total Sales */}
        <div className="col-md-3">
          <Link to="/admin/sales" style={{ textDecoration: 'none' }}>
            <div className="card text-white bg-dark shadow-sm mb-3 hover-zoom">
              <div className="card-body">
                <h5 className="card-title">Total Sales</h5>
                <p className="card-text fs-4">₹{stats.totalSales}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
