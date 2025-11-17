import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => navigate("/search");

  const handleLogout = async () => {
    await logout();          // 🔥 Backend cookie clear
    navigate("/login");      // Redirect
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top shadow-sm px-4">
      
      {/* Brand */}
      <Link className="navbar-brand fw-bold" to="/">
        🚗 AutoMarket
      </Link>

      {/* Mobile Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarNav"
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Menu */}
      <div
        className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
        id="navbarNav"
      >
        {/* Search Bar – only for buyer */}
        <form className="d-flex ms-auto me-3 my-2 my-lg-0">
          {user && user.role === "buyer" && (
            <input
              className="form-control me-2"
              type="button"
              value="Search vehicles..."
              onClick={handleSearch}
              style={{ cursor: "pointer" }}
            />
          )}
        </form>

        {/* Menu Items */}
        <ul className="navbar-nav align-items-center">
          {user ? (
            <>
              {/* Profile */}
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  👤 {user.name || "Profile"}
                </Link>
              </li>

              {/* ADMIN */}
              {user.role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link to="/admin/add-vehicle" className="nav-link">
                      ➕ Add Vehicle
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/admin/manage-vehicles" className="nav-link">
                      🛠 Manage Vehicles
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard">
                      📊 Dashboard
                    </Link>
                  </li>
                </>
              )}

              {/* BUYER */}
              {user.role === "buyer" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/buyer/dashboard">
                    🛒 Buyer Dashboard
                  </Link>
                </li>
              )}

              {/* SELLER */}
              {user.role === "seller" && (
                <>
                  <li className="nav-item">
                    <Link to="/seller/add-vehicle" className="nav-link">
                      ➕ Add Vehicle
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/seller/manage-vehicles" className="nav-link">
                      🧾 Manage Vehicles
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/seller/dashboard">
                      💼 Seller Dashboard
                    </Link>
                  </li>
                </>
              )}

              {/* LOGOUT */}
              <li className="nav-item ms-lg-3">
                <button
                  className="btn btn-light btn-sm text-danger px-3 fw-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* GUEST LINKS */}
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
