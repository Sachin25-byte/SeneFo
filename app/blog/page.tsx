'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/BlogCard';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Reviews');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Error fetching blogs:', err));
  }, []);

  const categories = ['All Reviews', 'Earbuds', 'Power Banks', 'Accessories'];

  const filteredArticles = articles.filter((article: any) => {
    const matchesCategory = activeCategory === 'All Reviews' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blog-page">
      <div className="container">
        <h1 className="page-title">Blog</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for blog articles..."
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

        <div className="blog-list">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, idx) => (
              <BlogCard key={idx} article={article} />
            ))
          ) : (
            <div className="no-results">No articles found matching your search.</div>
          )}
        </div>
      </div>

      <style jsx>{`
        .blog-page {
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
        .blog-list {
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
