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
          padding: 3rem 0;
          background: var(--bg-primary);
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .category-card {
          background: #000;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          position: relative;
          height: 380px;
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-md);
        }
        
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-xl);
        }
        
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.9) 100%);
          z-index: 2;
          transition: opacity var(--transition-smooth);
        }
        
        .card-image {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .category-card:hover .card-image img {
          transform: scale(1.1);
        }
        
        .card-label {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          right: 2rem;
          z-index: 3;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .label-text {
          color: #FFFFFF;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.02em;
        }
        
        .arrow-icon {
          color: #FFFFFF;
          background: var(--accent-red);
          border-radius: 50%;
          padding: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }
        
        .category-card:hover .arrow-icon {
          transform: translateX(5px) rotate(-45deg);
        }
        
        @media (max-width: 768px) {
          .categories {
            padding: 3rem 0;
          }
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
