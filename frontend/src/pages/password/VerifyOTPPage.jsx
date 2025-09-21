// File: pages/VerifyOTPPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import URL from '../../services/api'; // Adjust the import path as necessary
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const phone = searchParams.get('phone');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/auth/verify-otp`, { phone, otp });
      navigate(`/reset-password?phone=${encodeURIComponent(phone)}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h4>Verify OTP</h4>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleVerify}>
        <div className="mb-3">
          <label>Enter OTP</label>
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type='submit' className="btn btn-success w-100">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOTPPage;
