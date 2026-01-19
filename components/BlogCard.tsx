'use client';

interface BlogProps {
    title: string;
    image: string;
    rating: number;
    date: string;
    excerpt: string;
    category: string;
}

export default function BlogCard({ article }: { article: BlogProps }) {
    return (
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

            <style jsx>{`
        .blog-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          margin-bottom: 1.5rem;
          transition: transform 0.2s ease;
          border: 1px solid #f0f0f0;
        }
        .blog-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        .blog-image {
          width: 140px;
          height: 140px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justifyContent: center;
          background: #f8fafc;
          border-radius: 12px;
          overflow: hidden;
        }
        .blog-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .blog-content {
          flex-grow: 1;
        }
        .blog-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }
        .blog-meta {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }
        .stars {
          color: #fbbf24;
          font-size: 1.1rem;
        }
        .date {
          color: #888;
          font-size: 0.9rem;
        }
        .blog-excerpt {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 0;
          line-height: 1.5;
          max-width: 500px;
        }
        .read-btn {
          background: #2d5a43;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: background 0.2s ease;
          white-space: nowrap;
        }
        .read-btn:hover {
          background: #1e3d2d;
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
        </div>
    );
}
