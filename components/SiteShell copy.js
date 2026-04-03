"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

useEffect(() => {
  if (typeof window === "undefined") return;

  // --- Reveal-on-scroll ---
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

  // --- Parallax ---
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

  // Cleanup when route changes or component unmounts
  return () => {
    if (io) io.disconnect();
    window.removeEventListener("scroll", onScroll);
  };
}, [pathname]); // <-- key change!


  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("nav-open", navOpen);
    }
  }, [navOpen]);

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
      if (parallaxEls.length) {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const isActive = (href) =>
    pathname === href || (href === "/shop" && pathname.startsWith("/shop"));

  return (
    <>
      <header>
        <div className="page">
          <nav className="nav">
            <div className="logo">
              {/* <span className="logo-dot" /> */}
              <img 
                src="/assets/img/siacoffeelogo.png"
                alt="Iyarkai Roast coffee bag and cup"
                width="50" />
              Iyarkai Coffee
            </div>
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
              <Link href="/contact" className={isActive("/contact") ? "active" : ""}>
                Contact
              </Link>
            </div>
            <div className="nav-cta">
              <Link href="/auth/login" className="btn-ghost"><span>Sign In</span></Link>
              <Link href="/shop" className="btn">
                Shop Now
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="page">{children}</main>

      <footer className="page">
        <div className="footer-row">
          <div>© {currentYear} Iyarkai Roast Coffee. All rights reserved.</div>
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
            <a href="#" aria-label="Facebook">
              FB
            </a>
            <a href="mailto:sales@iyarkai.co.uk" aria-label="Email">
              @
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
