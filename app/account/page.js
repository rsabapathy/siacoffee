"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/UseAuth";
import { updateProfile, getMyOrders } from "../../lib/authClient";

export default function AccountPage() {
  const router = useRouter();
  const { user, mounted, loading, saveAuth, logout } = useAuth();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [profileStatus, setProfileStatus] = useState("");
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
  if (!mounted || loading) return;

  if (!user) {
    router.push("/auth/login");
    return;
  }

  async function loadOrders() {
    try {
      setOrdersLoading(true);
      setOrdersError("");

      const data = await getMyOrders();

      setOrders(data || []);
    } catch (err) {
      console.error("Orders load error:", err);
      setOrdersError(err.message || "Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  }

  loadOrders();
}, [mounted, loading, user, router]);

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setProfileStatus("");

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!name || !email) {
      setProfileStatus("Please enter your name and email.");
      return;
    }

    try {
      const updatedUser = await updateProfile(name, email);
      saveAuth(updatedUser);
      setProfileStatus("Profile updated successfully.");
    } catch (err) {
      setProfileStatus(err.message || "Could not update profile.");
    }
  }

  if (!mounted) return null;

  if (!user) {
    return null;
  }

  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-title">My account</h1>
        <p className="page-hero-subtitle">
          Manage your profile, view your orders and keep your Aurora details up to date.
        </p>
      </section>

      <section className="section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
            alignItems: "flex-start",
          }}
        >
          <div className="card">
            <h2 style={{ marginBottom: "0.75rem", fontSize: "1.15rem" }}>
              Profile
            </h2>

            <form className="form" onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  defaultValue={user.name}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  defaultValue={user.email}
                  required
                />
              </div>

              <button className="btn" type="submit">
                Save profile
              </button>

              {profileStatus && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    marginTop: "0.75rem",
                  }}
                >
                  {profileStatus}
                </p>
              )}
            </form>

            <button
              type="button"
              className="btn-ghost"
              style={{ marginTop: "0.75rem" }}
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </button>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: "0.75rem", fontSize: "1.15rem" }}>
              My orders
            </h2>

            {ordersLoading ? (
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                Loading your orders...
              </p>
            ) : ordersError ? (
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                {ordersError}
              </p>
            ) : orders.length === 0 ? (
              <div>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  You do not have any orders yet.
                </p>
                <Link href="/shop" className="btn" style={{ marginTop: "0.75rem" }}>
                  Shop coffee
                </Link>
              </div>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: "0.75rem",
                }}
              >
                {orders.map((order) => (
                  <li
                    key={order._id}
                    style={{
                      border: "1px solid rgba(122,95,70,0.18)",
                      borderRadius: "1rem",
                      padding: "0.85rem",
                      background: "rgba(255,255,255,0.45)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <strong>Order #{String(order._id).slice(-6)}</strong>
                      <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                        {order.status}
                      </span>
                    </div>

                    <div style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
                      {new Date(order.createdAt).toLocaleDateString()} • £
                      {order.subtotal}
                    </div>

                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0.6rem 0 0",
                        display: "grid",
                        gap: "0.25rem",
                      }}
                    >
                      {order.items?.map((item, index) => (
                        <li
                          key={`${order._id}-${index}`}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "0.85rem",
                          }}
                        >
                          <span>
                            {item.qty} × {item.name}
                          </span>
                          <span>£{item.qty * item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
