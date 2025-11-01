import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    // e.preventDefault();
    navigate('/search')
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className=" fixed-top navbar navbar-expand-lg navbar-dark bg-danger px-4 ">
      <Link className="navbar-brand" to="/">🚗 AutoMarket</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse mt-4" id="navbarNav">
        {/* Search Bar */}
        <form className="d-flex w-20 ms-auto me-3">
          <input
            className="form-control me-2 w-100%"
            type="button"
            value="Search vehicles..."
            onClick={handleSearch}
          />
        </form>
        <ul className="navbar-nav">
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">👤 {user.name || 'Profile'}</Link>
              </li>
              {user.role === 'admin' && (
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <Link to="/admin/add-vehicle" className="nav-link">
                      ➕ Add Vehicle
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to="/admin/manage-vehicles" className="nav-link">
                      🛠 Manage Vehicles
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className="nav-link" to="/admin/dashboard">
                      🛠 Dashboard
                    </Link>
                  </li>
                </ul>
              )}
              {user.role === 'buyer' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/buyer/dashboard">🛠 Buyer Dashboard</Link>
                </li>
              )}
              {user.role === 'seller' && (
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <Link to="/admin/add-vehicle" className="nav-link">
                      ➕ Add Vehicle
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to="/admin/manage-vehicles" className="nav-link">
                      🛠 Manage Vehicles
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className="nav-link" to="/seller/dashboard">
                      🛠 Seller Dashboard
                    </Link>
                  </li>
                </ul>
              )}
              <li className="nav-item">
                <button className="nav-link ms-4" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
