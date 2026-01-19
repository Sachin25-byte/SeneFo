'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">

      <div className="container relative">
        <div className="hero-content">
          <h1 className="hero-title">
            Smart Buying Starts Here
          </h1>
          <p className="hero-lead">Discover the best deals and honest reviews on top-rated mobile accessories and electronics.</p>
          <div className="hero-btns">
            <Link href="/deals" className="btn btn-primary">
              View Best Deals
            </Link>
            <Link href="/reviews" className="btn btn-primary">
              Read Reviews
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero {
          position: relative;
          padding: clamp(4rem, 15vw, 10rem) 0;
          text-align: center;
          background: #f8faf9;
          color: var(--foreground);
          overflow: hidden;
        }
        .relative {
          position: relative;
          z-index: 2;
        }
        .hero-content {
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--primary-green-dark);
        }
        .hero-lead {
          font-size: clamp(1.1rem, 3vw, 1.4rem);
          margin-bottom: 2.5rem;
          opacity: 0.85;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          color: #4a5568;
        }
        .hero-btns {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }
        .btn-secondary {
          background: white;
          color: #2d5a43;
          border: 1px solid #e2e8f0;
          font-weight: 600;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .btn-secondary:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }
        @media (max-width: 600px) {
          .hero-btns {
            flex-direction: column;
            padding: 0 10%;
            gap: 1rem;
          }
          .hero-btns :global(.btn) {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </section>
  );
}
