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
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          margin-bottom: 1.5rem;
          transition: transform 0.2s ease;
          border: 1px solid #f0f0f0;
        }
        .deal-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        .badge {
          position: absolute;
          top: 0;
          left: 0;
          background: #2d5a43;
          color: white;
          padding: 6px 14px;
          font-weight: 700;
          font-size: 0.85rem;
          border-top-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }
        .deal-image {
          width: 140px;
          height: 140px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        .deal-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .deal-content {
          flex-grow: 1;
        }
        .deal-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }
        .deal-pricing {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.5rem;
        }
        .current-price {
          font-size: 1.4rem;
          font-weight: 800;
          color: #1a1a1a;
        }
        .original-price {
          font-size: 1rem;
          color: #888;
          text-decoration: line-through;
        }
        .deal-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.8rem;
        }
        .stars {
          color: #fbbf24;
          font-size: 1.1rem;
        }
        .reviews {
          color: #666;
          font-size: 0.9rem;
        }
        .category-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #f0f7f4;
          color: #2d5a43;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid #d1e7dd;
        }
        .amazon-btn {
          background: #2d5a43;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: background 0.2s ease;
          white-space: nowrap;
        }
        .amazon-btn:hover {
          background: #1e3d2d;
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
