export default function AffiliateDisclosure() {
    return (
        <div className="affiliate-disclosure">
            <div className="container">
                <p>
                    <strong>Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases. This does not affect the price you pay.
                </p>
            </div>

            <style jsx>{`
        .affiliate-disclosure {
          background: rgba(255, 153, 0, 0.05);
          border-bottom: 1px solid rgba(255, 153, 0, 0.15);
          padding: 0.5rem 0;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: center;
        }

        .affiliate-disclosure p {
          margin: 0;
          line-height: 1.4;
        }

        .affiliate-disclosure strong {
          color: var(--amazon-orange);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .affiliate-disclosure {
            font-size: 0.75rem;
            padding: 0.4rem 0;
          }
        }
      `}</style>
        </div>
    );
}
