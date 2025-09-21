// File: pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import URL from '../services/api'; // Adjust the import path as necessary
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {


  const { login } = useAuth();


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("https://auto-market-m817.vercel.app/api/auth/login", formData,
      const res = await axios.post(`${URL}/api/auth/login`, formData,
        {
          withCredentials: true,
        });
      // After login success:
      localStorage.setItem('token', res.data.token);
      login(res.data.token); // Update context with user data
      setMessage('Login successful');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container col-md-4" style={{ maxWidth: '400px', maxHeight: '80vh', overflow: 'auto', marginTop: '100px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h3>Login</h3>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Login</button>
      </form>
      <div className="mt-3 text-center">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default LoginPage;
