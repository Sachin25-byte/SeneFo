'use client';

interface DealProps {
  title: string;
  image: string;
  originalPrice: string;
  discountedPrice: string;
  rating: number;
  reviewsCount: number;
  discount: string;
  category: string;
}

export default function DealCard({ deal }: { deal: DealProps }) {
  return (
    <div className="deal-card">
      <div className="badge">{deal.discount}</div>
      <div className="deal-image">
        <img src={deal.image} alt={deal.title} />
      </div>
      <div className="deal-content">
        <h3 className="deal-title">{deal.title}</h3>
        <div className="deal-pricing">
          <span className="current-price">₹{deal.discountedPrice}</span>
          <span className="original-price">₹{deal.originalPrice}</span>
        </div>
        <div className="deal-rating">
          <span className="stars">{'★'.repeat(Math.floor(deal.rating))}{'☆'.repeat(5 - Math.floor(deal.rating))}</span>
          <span className="reviews">({deal.reviewsCount})</span>
        </div>
        <div className="deal-meta">
          <span className="category-tag"><span className="icon">🛡️</span> {deal.category}</span>
        </div>
      </div>
      <div className="deal-action">
        <button className="amazon-btn">
          Check on Amazon <span className="arrow">›</span>
        </button>
      </div>

      <style jsx>{`
        .deal-card {
          background: #FFFFFF;
          border-radius: var(--border-radius-lg);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          position: relative;
          box-shadow: var(--shadow-sm);
          margin-bottom: 1.5rem;
          transition: all var(--transition-smooth);
          border: 1px solid var(--bg-tertiary);
        }
        .deal-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--accent-red);
        }
        .badge {
          position: absolute;
          top: 0;
          left: 0;
          background: var(--accent-red);
          color: #FFFFFF;
          padding: 6px 14px;
          font-weight: 800;
          font-size: 0.75rem;
          border-top-left-radius: var(--border-radius-lg);
          border-bottom-right-radius: 8px;
          box-shadow: var(--shadow-sm);
        }
        .deal-image {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .deal-image img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }
        .deal-content {
          flex-grow: 1;
        }
        .deal-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }
        .deal-pricing {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.5rem;
        }
        .current-price {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
        }
        .original-price {
          font-size: 0.9rem;
          color: var(--text-dim);
          text-decoration: line-through;
        }
        .deal-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.8rem;
        }
        .stars {
          color: #FFB400;
          font-size: 1rem;
        }
        .reviews {
          color: var(--text-dim);
          font-size: 0.85rem;
        }
        .category-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--accent-red-light);
          color: var(--accent-red);
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
        }
        .amazon-btn {
          background: var(--text-main);
          color: #FFFFFF;
          border: none;
          padding: 12px 24px;
          border-radius: var(--border-radius-md);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }
        .amazon-btn:hover {
          background: var(--accent-red);
          transform: scale(1.05);
        }
        .arrow {
          font-size: 1.4rem;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .deal-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            padding-top: 2.5rem;
          }
          .deal-image {
            width: 100%;
            height: 180px;
          }
          .deal-action {
            width: 100%;
          }
          .amazon-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
