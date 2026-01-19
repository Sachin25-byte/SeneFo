'use client';

export default function AboutPage() {
    const values = [
        'Honest Reviews',
        'Expert Comparisons',
        'No Paid Promotions',
        'Indian Consumer Focus'
    ];

    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="container">
                    <h1 className="hero-title">About SeneFo</h1>
                    <p className="hero-subtitle">Smart Buying Starts Here</p>
                </div>
            </div>

            <div className="about-content">
                <div className="container narrow">
                    <section className="welcome">
                        <h2>Welcome to SeneFo!</h2>
                        <p>
                            At SeneFo, we help you make smart buying decisions for mobile and
                            electronic accessories. Our mission is simple: provide honest reviews,
                            expert comparisons, and trusted buying guides tailored for Indian consumers.
                        </p>
                        <p>
                            We focus on recommending only the best products that offer real value and
                            performance. No paid promos, just genuine advice.
                        </p>
                    </section>

                    <section className="values">
                        <ul className="values-list">
                            {values.map((value, idx) => (
                                <li key={idx} className="value-item">
                                    <span className="checkmark">✓</span>
                                    {value}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>

            <style jsx>{`
        .about-page {
          background-color: #f8fafc;
          min-height: 100vh;
        }
        .about-hero {
          padding: 6rem 0 4rem;
          text-align: center;
          background: white;
          border-bottom: 1px solid #f0f0f0;
        }
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 800;
          color: #2d5a43;
          margin-bottom: 1rem;
        }
        .hero-subtitle {
          font-size: 1.5rem;
          color: #1a1a1a;
          font-weight: 600;
        }
        .about-content {
          padding: 4rem 0;
        }
        .narrow {
          max-width: 800px;
        }
        .welcome {
          margin-bottom: 3rem;
        }
        .welcome h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 1.5rem;
        }
        .welcome p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4a5568;
          margin-bottom: 1.5rem;
        }
        .values-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .value-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
        }
        .checkmark {
          color: #2d5a43;
          font-size: 1.5rem;
          font-weight: 900;
        }

        @media (max-width: 768px) {
          .about-hero {
            padding: 4rem 0 2rem;
          }
          .hero-subtitle {
            font-size: 1.2rem;
          }
          .welcome h2 {
            font-size: 1.75rem;
          }
          .value-item {
            font-size: 1.1rem;
          }
        }
      `}</style>
        </div>
    );
}
