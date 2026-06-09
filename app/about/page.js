import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-title">Our story &amp; sourcing</h1>
        <p className="page-hero-subtitle">
          Sia Coffee is a small roastery obsessed with traceable, transparent coffee that
          actually makes your mornings feel better.
        </p>
      </section>

      <section className="section">
        <div className="about-grid">
          {/* Text column */}
          <div className="reveal-on-scroll">
            <div className="card">
              <h2 style={{ marginBottom: "0.75rem" }}>Why Sia Coffee?</h2>
              <p>
                Sia Coffee started with one simple thing: a genuine love for coffee.
              </p>
              <p>
                What began as a personal passion quickly grew into something more. Starting small, we spent countless hours learning, experimenting, and refining our craft—driven by the belief that great coffee should be accessible, authentic, and full of character.
              </p>
              <p>
                Today, that same spirit lives in every batch we produce. Our beans are hand roasted in small batches with care and precision, allowing us to bring out the unique flavors in every origin we work with. It's a process rooted in patience, attention to detail, and a deep respect for the craft.
              </p>
              <p>                
                We're not a big factory—and we don't want to be. We're a small, passionate operation dedicated to quality over quantity, and to sharing great coffee with people who appreciate it as much as we do.
              </p>
            </div>

            <div className="card" id="impact" style={{ marginTop: "1.5rem" }}>
              <h2 style={{ marginBottom: "0.75rem" }}>Impact &amp; transparency</h2>
              <ul className="story-list">
                <li>We pay at least 50–100% above fair-trade prices for all our coffees.</li>
                <li>
                  Every bag lists farm, elevation, process and harvest date – no mystery
                  blends.
                </li>
                <li>Shipments are offset via verified carbon projects.</li>
                <li>
                  Packaging is fully recyclable, with low-impact inks and minimal plastic.
                </li>
              </ul>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                We&apos;re not perfect, but we&apos;re committed to doing better each season:
                improving traceability, paying producers fairly and keeping our footprint as
                light as we can.
              </p>
            </div>

            <div className="card" style={{ marginTop: "1.5rem" }}>
              <h2 style={{ marginBottom: "0.75rem" }}>Roasting philosophy</h2>
              <p>
                We roast light to medium, always aiming to highlight what makes a coffee
                unique rather than chasing a single “house” style. Expect clarity, lots of
                sweetness and enough structure to work beautifully both as filter and
                espresso.
              </p>
              <p>
                Behind the scenes there&apos;s endless cupping, tweak after tweak, and more
                than a few over-caffeinated evenings – all so the cup you brew at home is as
                good as the one we tasted on the table.
              </p>
            </div>
          </div>

          {/* Image column */}
          <div className="reveal-on-scroll">
            <img
              src="/assets/img/about-farm.png"
              alt="Coffee farm at sunrise"
              style={{
                borderRadius: "1.5rem",
                boxShadow: "var(--shadow-soft)",
                marginBottom: "1.25rem",
                width: "100%",
                display: "block"
              }}
            />
            <img
              src="/assets/img/about-roaster.png"
              alt="Roaster checking coffee beans"
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

      <section className="section">
        <div className="subscription">
          <div className="subscription-inner reveal-on-scroll">
            <div className="subscription-highlight">Trade &amp; wholesale</div>
            <h3>Serving Sia Coffee in your space</h3>
            <p>
              We work with a small group of cafés, offices and creative studios who want
              coffee that starts conversations. If you&apos;re looking for a roasting
              partner, we can help with dial-in support, staff training and brew recipes.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
              Tell us a little about your bar, office or venue and we&apos;ll put together a
              simple, tailored offer – no complicated contracts.
            </p>
            <Link href="/contact" className="btn-light">
              Talk wholesale
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

