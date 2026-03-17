import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../utils/api";
import "../styles/signup.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await signupUser({ name, email, password });

    if (data.token) {
      // ✅ Save token
      localStorage.setItem("token", data.token);

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } else {
      setMsg(data.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>

      {msg && <p className="error">{msg}</p>}

      <p className="switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}