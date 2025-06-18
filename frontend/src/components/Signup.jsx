// SignUp.jsx
import React, { useState } from "react";

export default function SignUp({ onSignUpSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:50001/api/auth/signup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ name, email, password }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(text || "Invalid server response");
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Sign up failed");
        return;
      }

      if (typeof onSignUpSuccess === "function") {
        onSignUpSuccess(data);
      } else {
        console.log("Signup success:", data);
      }
    } catch (err) {
      setError(err.message || "Network error");
      console.error("SignUp Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
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
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={6}
        required
        autoComplete="new-password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
