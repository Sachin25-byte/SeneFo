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
          background: linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%);
          padding: 5rem 0;
          position: relative;
          overflow: hidden;
        }
        
        .trust-badges::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 50%, rgba(255, 215, 0, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .container {
          position: relative;
          z-index: 2;
        }
        
        .section-title {
          text-align: center;
          font-size: clamp(2rem, 5vw, 2.8rem);
          font-weight: 800;
          margin-bottom: 4rem;
          color: var(--soft-white);
        }
        
        .section-title .text-gold {
          background: var(--gold-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 3rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .badge-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          padding: 2rem;
          background: rgba(26, 26, 26, 0.4);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: var(--border-radius-lg);
          transition: all var(--transition-smooth);
          backdrop-filter: blur(10px);
        }
        
        .badge-item:hover {
          transform: translateY(-10px);
          border-color: var(--royal-gold);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.2);
        }
        
        .icon-wrapper {
          width: 100px;
          height: 100px;
          filter: drop-shadow(0 4px 20px rgba(212, 175, 55, 0.4));
          transition: transform var(--transition-smooth);
        }
        
        .badge-item:hover .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }
        
        .badge-content h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--soft-white);
          margin-bottom: 0.5rem;
        }
        
        .badge-content p {
          font-size: 0.95rem;
          color: var(--light-gray);
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .trust-badges {
            padding: 4rem 0;
          }
          
          .badges-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .section-title {
            margin-bottom: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
