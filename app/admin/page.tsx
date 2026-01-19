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
        .page-title {
          font-size: 2rem;
          color: #1a4231;
          margin-bottom: 2rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .stat-icon {
          font-size: 2.5rem;
          background: #f0f7f4;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .stat-info h3 {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.2rem;
        }
        .stat-info .value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a4231;
        }
        .recent-activity h2 {
          font-size: 1.5rem;
          color: #1a4231;
          margin-bottom: 1.5rem;
        }
        .actions-grid {
          display: flex;
          gap: 1rem;
        }
        .action-btn {
          padding: 1rem 2rem;
          background: #2d5a43;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .action-btn:hover {
          background: #1e3d2d;
        }
      `}</style>
    </div>
  );
}
