import { useEffect, useState } from "react";
import axios from "axios";
import URL from "../services/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [ChangePassword, setChangePassword] = useState(false);

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load profile");
    }
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setMessage("❌ Passwords do not match");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${URL}/api/auth/update-password`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Password updated successfully!");
      setPassword("");
      setConfirmPass("");
    } catch (err) {
      setMessage("❌ Failed to update password");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container p-4 my-5" style={{ maxWidth: "900px", maxHeight: "80vh", overflowY: "auto" }}>
      <h2 className="text-center fw-bold mb-5">👤 My Profile</h2>

      {user ? (
        <div className="row justify-content-center">
          {/* Profile Card */}
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-4 mb-4">
              <div className="card-body text-center">
                <div className="mb-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="profile"
                    className="rounded-circle border"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <h4 className="fw-bold mb-1">{user.name}</h4>
                <p className="text-muted mb-1">{user.email}</p>
                <p className="mb-1">
                  <strong>📞</strong> {user.phone}
                </p>
                <span className="badge bg-primary">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading profile...</p>
      )}

      {/* Password Change */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3 text-center">🔑 Change Password</h5>
              {message && (
                <div
                  className={`alert ${message.includes("✅")
                      ? "alert-success"
                      : "alert-danger"
                    } text-center`}
                >
                  {message}
                </div>
              )}
              {ChangePassword === true && (
                <form onSubmit={handlePasswordChange}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-3"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-3"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 rounded-3 fw-bold"
                  >
                    Update Password
                  </button>
                </form>
              )}
              <div className="text-center mt-3">
                <button className="btn btn-secondary rounded-3 fw-bold" onClick={() => setChangePassword(!ChangePassword)}>
                  {ChangePassword ? "Cancel" : "Change Password"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
