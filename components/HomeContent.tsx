'use client';

export default function HomeContent() {
  return (
    <section className="home-content">
      <div className="container">
        <div className="content-wrapper">
          <h2>Your Trusted Guide to Smart Shopping</h2>
          <p>
            Welcome to SENEFO, your reliable source for honest product reviews and carefully curated Amazon deals.
            We understand that online shopping can be overwhelming with countless options and varying quality.
            That's why we're here to help you make informed purchasing decisions.
          </p>

          <h3>How We Help You Shop Smarter</h3>
          <p>
            Our team thoroughly researches and tests products across various categories including electronics, accessories,
            and home essentials. We analyze customer feedback, compare specifications, and evaluate real-world performance
            to bring you comprehensive, unbiased reviews.
          </p>

          <h3>Our Review Process</h3>
          <p>
            Every product featured on SENEFO goes through a detailed evaluation process. We consider factors like build quality,
            value for money, customer satisfaction, and long-term reliability. Our goal is to save you time and help you avoid
            disappointing purchases by highlighting both strengths and weaknesses of each product.
          </p>

          <h3>Curated Deals & Recommendations</h3>
          <p>
            We monitor Amazon regularly to find genuine deals and price drops on quality products. Our deal recommendations
            are based on actual value, not just discounts. We believe in helping you find products that truly meet your needs
            at fair prices.
          </p>

          <p className="disclaimer">
            <strong>Important Note:</strong> SENEFO is an independent review website. We participate in the Amazon Associates Program,
            which means we may earn a small commission when you make a purchase through our links. This comes at no extra cost to you
            and helps us maintain this free resource. Our reviews and recommendations remain completely honest and unbiased.
          </p>
        </div>
      </div>

      <style jsx>{`
        .home-content {
          padding: 3rem 0;
          background: var(--bg-primary);
        }

        .content-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .content-wrapper h2 {
          font-size: 1.8rem;
          color: var(--text-main);
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .content-wrapper h3 {
          font-size: 1.3rem;
          color: var(--accent-red);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .content-wrapper p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .disclaimer {
          background: var(--bg-secondary);
          padding: 1rem;
          border-left: 3px solid var(--amazon-orange);
          border-radius: var(--border-radius-md);
          margin-top: 2rem;
          font-size: 0.9rem;
        }

        .disclaimer strong {
          color: var(--amazon-orange);
        }

        @media (max-width: 768px) {
          .content-wrapper h2 {
            font-size: 1.5rem;
          }

          .content-wrapper h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
}
