'use client';

import Link from 'next/link';

interface ReviewProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviewsCount: number;
  totalComments: number;
  excerpt: string;
  category: string;
}

export default function ReviewCard({ review }: { review: ReviewProps }) {
  return (
    <div className="review-card">
      <div className="review-image">
        <img src={review.image} alt={review.title} />
      </div>
      <div className="review-content">
        <h3 className="review-title">{review.title}</h3>
        <div className="review-rating">
          <span className="stars">{'★'.repeat(Math.floor(review.rating))}{'☆'.repeat(5 - Math.floor(review.rating))}</span>
          <span className="rating-meta">{review.reviewsCount} | {review.totalComments}</span>
        </div>
        <p className="review-excerpt">{review.excerpt}</p>
        <div className="review-footer">
          <span className="category-tag"><span className="icon">🛡️</span> {review.category}</span>
        </div>
      </div>
      <div className="review-action">
        <Link href={`/reviews/${review.id}`}>
          <button className="read-btn">
            Read Review <span className="arrow">›</span>
          </button>
        </Link>
      </div>

      <style jsx>{`
        .review-card {
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
        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--accent-red);
        }
        .review-image {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .review-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .review-content {
          flex-grow: 1;
        }
        .review-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }
        .review-rating {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }
        .stars {
          color: #FFB400;
          font-size: 1rem;
        }
        .rating-meta {
          color: var(--text-dim);
          font-size: 0.85rem;
        }
        .review-excerpt {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 1rem;
          line-height: 1.5;
          max-width: 500px;
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
        .read-btn {
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
        .read-btn:hover {
          background: var(--accent-red);
          transform: scale(1.05);
        }
        .arrow {
          font-size: 1.4rem;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .review-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .review-image {
            width: 100%;
            height: 180px;
          }
          .review-action {
            width: 100%;
          }
          .read-btn {
            width: 100%;
            justify-content: center;
          }
          .review-excerpt {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
