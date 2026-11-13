"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "../../../lib/authClient";
import { useAuth } from "../../../hooks/UseAuth";

export default function RegisterPage() {
  const { saveAuth } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    if (!name || !email || !password) {
      setError("Please complete all fields.");
      return;
    }
    try {
      setLoading(true);
      const { user } = await registerUser(name, email, password);
      saveAuth(null, user);
      window.location.assign("/account");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="sia-auth-page">
      <section className="sia-interior-hero">
        <div className="sia-interior-hero-inner">
          <span className="sia-eyebrow">SIA COFFEE · JOIN US</span>
          <h1 className="sia-interior-title">Your coffee journey.</h1>
          <p className="sia-interior-subtitle">
            Create your account to keep track of orders and make every checkout a little easier.
          </p>
        </div>
      </section>

      <section className="sia-auth-section">
        <div className="sia-auth-layout">
          <div className="sia-auth-card">
            <span className="sia-eyebrow">LET'S GET ACQUAINTED</span>
            <h2 className="sia-card-heading">Create your account</h2>
            <p className="sia-auth-intro">A few details, and you're ready to explore.</p>
            {error && <p className="sia-auth-error" role="alert">{error}</p>}
            <form className="form sia-auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" autoComplete="name"
                  className="form-control" placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email"
                  className="form-control" placeholder="you@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"
                  autoComplete="new-password" className="form-control"
                  placeholder="Create a password" required />
              </div>
              <button className="sia-primary-action sia-auth-submit" type="submit" disabled={loading}>
                {loading ? "Creating account…" : "Create your account"}
              </button>
            </form>
            <p className="sia-auth-switch">
              Already have an account? <Link href="/auth/login">Sign in</Link>
            </p>
          </div>
          <aside className="sia-auth-aside">
            <span className="sia-eyebrow">WELCOME TO SIA</span>
            <h2>A little more<br />to savour.</h2>
            <p>Find your favourite roast, follow your orders and make room for better coffee moments.</p>
            <div className="sia-auth-aside-rule" />
            <p className="sia-auth-aside-foot">Specialty coffee, with care in every detail.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
