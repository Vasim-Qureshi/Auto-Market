// File: context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import URL from '../services/api.js'; // Adjust the import path as necessary

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // LOGIN (no token handling here)
  // ===============================
  const login = async (email, password) => {
    const res = await axios.post(
      `${URL}/api/auth/login`,
      { email, password },
      { withCredentials: true } // IMPORTANT
    );

    // After login fetch user
    await getMe();
    return res.data;
  };

  // ===============================
  // LOGOUT (server clears cookie)
  // ===============================
  const logout = async () => {
    await axios.post(
      `${URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  // ===============================
  // GET USER FROM /api/me
  // ===============================
  const getMe = async () => {
    try {
      const res = await axios.get(
        `${URL}/api/auth/me`,
        { withCredentials: true }
      );
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Load user on first visit
  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };