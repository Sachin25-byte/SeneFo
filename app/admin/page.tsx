'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    reviews: 0,
    blogs: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productsRes, categoriesRes, reviewsRes, blogsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/reviews'),
          fetch('/api/blogs')
        ]);

        const products = await productsRes.json();
        const categories = await categoriesRes.json();
        const reviews = await reviewsRes.json();
        const blogs = await blogsRes.json();

        setCounts({
          products: Array.isArray(products) ? products.length : 0,
          categories: Array.isArray(categories) ? categories.length : 0,
          reviews: Array.isArray(reviews) ? reviews.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0
        });
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard Overview</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Products</h3>
            <p className="value">{counts.products}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <div className="stat-info">
            <h3>Categories</h3>
            <p className="value">{counts.categories}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>Reviews</h3>
            <p className="value">{counts.reviews}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>Blog Posts</h3>
            <p className="value">{counts.blogs}</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Quick Actions</h2>
        <div className="actions-box">
          <div className="actions-grid">
            <Link href="/admin/products/add" className="action-btn">
              <span>Add New Product</span>
            </Link>
            <Link href="/admin/blog/add" className="action-btn">
              <span>Write Blog Post</span>
            </Link>
            <Link href="/admin/categories" className="action-btn">
              <span>Manage Categories</span>
            </Link>
            <Link href="/admin/reviews" className="action-btn">
              <span>Manage Reviews</span>
            </Link>
          </div>
        </div>
      </div>




      <style jsx>{`
        .dashboard {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .page-title {
          font-size: 2.25rem;
          color: var(--text-main);
          margin-bottom: 2.5rem;
          font-family: var(--font-heading);
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }
        .stat-card {
          background: white;
          padding: 1.75rem;
          border-radius: var(--border-radius-xl);
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: transform var(--transition-smooth), box-shadow var(--transition-smooth);
          border: 1px solid var(--bg-tertiary);
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent-blue);
        }
        .stat-icon {
          font-size: 2rem;
          background: var(--accent-blue-light);
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          color: var(--accent-blue);
        }
        .stat-info h3 {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
          font-weight: 600;
        }
        .stat-info .value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-main);
          font-family: var(--font-heading);
        }
        .recent-activity h2 {
          font-size: 1.5rem;
          color: var(--text-main);
          margin-bottom: 1.5rem;
          font-family: var(--font-heading);
          font-weight: 700;
        }
        .actions-grid {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--bg-tertiary);
          box-shadow: var(--shadow-sm);
        }
        .action-btn {
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, #7b1fa2 0%, #f06292 100%);
          color: white;
          border: none;
          border-radius: 24px 4px 24px 4px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 15px rgba(123, 31, 162, 0.25);
          position: relative;
        }
        .action-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 25px rgba(123, 31, 162, 0.4);
          filter: brightness(1.1);
        }
      `}</style>
    </div>
  );
}
