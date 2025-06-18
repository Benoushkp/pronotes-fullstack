import React, { useState } from "react";

export default function Navbar({ user, onSignIn, onSignOut, onEditProfile, onSignUp }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">ProNotes</div>

        {!user ? (
          <div className="auth-buttons">
            <button onClick={() => onSignIn()} className="btn btn-outline">
              Sign In
            </button>
            <button onClick={() => onSignUp()} className="btn btn-primary">
              Sign Up
            </button>
          </div>
        ) : (
          <div className="user-menu">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="btn btn-user"
              aria-haspopup="true"
              aria-expanded={showDropdown}
            >
              Account ▾
            </button>
            {showDropdown && (
              <div className="dropdown">
                <div className="user-info">
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>
                <button onClick={onEditProfile} className="dropdown-btn">
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onSignOut();
                  }}
                  className="dropdown-btn logout"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
