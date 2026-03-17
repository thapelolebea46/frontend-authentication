import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/resetPassword.css";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });
    const data = await res.json();
    setMsg(data.msg);
    if (data.msg === "Password reset successful") {
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {msg && <p>{msg}</p>}
      <p className="switch">
  Back to{" "}
  <Link to="/login" style={{ color: "#007bff", textDecoration: "underline" }}>
    Login
  </Link>
</p>
    </div>
  );
}