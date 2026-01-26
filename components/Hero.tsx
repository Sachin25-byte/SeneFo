'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container relative">
        <div className="hero-content">
          <div className="hero-badge">
            ✨ Your Trusted Buying Guide
          </div>
          <h1 className="hero-title">
            Smart Shopping Starts with <span className="text-accent">SENEFO</span>
          </h1>
          <p className="hero-lead">
            Expert reviews, handpicked deals, and honest shopping advice to help you make the right choice every time.
          </p>
          <div className="hero-btns">
            <Link href="/best_deals" className="btn btn-primary">
              🔥 Explore Best Deals
            </Link>
            <Link href="/reviews" className="btn btn-outline">
              📖 Browse Reviews
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="stat-label">100% Honest Reviews</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="stat-label">Expert Research</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div className="stat-label">Best Product Deals</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          padding: clamp(3rem, 8vw, 4.5rem) 0 clamp(2rem, 6vw, 3.5rem);
          text-align: center;
          background: radial-gradient(circle at top, var(--accent-red-light) 0%, var(--bg-primary) 70%);
          overflow: hidden;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(var(--bg-tertiary) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at center, black, transparent 80%);
          opacity: 0.5;
          pointer-events: none;
        }
        
        .relative {
          position: relative;
          z-index: 2;
        }
        
        .hero-content {
          max-width: 900px;
          margin: 0 auto;
          animation: fadeInUp 0.8s ease-out;
        }
        
        .hero-badge {
          display: inline-block;
          padding: 0.6rem 1.5rem;
          background: var(--bg-primary);
          border: 1px solid var(--bg-tertiary);
          border-radius: 50px;
          color: var(--accent-red);
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 900;
          margin-bottom: 1rem;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: var(--text-main);
        }
        
        .hero-title :global(.text-accent) {
          color: var(--accent-red);
        }
        
        .hero-lead {
          font-size: clamp(1.1rem, 3vw, 1.25rem);
          margin-bottom: 2rem;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
          color: var(--text-muted);
          line-height: 1.6;
        }
        
        .hero-btns {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        
        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          padding: 1.5rem;
          background: var(--bg-primary);
          border: 1px solid var(--bg-tertiary);
          border-radius: var(--border-radius-xl);
          box-shadow: var(--shadow-lg);
          max-width: 800px;
          margin: 0 auto;
        }
        
        .stat-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .stat-icon {
          margin-bottom: 0.75rem;
          padding: 12px;
          background: var(--accent-red-light);
          border-radius: 12px;
          color: var(--accent-red);
        }
        
        .stat-label {
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 700;
          line-height: 1.3;
        }
        
        .stat-divider {
          width: 1px;
          height: 50px;
          background: var(--bg-tertiary);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .hero {
            padding: 4rem 0 3rem;
          }
          
          .hero-btns {
            flex-direction: column;
            padding: 0 1.5rem;
          }
          
          .hero-stats {
            flex-direction: column;
            gap: 2.5rem;
            padding: 2rem;
          }
          
          .stat-divider {
            width: 50px;
            height: 1px;
          }
        }
      `}</style>
    </section>
  );
}
