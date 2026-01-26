'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
    id: number;
    title: string;
    image: string;
    excerpt?: string;
}

export default function LatestArticles() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => setArticles(data.slice(0, 3)))
            .catch(err => console.error('Error fetching blogs:', err));
    }, []);

    if (articles.length === 0) return null;

    return (
        <section className="latest-articles">
            <div className="container">
                <div className="header-section">
                    <h2 className="section-title">
                        Latest <span>Buying Guides</span> & Tips
                    </h2>
                    <Link href="/blog" className="view-all-link">
                        All Articles
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
                <div className="articles-grid">
                    {articles.map((article, idx) => (
                        <Link href={`/blog/${article.id}`} key={idx} className="article-card">
                            <div className="card-image">
                                <img src={article.image} alt={article.title} />
                                <div className="image-overlay"></div>
                            </div>
                            <div className="card-content">
                                <div className="blog-badge">📚 Guide</div>
                                <h3>{article.title}</h3>
                                <p className="excerpt">
                                    {article.excerpt || "Discover expert insights and detailed buying guides to make informed purchasing decisions."}
                                </p>
                                <button className="read-more-btn">
                                    Read Article
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .latest-articles {
                    padding: 3rem 0;
                    background: var(--bg-secondary);
                }
                
                .header-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                }
                
                .section-title span {
                    color: var(--accent-red);
                }
                
                .view-all-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-main);
                    font-weight: 700;
                    font-size: 0.95rem;
                    transition: all var(--transition-fast);
                    padding: 10px 20px;
                    border: 1px solid var(--text-main);
                    border-radius: var(--border-radius-md);
                }
                
                .view-all-link:hover {
                    background: var(--text-main);
                    color: #FFFFFF;
                    transform: translateX(5px);
                }
                
                .articles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 2rem;
                }
                
                .article-card {
                    background: #FFFFFF;
                    border: 1px solid var(--bg-tertiary);
                    border-radius: var(--border-radius-lg);
                    overflow: hidden;
                    transition: all var(--transition-smooth);
                    display: block;
                    text-decoration: none;
                    color: inherit;
                    box-shadow: var(--shadow-sm);
                }
                
                .article-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-xl);
                    border-color: var(--accent-red);
                }
                
                .card-image {
                    position: relative;
                    height: 220px;
                    overflow: hidden;
                }
                
                .card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform var(--transition-smooth);
                }
                
                .article-card:hover .card-image img {
                    transform: scale(1.08);
                }
                
                .image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
                }
                
                .card-content {
                    padding: 1.75rem;
                }
                
                .blog-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    background: var(--accent-red-light);
                    border-radius: 4px;
                    color: var(--accent-red);
                    font-size: 0.75rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .card-content h3 {
                    font-size: 1.25rem;
                    font-weight: 800;
                    margin-bottom: 0.75rem;
                    color: var(--text-main);
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .excerpt {
                    font-size: 0.95rem;
                    color: var(--text-muted);
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .read-more-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: transparent;
                    color: var(--accent-red);
                    border: none;
                    padding: 0;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                
                .read-more-btn:hover {
                    gap: 0.75rem;
                }
                
                @media (max-width: 768px) {
                    .latest-articles {
                        padding: 3rem 0;
                    }
                    .articles-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
