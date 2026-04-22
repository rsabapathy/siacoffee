"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../../lib/authClient";
import { useAuth } from "../../../hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { saveAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const { token, user } = await registerUser(name, email, password);
      saveAuth(token, user);
      router.push("/shop"); // or "/"
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 👇 same hero style as checkout */}
      <section className="page-hero">
        <h1 className="page-hero-title">Create account</h1>
        <p className="page-hero-subtitle">
          Join Sia Coffee  to save your details and speed up checkout next time.
        </p>
      </section>

      {/* 👇 reuse section + card + form classes from checkout */}
      <section className="section form-container">
        <div className="card">
          <h2 style={{ marginBottom: "0.75rem", fontSize: "1.15rem" }}>
            Your details
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
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                placeholder="Your name"
                required
              />
            </div>

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
                placeholder="Choose a password"
                required
              />
            </div>

            <button
              className="btn"
              type="submit"
              disabled={loading}
              style={{ marginTop: "0.75rem" }}
            >
                <span>{loading ? "Creating account..." : "Create account"}</span>
              
            </button>

            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                marginTop: "0.5rem"
              }}
            >
              Already have an account?{" "}
              <a href="/auth/login" style={{ textDecoration: "underline" }}>
                Sign in
              </a>
              .
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
