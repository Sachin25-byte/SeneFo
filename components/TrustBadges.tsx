'use client';

export default function TrustBadges() {
    return (
        <section className="trust-badges">
            <div className="container">
                <div className="badges-grid">
                    {/* Badge 1 */}
                    <div className="badge-item">
                        <div className="wreath-icon">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 10V20M50 80V90M10 50H20M80 50H90" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                                <path d="M25 25C15 35 15 65 25 75C35 85 65 85 75 75C85 65 85 35 75 25C65 15 35 15 25 25Z" stroke="#FFD700" strokeWidth="3" />
                                <circle cx="50" cy="50" r="40" stroke="#DAA520" strokeWidth="2" strokeDasharray="4 4" />
                                <text x="50" y="45" textAnchor="middle" fill="#FFD700" fontSize="18" fontWeight="bold" fontFamily="serif">#1</text>
                                <text x="50" y="65" textAnchor="middle" fill="#FFD700" fontSize="8" fontWeight="bold">Review Site</text>
                            </svg>
                        </div>
                        <div className="badge-text">
                            <p>India's Trusted Review Site</p>
                        </div>
                    </div>

                    {/* Badge 2 */}
                    <div className="badge-item">
                        <div className="wreath-icon">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="42" stroke="#DAA520" strokeWidth="2" />
                                <path d="M20 50L40 70L80 30" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <text x="50" y="95" textAnchor="middle" fill="#FFD700" fontSize="10" fontStyle="italic">100K+ Users</text>
                            </svg>
                        </div>
                        <div className="badge-text">
                            <p>Helping 100,000+ Users Choose</p>
                        </div>
                    </div>

                    {/* Badge 3 */}
                    <div className="badge-item">
                        <div className="wreath-icon">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 15L60 40H90L65 55L75 85L50 65L25 85L35 55L10 40H40L50 15Z" fill="none" stroke="#FFD700" strokeWidth="3" />
                                <circle cx="50" cy="50" r="45" stroke="#DAA520" strokeWidth="2" />
                                <text x="50" y="60" textAnchor="middle" fill="#FFD700" fontSize="10" fontWeight="bold">TOP RATED</text>
                            </svg>
                        </div>
                        <div className="badge-text">
                            <p>Recognized for Hot Comparisons</p>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
        .trust-badges {
          background: linear-gradient(to right, #0f2b1d, #1a4231, #0f2b1d); /* Dark green gradient */
          padding: 4rem 0;
          color: white;
          margin-top: auto;
        }
        .container {
           max-width: 1200px;
           margin: 0 auto;
           padding: 0 1rem;
        }
        .badges-grid {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
          text-align: center;
        }
        .badge-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          max-width: 250px;
        }
        .wreath-icon {
          width: 120px;
          height: 120px;
          filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3)); /* Gold glow */
        }
        .badge-text p {
          font-size: 0.9rem;
          color: #e2e8f0;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        @media (max-width: 768px) {
           .badges-grid {
             flex-direction: column;
           }
        }
      `}</style>
        </section>
    );
}
