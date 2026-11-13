import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <>
      <section className="sia-interior-hero">
        <div className="sia-interior-hero-inner">
          <span className="sia-eyebrow">THANK YOU FOR SHOPPING WITH US</span>
          <h1 className="sia-interior-title">Thank you for your payment</h1>
          <p className="sia-interior-subtitle">
            Your Stripe checkout has returned to SIA Coffee. We’re checking the order confirmation.
          </p>
        </div>
      </section>
      <section className="section sia-interior-section">
        <div className="sia-success-layout">
          <div className="card sia-interior-card">
            <span className="sia-eyebrow">ORDER STATUS</span>
            <h2 className="sia-card-heading">What happens next?</h2>
            <p className="sia-success-copy">
              Your payment and order record are confirmed separately. Please check your account’s
              order history for the saved order. If it hasn’t appeared, contact us with your
              Stripe payment confirmation so we can investigate.
            </p>
            <div className="sia-success-actions">
              <Link href="/account" className="sia-primary-action">View my orders</Link>
              <Link href="/shop" className="sia-secondary-action">Continue shopping</Link>
            </div>
          </div>
          <aside className="sia-success-aside">
            <span className="sia-eyebrow">FRESHLY ROASTED, WITH CARE</span>
            <h2>Good coffee is worth the wait.</h2>
            <p>Once your order is confirmed, we’ll prepare your coffee with the care it deserves.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
