// File: pages/CheckoutPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import URL from '../services/api'; // Adjust the import path as necessary

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${URL}/api/orders/place`,
        { address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Order placed successfully!');
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      setMessage('Failed to place order.');
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>Checkout</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleCheckout}>
        <div className="mb-3">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            required
          />
        </div>
        <button className="btn btn-success w-100">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
