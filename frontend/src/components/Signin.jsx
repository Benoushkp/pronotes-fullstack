// SignIn.jsx
import React, { useState } from "react";

export default function SignIn({ onSignIn = () => {}, onSwitchToSignUp = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await onSignIn(email, password);
    } catch (err) {
      setError(err.message || "Sign in failed");
      console.error("SignIn Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign In</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <button type="submit">Sign In</button>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          style={{
            background: "none",
            border: "none",
            color: "#92fe9d",
            cursor: "pointer",
            fontWeight: "600",
            textDecoration: "underline",
            padding: 0,
            fontSize: "1rem",
          }}
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}
