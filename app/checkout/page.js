"use client";

import { useAuth } from "../../hooks/UseAuth";
import { useState } from "react";
import { useCart } from "../../components/CartContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://siacoffee.co.uk";


export default function CheckoutPage() {
  const { cart, cartCount, cartTotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return null; // or a small skeleton/spinner if you like
  }
  const hasItems = cartCount > 0;
  async function handleSubmit(e) {
  e.preventDefault();

  if (!hasItems) return;

  const formData = new FormData(e.currentTarget);

  const payload = {
    userId: user ? user.id : null,
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    address: {
      line1: String(formData.get("address") || ""),
      city: String(formData.get("city") || ""),
      postcode: String(formData.get("postcode") || ""),
      country: "UK",
    },
    notes: String(formData.get("notes") || ""),
    items: cart.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      size: item.size,
      qty: item.qty,
    })),
  };

  setSubmitting(true);
  setCheckoutError("");
  try {
  const res = await fetch(`${API_BASE}/api/stripe/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || !data.url) {
    setCheckoutError(data.message || "Could not start Stripe checkout.");
    return;
  }

  window.location.href = data.url;
  } catch (err) {
    setCheckoutError(err.message || "Unable to connect to checkout.");
  } finally {
    setSubmitting(false);
  }
}

  return (
    <>
      <section className="sia-interior-hero"><div className="sia-interior-hero-inner"><span className="sia-eyebrow">ALMOST THERE</span>
        <h1 className="sia-interior-title">Checkout</h1>
        <p className="sia-interior-subtitle">
          Fresh coffee is just around the corner. Add your delivery details and continue to secure payment.
        </p>
      </div></section>

      <section className="section sia-interior-section">
        <div className="sia-checkout-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.8fr) minmax(0, 1.2fr)",
            gap: "1.75rem",
            alignItems: "flex-start"
          }}
        >
          {/* Left: details + payment form */}
          <div className="card sia-interior-card">
            <span className="sia-eyebrow">STEP 01 · DELIVERY</span><h2 className="sia-card-heading">
              Delivery details
            </h2>
            <form className="form" onSubmit={handleSubmit}>
              {/* Delivery details */}
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  required
                  defaultValue={user ? user.name : ""}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email for updates</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  required
                  defaultValue={user ? user.email : ""}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="form-control"
                  placeholder="Street and house number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="form-control"
                  placeholder="City"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="postcode">Postcode</label>
                <input
                  id="postcode"
                  name="postcode"
                  type="text"
                  className="form-control"
                  placeholder="Postcode"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Order notes (optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-textarea"
                  placeholder="Anything we should know about your delivery or grind preference?"
                />
              </div>

              <div className="sia-stripe-note">
                <span className="sia-eyebrow">SECURE PAYMENT</span>
                <p>You'll be redirected to Stripe to complete your payment securely. We don't collect card details on this page.</p>
              </div>

              <button
                className="sia-primary-action sia-checkout-submit"
                type="submit"
                disabled={!hasItems || submitting}
                style={{ marginTop: "0.75rem" }}
              >
                {submitting ? "Connecting to Stripe…" : "Continue to secure payment"}
              </button>
              {checkoutError && <p role="alert" className="sia-checkout-error">{checkoutError}</p>}
              {!hasItems && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    marginTop: "0.5rem"
                  }}
                >
                  Your cart is empty – add some coffees from the shop first.
                </p>
              )}
            </form>
          </div>

          {/* Right: order summary */}
          <aside className="card sia-interior-card">
            <span className="sia-eyebrow">YOUR BASKET</span><h2 className="sia-card-heading">
              Order summary
            </h2>
            {cart.length === 0 ? (
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
                No items in your cart yet.
              </p>
            ) : (
              <>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gap: "0.5rem",
                    marginBottom: "0.75rem"
                  }}
                >
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.04)",
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
                            {item.qty} × £{item.price} • {item.size}
                          </div>
                        </div>
                        <div>£{item.qty * item.price}</div>
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
                  <span>Subtotal</span>
                  <span>£{cartTotal}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.25rem",
                    fontSize: "0.85rem",
                    color: "var(--muted)"
                  }}
                >
                  <span>Shipping</span>
                  <span>Calculated at dispatch</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.75rem",
                    fontWeight: 700
                  }}
                >
                  <span>Total</span>
                  <span>£{cartTotal}</span>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
