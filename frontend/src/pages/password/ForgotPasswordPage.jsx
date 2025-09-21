// File: pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import URL from '../../services/api'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/auth/send-otp`, { phone });
      navigate(`/verify-otp?phone=${encodeURIComponent(phone)}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="container col-md-4" style={{ maxWidth: '400px', maxHeight: '80vh', overflow: 'auto', marginTop: '100px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h4>Reset Password</h4>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSendOTP}>
        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type='submit' className="btn btn-primary w-100">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
