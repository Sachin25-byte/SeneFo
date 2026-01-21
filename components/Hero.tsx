'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container relative">
        <div className="hero-content">
          <div className="hero-badge">
            ✨ Product Review Marketplace
          </div>
          <h1 className="hero-title">
            Discover Smart Shopping with <span className="text-gold">SENEFO</span>
          </h1>
          <p className="hero-lead">
            Honest reviews, detailed comparisons, and helpful buying guides.
            Make informed shopping decisions with SENEFO.
          </p>
          <div className="hero-btns">
            <Link href="/best_deals" className="btn btn-primary">
              🔥 Browse Deals
            </Link>
            <Link href="/reviews" className="btn btn-outline">
              📖 Read Reviews
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="url(#gold-gradient-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2V8H20" stroke="url(#gold-gradient-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 13H8" stroke="url(#gold-gradient-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 17H8" stroke="url(#gold-gradient-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 9H9H8" stroke="url(#gold-gradient-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="gold-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="stat-label">Honest Reviews</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="url(#gold-gradient-2)" strokeWidth="2" />
                  <path d="M21 21L16.65 16.65" stroke="url(#gold-gradient-2)" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gold-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="stat-label">Detailed Research</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3V21H21" stroke="url(#gold-gradient-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 16L12 11L16 15L21 10" stroke="url(#gold-gradient-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="gold-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="stat-label">Clear Comparisons</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          padding: clamp(2rem, 8vw, 4rem) 0 clamp(2rem, 6vw, 3rem);
          text-align: center;
          background: radial-gradient(ellipse at top, rgba(212, 175, 55, 0.05) 0%, var(--midnight-black) 60%);
          overflow: hidden;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.06) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .relative {
          position: relative;
          z-index: 2;
        }
        
        .hero-content {
          max-width: 900px;
          margin: 0 auto;
          animation: fadeInUp 1s ease-out;
        }
        
        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 50px;
          color: var(--royal-gold);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: var(--soft-white);
        }
        
        .hero-title :global(.text-gold) {
          display: inline-block;
          background: var(--gold-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }
        
        .hero-lead {
          font-size: clamp(1.1rem, 3vw, 1.3rem);
          margin-bottom: 3rem;
          opacity: 0.9;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          color: var(--light-gray);
          line-height: 1.8;
        }
        
        .hero-btns {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 4rem;
        }
        
        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 2.5rem;
          padding: 2rem 1.5rem;
          background: rgba(26, 26, 26, 0.6);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: var(--border-radius-lg);
          backdrop-filter: blur(10px);
          max-width: 750px;
          margin: 0 auto;
        }
        
        .stat-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-width: 0;
        }
        
        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          margin-bottom: 0.875rem;
          filter: drop-shadow(0 4px 12px rgba(212, 175, 55, 0.3));
          transition: transform var(--transition-smooth);
        }
        
        .stat-icon :global(svg) {
          width: 100%;
          height: 100%;
        }
        
        .stat-item:hover .stat-icon {
          transform: scale(1.1);
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: var(--light-gray);
          font-weight: 500;
          line-height: 1.4;
        }
        
        .stat-divider {
          width: 1px;
          height: 48px;
          background: rgba(212, 175, 55, 0.2);
          align-self: center;
          flex-shrink: 0;
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
            padding: clamp(4rem, 12vw, 6rem) 0 clamp(3rem, 8vw, 4rem);
          }
          
          .hero-btns {
            flex-direction: column;
            padding: 0 10%;
            gap: 1rem;
          }
          
          .hero-btns :global(.btn) {
            width: 100%;
          }
          
          .hero-stats {
            flex-direction: column;
            gap: 2rem;
            padding: 2rem 1.5rem;
          }
          
          .stat-divider {
            width: 60px;
            height: 1px;
          }
        }
      `}</style>
    </section>
  );
}
