// File: pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import URL from "../services/api.js";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();  // login(email, password)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // 🔥 login function from AuthContext — it handles everything
      await login(formData.email, formData.password);

      setMessage("Login successful");
      navigate("/");

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="container col-md-4"
      style={{
        maxWidth: "400px",
        maxHeight: "80vh",
        overflow: "auto",
        marginTop: "100px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        padding: "20px",
      }}
    >
      <h3>Login</h3>

      {message && (
        <div
          className={`alert ${
            message.includes("successful") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={formData.email}
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
            value={formData.password}
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
