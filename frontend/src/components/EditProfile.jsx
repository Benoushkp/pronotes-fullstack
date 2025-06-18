// EditProfile.jsx
import React, { useState } from "react";

export default function EditProfile({ user, onUpdate, onCancel }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }

    onUpdate({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="auth-form">
      <h2>Edit Profile</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <div className="form-actions" style={{ display: "flex", gap: "1rem", marginTop: "1.2rem" }}>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            style={{
              flex: 1,
              backgroundColor: "#444",
              color: "#eee",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#666")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#444")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              flex: 1,
              background: "linear-gradient(90deg, #00c9ff, #92fe9d)",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem",
              cursor: "pointer",
              fontWeight: "700",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
