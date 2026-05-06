import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth-shared.css";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    API.post("/api/auth/foodpartner/register", {
      name: businessName,
      contactName,
      phone,
      email,
      password,
      address,
    })
      .then((response) => {
        console.log(response.data);
        toast.success("Account created successfully!");
        navigate("/create-food");
      })
      .catch((error) => {
        console.error("There was an error registering!", error);
        toast.error("Registration failed. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="auth-page-wrapper">

      {loading && (
        <div className="login-loading-overlay">
          <div className="loading-content">
            <h2>Setting up your shop…</h2>
            <p>Preparing your partner account and analytics.</p>
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

      <div className="auth-card" role="region" aria-labelledby="partner-register-title">

        <header>
          <h1 id="partner-register-title" className="auth-title">Partner sign up</h1>
          <p className="auth-subtitle">Grow your business with FoodReels.</p>
        </header>

        {/* User / Partner toggle */}
        <div className="auth-toggle" role="group" aria-label="Account type">
          <Link to="/user/register" className="auth-toggle-btn inactive">User</Link>
          <span className="auth-toggle-btn active">Partner</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          <div className="auth-field">
            <label htmlFor="businessName">Business Name</label>
            <input
              id="businessName"
              name="businessName"
              placeholder="Tasty Bites"
              autoComplete="organization"
              disabled={loading}
            />
          </div>

          <div className="two-col">
            <div className="auth-field">
              <label htmlFor="contactName">Contact Name</label>
              <input
                id="contactName"
                name="contactName"
                placeholder="Jane Doe"
                autoComplete="name"
                disabled={loading}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                placeholder="+1 555 0000"
                autoComplete="tel"
                disabled={loading}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="email">Business Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
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
              placeholder="Create a strong password"
              autoComplete="new-password"
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
              autoComplete="street-address"
              disabled={loading}
            />
            <p className="small-note">Full address helps customers find you faster.</p>
          </div>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create Partner Account"}
          </button>
        </form>

        <div className="auth-alt-action">
          Already a partner? <Link to="/food-partner/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;