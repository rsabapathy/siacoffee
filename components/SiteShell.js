"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartProvider, useCart } from "./CartContext";

export default function SiteShell({ children }) {
  return (
    <CartProvider>
      <ChromeInner>{children}</ChromeInner>
    </CartProvider>
  );
}

function ChromeInner({ children }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const {
    cart,
    cartCount,
    cartTotal,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart
  } = useCart();

  // Close nav & cart when route changes
  useEffect(() => {
    setNavOpen(false);
    setCartOpen(false);
  }, [pathname]);

  // Body class for mobile nav
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("nav-open", navOpen);
  }, [navOpen]);

  // Reveal & parallax (re-run on route change)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const revealEls = document.querySelectorAll(".reveal-on-scroll");
    let io;
    if ("IntersectionObserver" in window && revealEls.length) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-revealed"));
    }

    const parallaxEls = document.querySelectorAll(".parallax");
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.15");
        const y = scrollY * speed;
        el.style.transform = `translateY(${y}px)`;
      });
    };

    if (parallaxEls.length) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    return () => {
      if (io) io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const isActive = (href) =>
    pathname === href || (href === "/shop" && pathname.startsWith("/shop"));

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* HEADER / NAV */}
      <header>
        <div className="page">
          <nav className="nav">

            <button
              className="nav-toggle"
              aria-label="Toggle navigation"
              onClick={() => setNavOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="nav-links">
              <Link href="/" className={isActive("/") ? "active" : ""}>
                Home
              </Link>
              <Link href="/shop" className={isActive("/shop") ? "active" : ""}>
                Shop
              </Link>
              <Link href="/about" className={isActive("/about") ? "active" : ""}>
                About
              </Link>
              <Link
                href="/contact"
                className={isActive("/contact") ? "active" : ""}
              >
                Contact
              </Link>
            </div>

            <div className="logo">
              {/* <span className="logo-dot" /> */}
              <img 
                src="/assets/img/siacoffeelogo.png"
                alt="Sia Coffee bag and cup"
                width="80" />
                {/* Sia coffee */}
            </div>

            <div className="nav-cta">
              {/* Mini cart button */}
              <button
                type="button"
                className="cart-toggle"
                aria-label="Open cart"
                onClick={() => setCartOpen(true)}
              >
                <span>🛒</span>
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </button>
              
              <Link href="/auth/login" className="btn-ghost"><span>Sign In</span></Link>
              <Link href="/shop" className="btn">
                Shop Now
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="page">{children}</main>

      {/* FOOTER */}
      <footer className="page">
        <div className="footer-row">
          <div>© {currentYear} Sia Coffee Ltd. All rights reserved.</div>
          <div className="footer-links">
            <Link href="/shop">Shop</Link>
            <Link href="/about">Story</Link>
            <Link href="/contact">Contact</Link>
            <a href="#">Privacy</a>
          </div>
          <div className="social">
            <a href="#" aria-label="Instagram">
              IG
            </a>
            <a href="#" aria-label="TikTok">
              TT
            </a>
            <a href="mailto:sale@siacoffee.co.uk" aria-label="Email">
              ✉
            </a>
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <h2>Your cart</h2>
              <button
                type="button"
                className="cart-drawer-close"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <span>×</span>
              </button>
            </div>

            {cart.length === 0 ? (
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
                Your cart is empty. Head to the shop to add something tasty.
              </p>
            ) : (
              <>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--muted)",
                    marginBottom: "0.75rem"
                  }}
                >
                  {cartCount} item{cartCount > 1 ? "s" : ""} in cart
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                    maxHeight: "50vh",
                    overflowY: "auto"
                  }}
                >
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                        paddingBottom: "0.4rem",
                        marginBottom: "0.3rem"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "0.75rem",
                          fontSize: "0.9rem"
                        }}
                      >
                        <div>
                          <strong>{item.name}</strong>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--muted)"
                            }}
                          >
                            {item.size} • £{item.price} / bag
                          </div>
                        </div>
                        <div>£{item.qty * item.price}</div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "0.4rem",
                          fontSize: "0.85rem"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem"
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => decrementItem(item.id)}
                            style={{
                              borderRadius: "999px",
                              border:
                                "1px solid rgba(122, 95, 70, 0.4)",
                              padding: "0.1rem 0.55rem",
                              background: "transparent",
                              cursor: "pointer"
                            }}
                          >
                            <span>−</span>
                          </button>
                          <span
                            style={{
                              minWidth: "1.5rem",
                              textAlign: "center"
                            }}
                          >
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementItem(item.id)}
                            style={{
                              borderRadius: "999px",
                              border:
                                "1px solid rgba(122, 95, 70, 0.4)",
                              padding: "0.1rem 0.55rem",
                              background: "transparent",
                              cursor: "pointer"
                            }}
                          >
                            <span>+</span>
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "var(--muted)",
                            cursor: "pointer",
                            fontSize: "0.8rem"
                          }}
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.5rem",
                    fontWeight: 600
                  }}
                >
                  <span>Total</span>
                  <span>£{cartTotal}</span>
                </div>

                <Link
                  href="/checkout"
                  className="btn"
                  style={{
                    width: "100%",
                    marginTop: "0.9rem",
                    display: "inline-flex",
                    justifyContent: "center"
                  }}
                >
                  Go to checkout
                </Link>

                <button
                  type="button"
                  className="btn-ghost"
                  style={{
                    width: "100%",
                    marginTop: "0.5rem",
                    justifyContent: "center"
                  }}
                  onClick={clearCart}
                >
                  <span>Clear cart</span>
                </button>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
