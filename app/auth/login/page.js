"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../../lib/authClient";
import { useAuth } from "../../../hooks/UseAuth";

export default function LoginPage() {
  const router = useRouter();
  const { saveAuth, refreshUser } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
  e.preventDefault();
  setError(null);

  const formData = new FormData(e.currentTarget);
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    setError("Please enter email and password.");
    return;
  }

  try {
    setLoading(true);

      const data = await loginUser(email, password);
      saveAuth(null, data.user);

      window.location.assign("/account");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {/* same hero layout */}
      <section className="page-hero">
        <h1 className="page-hero-title">Sign in</h1>
        <p className="page-hero-subtitle">
          Access your Sia Coffee account and breeze through checkout.
        </p>
      </section>

      <section className="section form-container">
        <div className="card">
          <h2 style={{ marginBottom: "0.75rem", fontSize: "1.15rem" }}>
            Welcome back
          </h2>

          {error && (
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--danger, #ffb3b3)",
                marginBottom: "0.75rem"
              }}
            >
              {error}
            </p>
          )}

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="Your password"
                required
              />
            </div>

            <button className="btn" type="submit" disabled={loading}>
              <span>{loading ? "Signing in..." : "Sign in"}</span>
            </button>

            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                marginTop: "0.5rem"
              }}
            >
              New here?{" "}
              <a href="/auth/register" style={{ textDecoration: "underline" }}>
                <span>Create an account</span>
              </a>
              .
            </p>
          </form>
        </div>
        <aside className="card"></aside>
      </section>
    </>
  );
}
