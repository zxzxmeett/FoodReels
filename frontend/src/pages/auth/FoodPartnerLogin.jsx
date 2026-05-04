import { useState } from "react";
import React from "react";
import "../../styles/auth-shared.css";
import "../../styles/skeleton.css";
import API from "../../utils/api";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await API.post("/api/auth/foodpartner/login", {
        email,
        password,
      });

      console.log(response.data);
      navigate("/create-food");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      {loading && (
        <div className="login-loading-overlay">
          <div className="loading-content">
            <h2>Accessing Partner Portal...</h2>
            <p>Our servers are waking up to fetch your dashboard.</p>
            <div className="loading-bar-container">
               <div className="loading-bar-fill shimmer"></div>
            </div>
          </div>
        </div>
      )}

      <div
        className="auth-card"
        role="region"
        aria-labelledby="partner-login-title"
      >
        <header>
          <h1 id="partner-login-title" className="auth-title">
            Partner login
          </h1>
          <p className="auth-subtitle">
            Log In as user? <Link to="/user/login">Click here</Link>
          </p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
              autoComplete="email"
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <button className="auth-submit" type="submit">
            Sign In
          </button>
        </form>
        <div className="auth-alt-action">
          New partner? <Link to="/food-partner/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
