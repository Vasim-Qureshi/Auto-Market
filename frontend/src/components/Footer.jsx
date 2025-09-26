// File: components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="fixed-bottom bg-dark text-light text-center py-3">
    <div className="container">
      <div className="mb-2">
        <a href="https://facebook.com" className="text-light mx-2">Facebook</a>
        <a href="https://twitter.com" className="text-light mx-2">Twitter</a>
        <a href="https://instagram.com" className="text-light mx-2">Instagram</a>
      </div>
      <div>
        <Link to="/privacy-policy">Privacy Policy</Link> |
        <Link to="/terms-and-conditions">Terms & Conditions</Link> |
        <Link to="/refund-policy">Refund Policy</Link>
      </div>
      <div className="mt-2">
      &copy; {new Date().getFullYear()} UsedVehicles. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
