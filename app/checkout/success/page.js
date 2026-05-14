import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-title">Payment successful</h1>
        <p className="page-hero-subtitle">
          Thank you for your order. Your beans are now heading into the roast queue.
        </p>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ marginBottom: "0.75rem", fontSize: "1.15rem" }}>
            What happens next?
          </h2>
          <p>
            We’ll confirm your order, roast your coffee fresh, and prepare it for dispatch.
          </p>
          <Link href="/shop" className="btn" style={{ marginTop: "0.75rem" }}>
            Continue shopping
          </Link>
        </div>
      </section>
    </>
  );
}
