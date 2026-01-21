'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Category {
  name: string;
  image: string;
  link: string;
}

export default function CategoryCards() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="categories">
      <div className="container">
        <h2 className="section-title">
          Shop by <span>Category</span>
        </h2>
        <div className="grid">
          {categories.map((cat: any, idx) => (
            <Link href={cat.link || '#'} key={idx} style={{ textDecoration: 'none', display: 'block' }}>
              <div className="category-card">
                <div className="card-overlay"></div>
                <div className="card-image">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <div className="card-label">
                  <span className="label-text">{cat.name}</span>
                  <svg className="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .categories {
          padding: clamp(2rem, 6vw, 3rem) 0;
          background: var(--midnight-black);
          position: relative;
        }
        
        .categories::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.03) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .container {
          position: relative;
          z-index: 2;
        }
        
        .section-title {
          text-align: center;
          font-size: clamp(2rem, 5vw, 2.8rem);
          font-weight: 800;
          margin-bottom: 3rem;
          color: var(--soft-white);
        }
        
        .section-title span {
          background: var(--gold-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .category-card {
          background: var(--card-gradient);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          height: 400px;
          transition: all var(--transition-smooth);
        }
        
        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gold-gradient);
          opacity: 0;
          transition: opacity var(--transition-smooth);
          z-index: 3;
        }
        
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-xl);
          border-color: var(--royal-gold);
        }
        
        .category-card:hover::before {
          opacity: 1;
        }
        
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 10, 0.8) 100%);
          z-index: 2;
          transition: opacity var(--transition-smooth);
        }
        
        .card-image {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-smooth);
        }
        
        .category-card:hover .card-image img {
          transform: scale(1.08);
        }
        
        .card-label {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 1.75rem 1.5rem;
          z-index: 3;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(212, 175, 55, 0.3);
        }
        
        .label-text {
          color: var(--soft-white);
          font-weight: 700;
          font-size: 1.3rem;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
        
        .arrow-icon {
          color: var(--royal-gold);
          transition: transform var(--transition-smooth);
          filter: drop-shadow(0 2px 4px rgba(212, 175, 55, 0.6));
        }
        
        .category-card:hover .arrow-icon {
          transform: translateX(5px);
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .category-card {
            height: 350px;
          }
        }
      `}</style>
    </section>
  );
}
