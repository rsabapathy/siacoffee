"use client";

import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useCart } from "../../components/CartContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://admin.siacoffee.com";

const PAYMENT_METHODS = [
  { id: "card", label: "Card", subtitle: "Visa, Mastercard, Amex" },
  { id: "paypal", label: "PayPal", subtitle: "Pay with your PayPal account" },
  { id: "applepay", label: "Apple Pay", subtitle: "Fast checkout on supported devices" }
];

export default function CheckoutPage() {
  const { cart, cartCount, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return null; // or a small skeleton/spinner if you like
  }
  const hasItems = cartCount > 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasItems) return;

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const address = {
      line1: formData.get("address"),
      city: formData.get("city"),
      postcode: formData.get("postcode"),
      country: "UK"
    };
    const notes = formData.get("notes") || "";

    const items = cart.map((item) => ({
      // assuming you stored product._id in cart as `id`
      productId: item.id,
      name: item.name,
      price: item.price,
      size: item.size,
      qty: item.qty
    }));

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          address,
          notes,
          paymentProvider: "demo", // or "stripe"/"paypal" etc later
          userId: user ? user.id : null,
          items
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Order creation failed:", data);
        alert(data?.message || "Failed to create order (demo).");
        return;
      }

      // success 🎉
      clearCart();
      alert("Order saved in MongoDB (demo). Check /admin/orders to see it.");
    } catch (err) {
      console.error("Order request failed:", err);
      alert("Network error while creating order (demo).");
    }
  };

  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-title">Checkout</h1>
        <p className="page-hero-subtitle">
          Review your order, add your details and choose a payment method. This is a demo
          checkout – no real payment is processed.
        </p>
      </section>

      <section className="section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.8fr) minmax(0, 1.2fr)",
            gap: "1.75rem",
            alignItems: "flex-start"
          }}
        >
          {/* Left: details + payment form */}
          <div className="card">
            <h2 style={{ marginBottom: "0.75rem", fontSize: "1.15rem" }}>
              Delivery &amp; payment
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
                  defaultValue={user ? user.name : ""}
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

              {/* Payment method selector */}
              <div className="form-group">
                <label>Payment method</label>
                <div className="payment-methods">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      className={
                        "payment-pill" +
                        (paymentMethod === method.id ? " selected" : "")
                      }
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <span className="payment-pill-main">
                        <span className="payment-pill-label">
                          {method.label}
                        </span>
                        <span className="payment-pill-sub">
                          {method.subtitle}
                        </span>
                      </span>
                      <span className="payment-pill-radio">
                        {paymentMethod === method.id ? "●" : "○"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fake payment UIs */}
              {paymentMethod === "card" && (
                <div className="payment-card-box">
                  <div className="payment-card-header">
                    <span>Card details</span>
                    <div className="payment-card-brands">
                      <span>Visa</span>
                      <span>Mastercard</span>
                      <span>Amex</span>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "0.75rem" }}>
                    <label htmlFor="card-number">Card number</label>
                    <input
                      id="card-number"
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                      gap: "0.75rem"
                    }}
                  >
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="card-exp">Expiry</label>
                      <input
                        id="card-exp"
                        type="text"
                        className="form-control"
                        placeholder="MM / YY"
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="card-cvc">CVC</label>
                      <input
                        id="card-cvc"
                        type="text"
                        className="form-control"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      marginTop: "0.5rem"
                    }}
                  >
                    This is a visual-only card form. In production, you&apos;d replace this
                    with a Stripe Element or Stripe Checkout.
                  </p>

                  <div className="stripe-badge">
                    <span>Secured by</span>
                    <div className="stripe-logo-fake">stripe</div>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="payment-card-box">
                  <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                    On a real site, you&apos;d be redirected to PayPal&apos;s secure
                    checkout to approve this payment.
                  </p>
                  <button
                    type="button"
                    className="paypal-button-fake"
                    onClick={() =>
                      alert("Demo PayPal flow – no real payment happening.")
                    }
                  >
                    <span>Pay with</span>
                    <span className="paypal-wordmark">PayPal</span>
                  </button>
                </div>
              )}

              {paymentMethod === "applepay" && (
                <div className="payment-card-box">
                  <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                    On supported devices, Apple Pay would appear as a native sheet here.
                  </p>
                  <button
                    type="button"
                    className="applepay-button-fake"
                    onClick={() =>
                      alert("Demo Apple Pay flow – no real payment happening.")
                    }
                  >
                   <span>  Pay</span>
                  </button>
                </div>
              )}

              <button
                className="btn"
                type="submit"
                disabled={!hasItems}
                style={{ marginTop: "0.75rem" }}
              >
                <span>
                  Place order (demo)
                </span>
              </button>
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
          <aside className="card">
            <h2 style={{ marginBottom: "0.5rem", fontSize: "1.15rem" }}>
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
