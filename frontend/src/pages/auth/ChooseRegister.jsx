import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';

const ChooseRegister = () => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="choose-register-title">
        <header>
          <h1 id="choose-register-title" className="auth-title">FoodReels</h1>
          <p className="auth-subtitle">Join the platform today</p>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link to="/user/register" className="auth-role-btn">
            Continue as User
          </Link>

          <Link to="/food-partner/register" className="auth-role-btn">
            Continue as Food Partner
          </Link>
        </div>
        <div className="auth-alt-action" style={{ marginTop: "8px" }}>
            Already have an account?
        </div>
        <div className="auth-alt-action" style={{ marginTop: "-14px" }}>
            Sign in as:{" "}
            <Link to="/user/login">User</Link> •{" "}
            <Link to="/food-partner/login">Food Partner</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;