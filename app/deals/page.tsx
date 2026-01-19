'use client';

import { useState, useEffect } from 'react';
import DealCard from '@/components/DealCard';

interface Deal {
  title: string;
  image: string;
  originalPrice: string;
  discountedPrice: string;
  rating: number;
  reviewsCount: number;
  discount: string;
  category: string;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeCategory, setActiveCategory] = useState('All Deals');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setDeals(data))
      .catch(err => console.error('Error fetching deals:', err));
  }, []);

  const categories = ['All Deals', 'Earbuds', 'Power Banks', 'Charging Cables', 'Speakers', 'Accessories'];

  const filteredDeals = deals.filter(deal => {
    const matchesCategory = activeCategory === 'All Deals' || deal.category === activeCategory;
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="deals-page">
      <div className="container">
        <h1 className="page-title">Best Deals on Mobile Accessories</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for deals..."
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
              {cat === 'All Deals' && <span className="down-arrow">▾</span>}
            </button>
          ))}
        </div>

        <div className="deals-list">
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal, idx) => (
              <DealCard key={idx} deal={deal} />
            ))
          ) : (
            <div className="no-results">No deals found matching your search.</div>
          )}
        </div>
      </div>

      <style jsx>{`
        .deals-page {
          padding: 4rem 0;
          background-color: #f8fafc;
          min-height: 100vh;
        }
        .page-title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 800;
          color: #2d5a43;
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
          border-color: #2d5a43;
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
          background: #2d5a43;
          color: white;
          border-color: #2d5a43;
        }
        .down-arrow {
          font-size: 0.8rem;
        }
        .deals-list {
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
