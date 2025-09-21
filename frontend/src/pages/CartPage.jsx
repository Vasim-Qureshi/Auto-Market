// File: pages/CartPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import URL from '../services/api'; // Adjust the import path as necessary

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${URL}/api/cart`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (vehicleId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${URL}/api/cart/remove/${vehicleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter(item => item._id !== vehicleId));
    } catch (err) {
      console.error('Failed to remove from cart');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <div className="card">
                <img
                  src={item.image || '/images/default.jpg'}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p>₹{item.price}</p>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-3">
            <Link to="/checkout" className="btn btn-success">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
