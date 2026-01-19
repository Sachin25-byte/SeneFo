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
      <div className="container grid">
        {categories.map((cat: any, idx) => (
          <Link href={cat.link || '#'} key={idx} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="category-card">
              <div className="card-image">
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="card-label">
                {cat.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .categories {
          padding: clamp(3rem, 8vw, 5rem) 0;
          overflow: hidden;
          background: #f8fafc;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
        }
        .category-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          cursor: pointer;
          position: relative;
          height: 400px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid #f1f5f9;
        }
        .category-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(45, 90, 67, 0.1);
          border-color: var(--primary-green-light);
        }
        .card-image {
          height: 100%;
          display: flex;
          align-items: center;
          justifyContent: center;
          padding: 0;
          background: radial-gradient(circle at center, #fff 0%, #f8fafc 100%);
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
          transition: transform 0.4s ease;
        }
        .category-card:hover .card-image img {
          transform: scale(1.05);
        }
        .card-label {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: var(--accent-gradient);
          padding: 1.4rem;
          color: white;
          text-align: center;
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: 0.02em;
        }
      `}</style>
    </section>
  );
}
