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
        <div className="actions-grid">
          <Link href="/admin/products/add" className="action-btn">Add New Product</Link>
          <Link href="/admin/blog/add" className="action-btn">Write Blog Post</Link>
          <Link href="/admin/reviews" className="action-btn">Manage Reviews</Link>
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
          gap: 1rem;
          flex-wrap: wrap;
        }
        .action-btn {
          padding: 1rem 2rem;
          background: var(--accent-blue);
          color: white;
          border: none;
          border-radius: var(--border-radius-md);
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 4px 12px rgba(19, 114, 154, 0.2);
        }
        .action-btn:hover {
          background: var(--accent-blue-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(19, 114, 154, 0.3);
        }
      `}</style>
    </div>
  );
}
