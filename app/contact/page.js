export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-title">Let&apos;s talk coffee</h1>
        <p className="page-hero-subtitle">
          Whether you&apos;re a home brewer with questions or a café looking for a roasting
          partner, we&apos;d love to hear from you.
        </p>
      </section>

      <section className="section">
        <div className="contact-layout">
          {/* Form column */}
          <div className="reveal-on-scroll">
            <div className="card">
              {/* Simple HTML form – no client handler so it works as a Server Component */}
              <form className="form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
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
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="topic">Topic</label>
                  <select id="topic" className="form-control">
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
                    className="form-textarea"
                    placeholder="Tell us what you have in mind..."
                  />
                </div>

                <button className="btn" type="submit">
                  <span>Send message</span>
                </button>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    marginTop: "0.5rem"
                  }}
                >
                  This is a demo form – wire it up to your favourite form backend (Formspree,
                  Getform, etc.) when you&apos;re ready.
                </p>
              </form>
            </div>
          </div>

          {/* Info + image column */}
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

              <p style={{ marginTop: "0.75rem" }}>
                <strong>Wholesale &amp; trade</strong>
                <br />
                Looking for beans for your café, office or studio? Share a few details about
                your set-up (machines, volume, opening hours) and we&apos;ll get back to you
                within 1–2 working days with a simple proposal.
              </p>

              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Prefer to chat? Include a phone number and a good time to call and we&apos;ll
                arrange a quick tasting or dial-in session.
              </p>
            </div>

            <img
              src="/assets/img/contact-cafe.png"
              alt="Warm coffee shop interior"
              style={{
                borderRadius: "1.5rem",
                boxShadow: "var(--shadow-soft)",
                width: "100%",
                display: "block"
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
