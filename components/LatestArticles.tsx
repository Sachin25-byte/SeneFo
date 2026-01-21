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
                    padding: clamp(4rem, 10vw, 6rem) 0;
                    background: radial-gradient(ellipse at bottom, rgba(212, 175, 55, 0.02) 0%, var(--midnight-black) 70%);
                }
                
                .header-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                }
                
                .section-title {
                    margin: 0;
                    font-size: clamp(2rem, 5vw, 2.8rem);
                    font-weight: 800;
                    color: var(--soft-white);
                }
                
                .section-title span {
                    background: var(--gold-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .view-all-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--royal-gold);
                    font-weight: 700;
                    font-size: 1.05rem;
                    transition: all var(--transition-fast);
                    padding: 0.75rem 1.5rem;
                    border: 2px solid var(--royal-gold);
                    border-radius: var(--border-radius-md);
                }
                
                .view-all-link:hover {
                    background: var(--royal-gold);
                    color: var(--midnight-black);
                    transform: translateX(5px);
                }
                
                .articles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 2rem;
                }
                
                .article-card {
                    background: var(--card-gradient);
                    border: 1px solid rgba(212, 175, 55, 0.15);
                    border-radius: var(--border-radius-lg);
                    overflow: hidden;
                    transition: all var(--transition-smooth);
                    display: block;
                    text-decoration: none;
                    color: inherit;
                }
                
                .article-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: var(--gold-gradient);
                    opacity: 0;
                    transition: opacity var(--transition-smooth);
                }
                
                .article-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-xl);
                    border-color: var(--royal-gold);
                }
                
                .article-card:hover::before {
                    opacity: 1;
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
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 10, 0.7) 100%);
                }
                
                .card-content {
                    padding: 1.75rem;
                }
                
                .blog-badge {
                    display: inline-block;
                    padding: 0.4rem 0.9rem;
                    background: rgba(212, 175, 55, 0.15);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: var(--border-radius-sm);
                    color: var(--royal-gold);
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }
                
                .card-content h3 {
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                    color: var(--soft-white);
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .excerpt {
                    font-size: 0.95rem;
                    color: var(--light-gray);
                    margin-bottom: 1.5rem;
                    line-height: 1.7;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .read-more-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: transparent;
                    color: var(--royal-gold);
                    border: 2px solid var(--royal-gold);
                    padding: 0.65rem 1.25rem;
                    border-radius: var(--border-radius-md);
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all var(--transition-smooth);
                }
                
                .article-card:hover .read-more-btn {
                    background: var(--royal-gold);
                    color: var(--midnight-black);
                }
                
                .read-more-btn svg {
                    transition: transform var(--transition-fast);
                }
                
                .article-card:hover .read-more-btn svg {
                    transform: translateX(3px);
                }
                
                @media (max-width: 768px) {
                    .header-section {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .view-all-link {
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .articles-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
