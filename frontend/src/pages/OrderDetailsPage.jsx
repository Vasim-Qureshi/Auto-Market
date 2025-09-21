// File: pages/OrderDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import URL from '../services/api'; // Adjust the import path as necessary

const OrderDetailsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Your Orders</h3>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div className="list-group-item mb-3" key={order._id}>
              <h5>Order ID: {order._id}</h5>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Vehicles:</strong></p>
              <ul>
                {order.vehicles.map((vehicle) => (
                  <li key={vehicle._id}>
                    {vehicle.title} - ₹{vehicle.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
