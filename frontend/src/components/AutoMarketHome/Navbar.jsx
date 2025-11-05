import React from 'react';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div className="container">
      <a className="navbar-brand fw-bold" href="#">AutoMarket</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><a className="nav-link" href="#">Buy</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Sell</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Dealers</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Blog</a></li>
        </ul>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">Login</button>
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
