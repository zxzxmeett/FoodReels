import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';
import '../../styles/skeleton.css';
import API from "../../utils/api";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await API.post("/api/auth/user/register", {
        fullName: firstName + " " + lastName,
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);
      toast.success("Account created successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">

      {loading && (
        <div className="login-loading-overlay">
          <div className="loading-content">
            <h2>Creating your profile…</h2>
            <p>Our servers are preparing your workspace.</p>
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

      <div className="auth-card" role="region" aria-labelledby="user-register-title">

        <header>
          <h1 id="user-register-title" className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join to explore and enjoy delicious meals.</p>
        </header>

        {/* User / Partner toggle */}
        <div className="auth-toggle" role="group" aria-label="Account type">
          <span className="auth-toggle-btn active">User</span>
          <Link to="/food-partner/register" className="auth-toggle-btn inactive">Partner</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="two-col">
            <div className="auth-field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Jane"
                autoComplete="given-name"
                disabled={loading}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                autoComplete="family-name"
                disabled={loading}
              />
            </div>
          </div>

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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={loading}
            />
          </div>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <div className="auth-alt-action">
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;