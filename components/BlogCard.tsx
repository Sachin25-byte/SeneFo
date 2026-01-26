'use client';

import Link from 'next/link';

interface BlogProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  date: string;
  excerpt: string;
  category: string;
}

export default function BlogCard({ article }: { article: BlogProps }) {
  return (
    <Link href={`/blog/${article.id}`} className="blog-card-link">
      <div className="blog-card">
        <div className="blog-image">
          <img src={article.image} alt={article.title} />
        </div>
        <div className="blog-content">
          <h3 className="blog-title">{article.title}</h3>
          <div className="blog-meta">
            <span className="stars">{'★'.repeat(Math.floor(article.rating))}{'☆'.repeat(5 - Math.floor(article.rating))}</span>
            <span className="date">{article.date}</span>
          </div>
          <p className="blog-excerpt">{article.excerpt}</p>
        </div>
        <div className="blog-action">
          <button className="read-btn">
            Read More <span className="arrow">›</span>
          </button>
        </div>
      </div>
      <style jsx>{`
        .blog-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .blog-card {
          background: #FFFFFF;
          border-radius: var(--border-radius-lg);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          position: relative;
          box-shadow: var(--shadow-sm);
          margin-bottom: 1.5rem;
          transition: all var(--transition-smooth);
          border: 1px solid var(--bg-tertiary);
        }
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--accent-red);
        }
        .blog-image {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border-radius: var(--border-radius-md);
          overflow: hidden;
        }
        .blog-image img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }
        .blog-content {
          flex-grow: 1;
        }
        .blog-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }
        .blog-meta {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }
        .stars {
          color: #FFB400;
          font-size: 1rem;
        }
        .date {
          color: var(--text-dim);
          font-size: 0.85rem;
        }
        .blog-excerpt {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 0;
          line-height: 1.5;
          max-width: 500px;
        }
        .blog-action {
          flex-shrink: 0;
        }
        .read-btn {
          background: var(--text-main);
          color: #FFFFFF;
          border: none;
          padding: 12px 24px;
          border-radius: var(--border-radius-md);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }
        .read-btn:hover {
          background: var(--accent-red);
          transform: scale(1.05);
        }
        .arrow {
          font-size: 1.4rem;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .blog-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .blog-image {
            width: 100%;
            height: 180px;
          }
          .blog-action {
            width: 100%;
          }
          .read-btn {
            width: 100%;
            justify-content: center;
          }
          .blog-excerpt {
            max-width: 100%;
          }
        }
      `}</style>
    </Link>
  );
}
