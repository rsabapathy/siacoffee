"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://siacoffee.co.uk";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      topic: String(formData.get("topic") || "General question"),
      message: String(formData.get("message") || ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setFeedback("Please fill in your name, email and message.");
      return;
    }

    try {
      setStatus("loading");
      setFeedback("");

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setFeedback(data.message || "Something went wrong. Please try again.");
        return;
      }

      form.reset();
      setStatus("success");
      setFeedback("Thanks! Your message has been sent.");
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setFeedback("Could not send your message. Please try again.");
    }
  }

  return (
    <div className="sia-interior sia-contact-page">
      <section className="sia-inner-hero"><div className="sia-container"><span className="sia-eyebrow">General enquiries · Wholesale · Support</span>
        <h1 className="page-hero-title">Let&apos;s talk coffee<span className="sia-gold-dot">.</span></h1>
        <p className="page-hero-subtitle">
          Whether you&apos;re a home brewer with questions or a café looking for a roasting
          partner, we&apos;d love to hear from you.
        </p></div>
      </section>

      <section className="sia-inner-section"><div className="sia-container">
        <div className="contact-layout">
          <div className="reveal-on-scroll">
            <div className="card">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
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
                  <label htmlFor="email">Email</label>
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
                  <label htmlFor="topic">Topic</label>
                  <select id="topic" name="topic" className="form-control">
                    <option>General question</option>
                    <option>Order support</option>
                    <option>Wholesale</option>
                    <option>Collaboration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell us what you have in mind..."
                    required
                  />
                </div>

                <button className="btn" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send message"}
                </button>

                {feedback && (
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color:
                        status === "success"
                          ? "green"
                          : "var(--muted)",
                      marginTop: "0.75rem",
                    }}
                  >
                    {feedback}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="reveal-on-scroll">
            <div className="card" style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ marginBottom: "0.75rem" }}>Contact details</h2>
              
               <p>
                 <strong>Email</strong>
                 <br />
                 sale@siacoffee.co.uk
               </p>

               <p style={{ marginTop: "0.75rem" }}>
                 <strong>Roastery</strong>
                 <br />
                 Sia Coffee
                 <br />
                 45 Lansbury Road
                 <br />
                 Milton Keynes, UK
               </p>
            </div>

            <img
              src="/assets/img/contact-cafe.png"
              alt="Warm coffee shop interior"
              style={{
                borderRadius: "1.5rem",
                boxShadow: "var(--shadow-soft)",
                width: "100%",
                display: "block",
              }}
            />
          </div>
        </div>
      </div></section>
    </div>
  );
}
