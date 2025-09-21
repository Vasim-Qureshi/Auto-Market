// File: pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import URL from '../../services/api'; // Adjust the import path as necessary
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get('phone');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return setMessage('Passwords do not match.');
    }

    try {
      await axios.post(`${URL}/api/auth/reset-password`, { phone, password });
      setMessage('Password updated successfully!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage('Failed to reset password.');
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h4>Set New Password</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <button type='submit' className="btn btn-warning w-100">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
