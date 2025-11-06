// File: src/admin/UsersManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../services/api"; // your backend base URL file

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "admin",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/api/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching users!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`${URL}/api/users/${editingUser._id}`, form);
        alert("User updated successfully!");
      } else {
        await axios.post(`${URL}/api/users`, form);
        alert("User added successfully!");
      }
      setForm({ name: "", email: "", phone: "", password: "", role: "admin" });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error saving user!");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${URL}/api/users/${id}`);
      alert("User deleted!");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error deleting user!");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: "",
      role: user.role,
    });
    setEditingUser(user);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", phone: "", password: "", role: "admin" });
  };

  return (
    <div className="container" style={{padding:"100px 20px 100px 20px"}}>
      <h2 className="mb-4 text-center fw-bold text-primary">Users Manager</h2>

      {/* Form Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingUser ? "Edit User" : "Add New User"}
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required={!editingUser}
                />
              </div>
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                </select>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <button type="submit" className="btn btn-success w-100">
                  {editingUser ? "Update User" : "Add User"}
                </button>
                {editingUser && (
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Users Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">All Users</h5>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.role === "admin"
                              ? "bg-primary"
                              : user.role === "seller"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersManager;
