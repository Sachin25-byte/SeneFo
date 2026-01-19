'use client';

interface ReviewProps {
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
                <button className="read-btn">
                    Read Review <span className="arrow">›</span>
                </button>
            </div>

            <style jsx>{`
        .review-card {
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
        .review-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        .review-image {
          width: 140px;
          height: 140px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        .review-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }
        .review-content {
          flex-grow: 1;
        }
        .review-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }
        .review-rating {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }
        .stars {
          color: #fbbf24;
          font-size: 1.1rem;
        }
        .rating-meta {
          color: #888;
          font-size: 0.9rem;
        }
        .review-excerpt {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 1rem;
          line-height: 1.5;
          max-width: 500px;
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
        .read-btn {
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
        .read-btn:hover {
          background: #1e3d2d;
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
