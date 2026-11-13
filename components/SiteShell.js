"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartProvider, useCart } from "./CartContext";
import { useAuth } from "../hooks/UseAuth"; 

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
  const { user, logout } = useAuth();

  const {
    cart,
    cartCount,
    cartTotal,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart
  } = useCart();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
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
      {/* Responsive SIA navigation */}
      <header className="sia-site-header">
        <div className="sia-container sia-site-nav">
          <Link href="/" className="sia-site-brand" aria-label="SIA Coffee home"><img src="/assets/design/logo.png" alt="SIA Coffee" /></Link>
          <div className="sia-desktop-links"><Link href="/">Home</Link><Link href="/shop">Our coffees</Link><Link href="/about">Our story</Link><Link href="/contact">Contact</Link></div>
          <div className="sia-site-actions">
            {mounted && user ? <><Link href="/account" className="sia-account-link">{user.name?.split(" ")[0] || "Account"}</Link><button type="button" onClick={async()=>{await logout();window.location.assign("/");}} className="sia-account-link">Log out</button></> : <Link href="/auth/login" className="sia-account-link">Sign in</Link>}
            <button type="button" className="sia-cart-button" aria-label="Open cart" onClick={()=>setCartOpen(true)}>Cart {mounted && cartCount > 0 ? `(${cartCount})` : ""}</button>
            <button type="button" className="sia-menu-toggle" aria-label="Toggle navigation" aria-controls="sia-mobile-navigation" aria-expanded={navOpen} onClick={()=>setNavOpen(v=>!v)}><span/><span/><span/></button>
          </div>
        </div>
        <div id="sia-mobile-navigation" className="sia-mobile-navigation" hidden={!navOpen}>
          <Link href="/" onClick={()=>setNavOpen(false)}>Home</Link><Link href="/shop" onClick={()=>setNavOpen(false)}>Our coffees</Link><Link href="/about" onClick={()=>setNavOpen(false)}>Our story</Link><Link href="/contact" onClick={()=>setNavOpen(false)}>Contact</Link><Link href="/account" onClick={()=>setNavOpen(false)}>My account</Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="sia-main">{children}</main>

      {/* FOOTER */}
      <footer className="page">
        <div className="footer-row">
          <div>© {mounted ? new Date().getFullYear() : "2026"} Sia Coffee Ltd. All rights reserved.</div>
          <div className="footer-links">
            <Link href="/shop">Shop</Link>
            <Link href="/about">Story</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
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
