import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NoteEditor from "./components/NoteEditor";
import NoteList from "./components/NoteList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EditProfile from "./components/EditProfile";

function App() {
  const [notes, setNotes]     = useState([]);
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [view, setView]       = useState("signin");
  const [apiError, setApiError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:50001";

  // ——————————————————————————————————————————
  // 1) On mount, restore auth from localStorage
  // ——————————————————————————————————————————
  useEffect(() => {
    const saved = localStorage.getItem("proNotesAuth");
    if (saved) {
      try {
        const { token: t, user: u } = JSON.parse(saved);
        setToken(t);
        setUser(u);
        setView("notes");
      } catch {
        localStorage.removeItem("proNotesAuth");
      }
    }
  }, []);

  // ——————————————————————————————————————————
  // 2) Whenever token changes, fetch notes (or clear)
  // ——————————————————————————————————————————
  useEffect(() => {
    if (!token) {
      setNotes([]);
      return;
    }

    fetch(`${API_BASE}/api/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to fetch notes");
        }
        return res.json();
      })
      .then((data) => {
        setNotes(
          data.map((n) => ({
            ...n,
            versions: n.versions.map((v) => ({
              ...v,
              timestamp: new Date(v.timestamp),
            })),
          }))
        );
        setView("notes");
        setApiError(null);
      })
      .catch((err) => {
        console.error(err);
        setApiError(err.message);
        if (/auth|token/i.test(err.message)) handleSignOut();
      });
  }, [token]);

  // ——————————————————————————————————————————
  // Helper to save auth to localStorage
  // ——————————————————————————————————————————
  const saveAuth = (t, u) => {
    localStorage.setItem("proNotesAuth", JSON.stringify({ token: t, user: u }));
  };

  // ——————————————————————————————————————————
  // Add a new note
  // ——————————————————————————————————————————
  const addNote = (title, content) => {
    if (!token) {
      setApiError("Please sign in to add notes");
      setView("signin");
      return;
    }
    fetch(`${API_BASE}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to add note");
        }
        return res.json();
      })
      .then((newNote) => {
        setNotes((prev) => [
          {
            ...newNote,
            versions: newNote.versions.map((v) => ({
              ...v,
              timestamp: new Date(v.timestamp),
            })),
          },
          ...prev,
        ]);
        setApiError(null);
      })
      .catch((err) => {
        console.error(err);
        setApiError(err.message);
      });
  };

  // ——————————————————————————————————————————
  // Update an existing note (new version)
  // ——————————————————————————————————————————
  const updateNote = (id, newContent) => {
    if (!token) {
      setApiError("Please sign in to update notes");
      setView("signin");
      return;
    }
    fetch(`${API_BASE}/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newContent }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to update note");
        }
        return res.json();
      })
      .then((updatedNote) => {
        setNotes((prev) =>
          prev.map((note) =>
            note._id === updatedNote._id
              ? {
                  ...updatedNote,
                  versions: updatedNote.versions.map((v) => ({
                    ...v,
                    timestamp: new Date(v.timestamp),
                  })),
                }
              : note
          )
        );
        setApiError(null);
      })
      .catch((err) => {
        console.error(err);
        setApiError(err.message);
      });
  };

  // ——————————————————————————————————————————
  // Sign In
  // ——————————————————————————————————————————
  const handleSignIn = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign in failed");

      setUser(data.user);
      setToken(data.token);
      saveAuth(data.token, data.user);
      setApiError(null);
    } catch (err) {
      console.error(err);
      setApiError(err.message);
    }
  };

  // ——————————————————————————————————————————
  // Sign Up
  // ——————————————————————————————————————————
  const handleSignUp = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign up failed");

      setUser(data.user);
      setToken(data.token);
      saveAuth(data.token, data.user);
      setApiError(null);
    } catch (err) {
      console.error(err);
      setApiError(err.message);
    }
  };

  // ——————————————————————————————————————————
  // Sign Out
  // ——————————————————————————————————————————
  const handleSignOut = () => {
    setUser(null);
    setToken(null);
    setNotes([]);
    setView("signin");
    setApiError(null);
    localStorage.removeItem("proNotesAuth");
  };

  // ——————————————————————————————————————————
  // Edit Profile
  // ——————————————————————————————————————————
  const handleProfileUpdate = async (updatedData) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setUser(data);
      saveAuth(token, data);
      setView("notes");
      setApiError(null);
    } catch (err) {
      console.error(err);
      setApiError(err.message);
    }
  };

  return (
    <>
      <Navbar
        user={user}
        onSignIn={() => setView("signin")}
        onSignUp={() => setView("signup")}
        onSignOut={handleSignOut}
        onEditProfile={() => setView("editprofile")}
      />

      <div className="container">
        {apiError && <div className="alert alert-danger">{apiError}</div>}

        {view === "signin" && (
          <SignIn onSignIn={handleSignIn} onSwitchToSignUp={() => setView("signup")} />
        )}

        {view === "signup" && (
          <SignUp onSignUp={handleSignUp} onSwitchToSignIn={() => setView("signin")} />
        )}

        {view === "editprofile" && user && (
          <EditProfile user={user} onUpdate={handleProfileUpdate} onCancel={() => setView("notes")} />
        )}

        {view === "notes" && (
          <>
            <h1>Welcome back, {user.name}!</h1>
            <NoteEditor addNote={addNote} />
            <NoteList notes={notes} updateNote={updateNote} currentUser={user} />
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;
