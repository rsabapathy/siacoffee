"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section id="hero" className="hero parallax" data-speed="0.06">
        <div className="hero-inner reveal-on-scroll">
          <div className="hero-kicker">New specialty coffee brand</div>
          <h1 className="hero-title">Wake up to coffee that actually tastes alive.</h1>
          <div className="hero-highlight">
            Small-batch • Ethically sourced • Roasted to order
          </div>
          <p className="hero-subtitle">
            Iyarkai Roast works directly with growers to bring you beans roasted in tiny batches,
            shipped within 24 hours for a cup that tastes bright, sweet, and seriously fresh.
          </p>
          <div className="hero-ctas">
            <Link href="/shop" className="btn">
              Shop beans
            </Link>
            <Link href="/about" className="btn-ghost">
              Discover our story
            </Link>
          </div>
          <div className="hero-meta">
            <span>
              <strong>48h from roastery</strong>
              Average time to your cup
            </span>
            <span>
              <strong>4.9 ★</strong>
              Loved by early tasters
            </span>
          </div>
        </div>

        <div className="hero-image-wrap reveal-on-scroll">
          <div className="hero-card">
            <span className="hero-tag">New • Limited release</span>
            <div className="product-image">
              <img
                src="/assets/img/hero-bag-mug.png"
                alt="Iyarkai Roast coffee bag and cup"
              />
            </div>
            <div className="hero-stats">
              <div>
                <strong>Solar Dawn Blend</strong>
                Notes of cocoa, citrus &amp; honey
              </div>
              <div>
                <strong>£14</strong>
                250g whole bean
              </div>
            </div>
            <div className="hero-badge">
              <span className="dot"></span>
              Fresh-roasted this week
            </div>
          </div>
        </div>
      </section>

      <section className="features-strip section">
        <div className="feature-pill reveal-on-scroll">
          <div className="feature-icon">☕</div>
          Small-batch roasted in micro lots
        </div>
        <div className="feature-pill reveal-on-scroll">
          <div className="feature-icon">🌱</div>
          Ethically sourced &amp; traceable farms
        </div>
        <div className="feature-pill reveal-on-scroll">
          <div className="feature-icon">🚚</div>
          Roasted to order, fast delivery
        </div>
        <div className="feature-pill reveal-on-scroll">
          <div className="feature-icon">🌍</div>
          Carbon-neutral shipping
        </div>
      </section>

      <section id="coffee" className="section">
        <div className="section-header">
          <div className="section-title">Explore our coffees</div>
          <p className="section-subtitle">
            Start with our three signature roasts, designed for different brewing styles but united
            by one thing: unforgettable flavour.
          </p>
        </div>

        <div className="products-grid">
          <article className="product-card reveal-on-scroll">
            <div className="product-image">
              <img
                src="/assets/img/product-ethiopia.png"
                alt="Single-origin coffee from Ethiopia"
              />
            </div>
            <div className="product-label">Single origin</div>
            <h3 className="product-name">Solar Dawn — Sri lanka</h3>
            <p className="product-notes">
              Bright &amp; floral with notes of bergamot, peach and raw sugar.
            </p>
            <div className="product-footer">
              <div className="price">
                £14 <small>/ 250g</small>
              </div>
              <Link href="/shop#solar-dawn" className="btn-ghost">
                Add to cart
              </Link>
            </div>
          </article>

          <article className="product-card reveal-on-scroll">
            <div className="product-image">
              <img
                src="/assets/img/product-espresso.png"
                alt="Espresso blend coffee"
              />
            </div>
            <div className="product-label">Espresso blend</div>
            <h3 className="product-name">Midnight Ember</h3>
            <p className="product-notes">
              Rich &amp; chocolatey, amazing as flat whites and moka pot.
            </p>
            <div className="product-footer">
              <div className="price">
                £13 <small>/ 250g</small>
              </div>
              <Link href="/shop#midnight-ember" className="btn-ghost">
                Add to cart
              </Link>
            </div>
          </article>

          <article className="product-card reveal-on-scroll">
            <div className="product-image">
              <img src="/assets/img/product-decaf.png" alt="Decaf coffee" />
            </div>
            <div className="product-label">Decaf</div>
            <h3 className="product-name">Moonlight Decaf</h3>
            <p className="product-notes">
              Swiss water processed, caramel sweetness with a smooth finish.
            </p>
            <div className="product-footer">
              <div className="price">
                £13 <small>/ 250g</small>
              </div>
              <Link href="/shop#moonlight-decaf" className="btn-ghost">
                Add to cart
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section id="story" className="section">
        <div className="story">
          <div className="story-card reveal-on-scroll">
            <div className="story-kicker">Our story</div>
            <h3>From farm to cup, every step matters.</h3>
            <p>
              Iyarkai Roast started with a simple obsession: coffee that feels as alive as the sunrise.
              We partner with smallholder farmers, pay well above fair-trade, and roast in tiny batches
              so every bag tastes like a moment worth slowing down for.
            </p>
            <p>
              Each lot is cupped multiple times, roasted separately for filter and espresso, and
              shipped as close to roast day as possible.
            </p>
            <ul className="story-list">
              <li>
                Direct relationships with farms in Ethiopia, Colombia &amp; Guatemala.
              </li>
              <li>Transparent pricing and sourcing on every bag.</li>
              <li>Minimal, recyclable packaging with low-impact inks.</li>
            </ul>
          </div>

          <div className="reveal-on-scroll">
            <img
              src="/assets/img/story-roastery.png"
              alt="Coffee roastery"
              style={{ borderRadius: "1.5rem", boxShadow: "var(--shadow-soft)" }}
            />
          </div>
        </div>
      </section>

      <section id="subscription" className="section">
        <div className="subscription parallax" data-speed="0.03">
          <div className="subscription-inner reveal-on-scroll">
            <div className="subscription-highlight">Subscribe &amp; save 15%</div>
            <h3>Your best coffee, on repeat.</h3>
            <p>
              Never run out of beans again. Choose your favourite roast, grind, and schedule — we’ll take care
              of the rest. Cancel or change anytime with a single click.
            </p>
            <ul className="steps">
              <li>
                <span>1</span> Pick your coffee &amp; grind size.
              </li>
              <li>
                <span>2</span> Choose how often you’d like it delivered.
              </li>
              <li>
                <span>3</span> Brew fresh, every single morning.
              </li>
            </ul>
            <div className="subscription-cta">
              <Link href="/shop" className="btn-light">
                Start a subscription
              </Link>
              <Link
                href="/about#impact"
                className="btn-ghost"
                style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fefaf5" }}
              >
                See our sourcing
              </Link>
            </div>
          </div>

          <div className="reveal-on-scroll">
            <img
              src="/assets/img/subscription-boxes.png"
              alt="Coffee subscription boxes"
              style={{ borderRadius: "1.5rem" }}
            />
          </div>
        </div>
      </section>

      <section className="section pt-50">
        <div className="section-header">
          <div className="section-title">What early sippers are saying</div>
          <p className="section-subtitle">
            We quietly launched Iyarkai Roast with a small group of coffee lovers. Here’s what they told us.
          </p>
        </div>

        <div className="testimonials-grid">
          <article className="testimonial reveal-on-scroll">
            <p>
              “Bright, sweet and so clean. The Solar Dawn filter might be my favourite home brew ever.”
            </p>
            <div className="testimonial-footer">
              <div className="avatar">J</div>
              <div>
                <strong>Jess, London</strong>
                <br />
                Home brewer &amp; V60 nerd
              </div>
            </div>
          </article>

          <article className="testimonial reveal-on-scroll">
            <p>
              “The espresso blend is wild. I’m finally pulling shots at home that taste like my favourite café.”
            </p>
            <div className="testimonial-footer">
              <div className="avatar">M</div>
              <div>
                <strong>Mario, Bristol</strong>
                <br />
                Home barista
              </div>
            </div>
          </article>

          <article className="testimonial reveal-on-scroll">
            <p>
              “Love the flavour, but also the transparency. Knowing where my coffee comes from actually matters.”
            </p>
            <div className="testimonial-footer">
              <div className="avatar">A</div>
              <div>
                <strong>Ash, Manchester</strong>
                <br />
                Everyday coffee drinker
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="contact" className="newsletter">
        <div className="newsletter-text reveal-on-scroll">
          <h3>Get 10% off your first bag</h3>
          <p>Join the Iyarkai Brew Club for release drops, brew guides and special offers.</p>
        </div>
        <form
          className="newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email"
            required
          />
          <button className="btn" type="submit">
            <span>Join the Brew Club</span>
          </button>
        </form>
      </section>
    </>
  );
}
