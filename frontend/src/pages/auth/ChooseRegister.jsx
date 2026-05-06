import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';

const ChooseRegister = () => {
  return (
    <div className="auth-page-wrapper">

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

      <div className="auth-card" role="region" aria-labelledby="choose-register-title">
        <header>
          <h1 id="choose-register-title" className="auth-title">Join FoodReels</h1>
          <p className="auth-subtitle">Choose how you want to get started.</p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* User option */}
          <Link to="/user/register" className="auth-role-btn primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            Continue as User
          </Link>

          {/* Partner option */}
          <Link to="/food-partner/register" className="auth-role-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Continue as Food Partner
          </Link>
        </div>

        <div className="auth-divider">or sign in</div>

        <div className="auth-alt-action">
          Sign in as{' '}
          <Link to="/user/login">User</Link>
          {' '}·{' '}
          <Link to="/food-partner/login">Food Partner</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;