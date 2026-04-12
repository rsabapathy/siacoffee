"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../../components/CartContext";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "single-origin", label: "Single origin" },
  { id: "espresso", label: "Espresso" },
  { id: "decaf", label: "Decaf" },
  { id: "sampler", label: "Sampler" }
];

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

// Fallback static products if API fails
const FALLBACK_PRODUCTS = [
  {
    _id: "fallback-solar",
    slug: "solar-dawn-ethiopia",
    name: "Solar Dawn — Ethiopia",
    label: "Single origin",
    category: "single-origin",
    price: 14,
    size: "250g",
    notes: "Bergamot, jasmine and peach sweetness.",
    image: "/assets/img/product-ethiopia.png"
  },
  {
    _id: "fallback-ember",
    slug: "midnight-ember-espresso",
    name: "Midnight Ember",
    label: "Espresso blend",
    category: "espresso",
    price: 13,
    size: "250g",
    notes: "Chocolate, roasted hazelnut and syrupy body.",
    image: "/assets/img/product-espresso.png"
  },
  {
    _id: "fallback-decaf",
    slug: "moonlight-decaf",
    name: "Moonlight Decaf",
    label: "Decaf",
    category: "decaf",
    price: 13,
    size: "250g",
    notes: "Swiss water processed with toffee and cocoa notes.",
    image: "/assets/img/product-decaf.png"
  },
  {
    _id: "fallback-niebla",
    slug: "la-niebla-colombia",
    name: "La Niebla — Colombia",
    label: "Single origin",
    category: "single-origin",
    price: 14,
    size: "250g",
    notes: "Honey process with red fruit sweetness.",
    image: "/assets/img/product-sampler.png"
  },
  {
    _id: "fallback-sampler",
    slug: "aurora-sampler-pack",
    name: "Aurora Sampler Pack",
    label: "Sampler",
    category: "sampler",
    price: 18,
    size: "3 × 100g",
    notes: "Three 100g bags of our current favourites.",
    image: "/assets/img/product-sampler.png"
  },
  {
    _id: "fallback-cold-comet",
    slug: "cold-comet-blend",
    name: "Cold Comet Blend",
    label: "Espresso / cold brew",
    category: "espresso",
    price: 13,
    size: "250g",
    notes: "Cola, dark chocolate and orange peel complexity.",
    image: "/assets/img/product-espresso.png"
  }
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState("");

  const {
    cart,
    cartCount,
    cartTotal,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart
  } = useCart();

  // Load products from backend, with fallback
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoadingProducts(true);
        setError("");
        const res = await fetch(`${API_BASE}/api/products`);
        if (!res.ok) {
          throw new Error(`API returned ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) {
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
          } else {
            // API empty – fall back to local
            setProducts(FALLBACK_PRODUCTS);
            setError("API returned no products – showing fallback sample data.");
          }
        }
      } catch (err) {
        console.error("Failed to load products", err);
        if (!cancelled) {
          setProducts(FALLBACK_PRODUCTS);
          setError("Could not reach backend – showing fallback sample data.");
        }
      } finally {
        if (!cancelled) setLoadingProducts(false);
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <h1 className="page-hero-title">Shop our coffees</h1>
        <p className="page-hero-subtitle">
          Single origins, blends and decaf — all roasted in micro-batches and shipped
          fresh from our London roastery.
        </p>
      </section>

      {/* Controls + cart summary */}
      <section className="section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)",
            gap: "1.5rem",
            alignItems: "flex-start"
          }}
        >
          {/* Left: filters + products */}
          <div>
            <div className="shop-controls">
              <div className="chip-group">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`chip ${
                      activeCategory === cat.id ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
              <div>
                Free UK shipping on orders over £30.
                {loadingProducts && (
                  <span style={{ marginLeft: "0.5rem", fontSize: "0.8rem" }}>
                    Loading products…
                  </span>
                )}
              </div>
            </div>

            {error && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  marginBottom: "0.75rem"
                }}
              >
                {error}
              </p>
            )}

            <div className="products-grid">
              {filteredProducts.map((product) => (
                <article
                  key={product._id || product.id}
                  className="product-card"
                  id={product.slug}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-label">{product.label}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-notes">{product.notes}</p>
                  <div className="product-footer">
                    <div className="price">
                      £{product.price} <small>/ {product.size}</small>
                    </div>
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() =>
                        addItem({
                          id: product._id || product.id,
                          name: product.name,
                          price: product.price,
                          size: product.size,
                          image: product.image
                        })
                      }
                    >
                      <span>Add to cart</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right: cart summary (unchanged from before) */}
          <aside className="card">
            <h2 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
              Your cart
            </h2>
            {cartCount === 0 ? (
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
                Your cart is empty. Add a bag or two to get started.
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
      </section>
    </>
  );
}
