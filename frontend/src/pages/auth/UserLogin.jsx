import React, { useState } from 'react'; 
import '../../styles/auth-shared.css';
import '../../styles/skeleton.css'; 
import API from "../../utils/api";
import { useNavigate, Link } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await API.post("/api/auth/user/login", {
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false); // Stop loading only if it fails so they can fix credentials
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* server is "waking up" */}
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

      <div className="auth-card" role="region" aria-labelledby="user-login-title">
        <header>
          <h1 id="user-login-title" className="auth-title">User Login</h1>
          <p className="auth-subtitle">Log in as partner? <Link to="/food-partner/login">Click here</Link> </p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" disabled={loading} />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" disabled={loading} />
          </div>
          
          {/* Disable button and change text during loading */}
          <button 
            className={`auth-submit ${loading ? 'btn-disabled' : ''}`} 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
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