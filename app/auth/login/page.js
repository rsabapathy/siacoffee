"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "../../../lib/authClient";
import { useAuth } from "../../../hooks/UseAuth";

export default function LoginPage() {
  const { saveAuth } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    try {
      setLoading(true);
      const data = await loginUser(email, password);
      saveAuth(null, data.user);
      window.location.assign("/account");
    } catch (err) {
      setError(err.message || "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="sia-auth-page">
      <section className="sia-interior-hero">
        <div className="sia-interior-hero-inner">
          <span className="sia-eyebrow">SIA COFFEE · YOUR ACCOUNT</span>
          <h1 className="sia-interior-title">Welcome back.</h1>
          <p className="sia-interior-subtitle">
            Sign in to see your orders, manage your details and enjoy a smoother checkout.
          </p>
        </div>
      </section>

      <section className="sia-auth-section">
        <div className="sia-auth-layout">
          <div className="sia-auth-card">
            <span className="sia-eyebrow">GOOD TO SEE YOU AGAIN</span>
            <h2 className="sia-card-heading">Sign in</h2>
            <p className="sia-auth-intro">Your next great cup is just a few clicks away.</p>
            {error && <p className="sia-auth-error" role="alert">{error}</p>}
            <form className="form sia-auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email"
                  className="form-control" placeholder="you@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"
                  autoComplete="current-password" className="form-control"
                  placeholder="Enter your password" required />
              </div>
              <button className="sia-primary-action sia-auth-submit" type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Sign in to your account"}
              </button>
            </form>
            <p className="sia-auth-switch">
              New to SIA Coffee? <Link href="/auth/register">Create an account</Link>
            </p>
          </div>
          <aside className="sia-auth-aside">
            <span className="sia-eyebrow">A BETTER COFFEE ROUTINE</span>
            <h2>Good coffee.<br />Made personal.</h2>
            <p>Keep your favourite coffees close and your order history in one place.</p>
            <div className="sia-auth-aside-rule" />
            <p className="sia-auth-aside-foot">Thoughtfully sourced. Freshly roasted. Always SIA.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
