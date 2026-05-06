import React, { useState } from 'react';
import '../../styles/auth-shared.css';
import '../../styles/skeleton.css';
import API from "../../utils/api";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UserLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Checking credentials...");
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await API.post("/api/auth/user/login", {
        email,
        password
      }, { withCredentials: true });

      toast.success("Logged in successfully!", { id: toastId });
      console.log(response.data);
      navigate("/home");
    } catch (err) {
      toast.error("Invalid email or password.", { id: toastId });
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">

      {loading && (
        <div className="login-loading-overlay">
          <div className="loading-content">
            <h2>Waking up servers...</h2>
            <p>This may take a moment</p>
            <div className="loading-bar-container">
              <div className="loading-bar-fill shimmer"></div>
            </div>
          </div>
        </div>
      )}

      {/* Brand */}
      <div className="auth-brand">
        <div className="auth-brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 10l4.553-2.369A1 1 0 0121 8.535v6.93a1 1 0 01-1.447.894L15 14"/>
            <rect x="3" y="6" width="12" height="12" rx="2"/>
          </svg>
        </div>
        <span className="auth-brand-name">FoodReels</span>
      </div>

      <div className="auth-card" role="region" aria-labelledby="user-login-title">

        <header>
          <h1 id="user-login-title" className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to discover what's cooking</p>
        </header>

        {/* User / Partner toggle */}
        <div className="auth-toggle" role="group" aria-label="Account type">
          <span className="auth-toggle-btn active">User</span>
          <Link to="/food-partner/login" className="auth-toggle-btn inactive">Partner</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <div className="auth-field-row">
              <label htmlFor="password">Password</label>
              <a href="https://github.com/zxzxmeett/FoodReels" className="auth-forgot">Demo Creds Here</a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="auth-alt-action">
          New here? <Link to="/user/register">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;