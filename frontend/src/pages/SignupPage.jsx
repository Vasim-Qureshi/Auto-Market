// File: pages/SignupPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import URL from '../services/api'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/api/auth/signup`, formData);
      localStorage.setItem('token', res.data.token);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container col-md-4" style={{ maxWidth: '400px', maxHeight: '80vh', overflow: 'auto', marginTop: '100px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h3>Signup</h3>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input type="tel" name="phone" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default SignupPage;
