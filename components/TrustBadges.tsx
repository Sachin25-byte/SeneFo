'use client';

export default function TrustBadges() {
  return (
    <section className="trust-badges">
      <div className="container">
        <h2 className="section-title">
          Why <span className="text-gold">SENEFO</span>?
        </h2>
        <div className="badges-grid">
          {/* Badge 1 */}
          <div className="badge-item">
            <div className="icon-wrapper">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="url(#gold1)" strokeWidth="3" />
                <path d="M50 15L60 40H90L65 55L75 85L50 65L25 85L35 55L10 40H40L50 15Z" fill="url(#gold1)" />
                <defs>
                  <linearGradient id="gold1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="badge-content">
              <h3>Honest Reviews</h3>
              <p>Real product testing you can trust</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="badge-item">
            <div className="icon-wrapper">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="url(#gold2)" strokeWidth="3" />
                <path d="M30 50L45 65L70 35" stroke="url(#gold2)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy="50" r="35" stroke="url(#gold2)" strokeWidth="2" opacity="0.3" />
                <defs>
                  <linearGradient id="gold2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="badge-content">
              <h3>Fully Transparent</h3>
              <p>Clear affiliate disclosure on every recommendation</p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="badge-item">
            <div className="icon-wrapper">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="url(#gold3)" strokeWidth="3" />
                <path d="M50 20V50L70 65" stroke="url(#gold3)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy="50" r="35" stroke="url(#gold3)" strokeWidth="2" opacity="0.3" />
                <defs>
                  <linearGradient id="gold3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="badge-content">
              <h3>Updated Daily</h3>
              <p>Fresh deals and reviews added every day</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trust-badges {
          background: var(--bg-primary);
          padding: 5rem 0;
        }
        
        .section-title span {
          color: var(--accent-red);
        }
        
        .badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .badge-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2.5rem 2rem;
          background: #FFFFFF;
          border: 1px solid var(--bg-tertiary);
          border-radius: var(--border-radius-lg);
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-sm);
        }
        
        .badge-item:hover {
          transform: translateY(-8px);
          border-color: var(--accent-red);
          box-shadow: var(--shadow-xl);
        }
        
        .icon-wrapper {
          width: 80px;
          height: 80px;
          margin-bottom: 1.5rem;
          background: var(--accent-red-light);
          border-radius: 50%;
          padding: 15px;
          color: var(--accent-red);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .icon-wrapper svg {
          width: 60%;
          height: 60%;
        }
        
        /* Redefine SVG colors to use accent-red */
        .icon-wrapper svg circle, .icon-wrapper svg path {
          stroke: var(--accent-red) !important;
        }
        .icon-wrapper svg path[fill] {
          fill: var(--accent-red) !important;
        }
        
        .badge-content h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }
        
        .badge-content p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .trust-badges {
            padding: 3rem 0;
          }
          .badges-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
