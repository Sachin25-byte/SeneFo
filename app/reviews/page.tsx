'use client';

import { useState, useEffect } from 'react';
import ReviewCard from '@/components/ReviewCard';

export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState('All Reviews');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  const categories = ['All Reviews', 'Earbuds', 'Power Banks', 'Accessories'];

  const filteredReviews = reviews.filter((review: any) => {
    const matchesCategory = activeCategory === 'All Reviews' ||
      (activeCategory === 'Earbuds' && review.category === 'Earbuds') ||
      (activeCategory === 'Power Banks' && review.category === 'Power Banks') ||
      (activeCategory === 'Accessories' && (review.category === 'Accessories' || review.category === 'Cables' || review.category === 'Speakers'));
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="reviews-page">
      <div className="container">
        <h1 className="page-title">Product Reviews</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for reviews..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-container">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {cat === 'All Reviews' && <span className="down-arrow">▾</span>}
            </button>
          ))}
        </div>

        <div className="reviews-list">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))
          ) : (
            <div className="no-results">No reviews found matching your search.</div>
          )}
        </div>
      </div>

      <style jsx>{`
        .reviews-page {
          padding: 4rem 0;
          background-color: #f8fafc;
          min-height: 100vh;
        }
        .page-title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--accent-red);
          margin-bottom: 2.5rem;
        }
        .search-container {
          max-width: 700px;
          margin: 0 auto 2rem;
          position: relative;
        }
        .search-input {
          width: 100%;
          padding: 14px 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-size: 1.1rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.03);
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus {
          border-color: var(--accent-red);
        }
        .filter-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        .filter-chip {
          padding: 10px 24px;
          border-radius: 10px;
          background: white;
          border: 1px solid #e2e8f0;
          font-weight: 600;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .filter-chip.active {
          background: var(--accent-red);
          color: white;
          border-color: var(--accent-red);
        }
        .down-arrow {
          font-size: 0.8rem;
        }
        .reviews-list {
          max-width: 900px;
          margin: 0 auto;
        }
        .no-results {
          text-align: center;
          padding: 4rem;
          color: #666;
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 1.8rem;
          }
          .filter-container {
            gap: 0.8rem;
          }
          .filter-chip {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
