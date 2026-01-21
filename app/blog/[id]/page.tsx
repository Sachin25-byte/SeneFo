'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function BlogDetailPage() {
    const { id } = useParams();
    const [article, setArticle] = useState<any>(null);

    useEffect(() => {
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => {
                const found = data.find((b: any) => b.id === id);
                setArticle(found);
            })
            .catch(err => console.error('Error fetching blog:', err));
    }, [id]);

    if (!article) return <div className="container" style={{ padding: '4rem 0' }}>Loading...</div>;

    return (
        <div className="blog-detail">
            <div className="container">
                <div className="breadcrumbs">
                    <Link href="/blog">Blog</Link> / <span className="current">{article.title}</span>
                </div>

                <article className="post">
                    <div className="post-header">
                        <span className="category-badge">{article.category}</span>
                        <h1 className="post-title">{article.title}</h1>
                        <div className="post-meta">
                            <span className="date">{article.date}</span>
                            <span className="stars">{'★'.repeat(Math.floor(article.rating))}</span>
                        </div>
                    </div>

                    <div className="post-image">
                        <img src={article.image} alt={article.title} />
                    </div>

                    <div className="post-content">
                        <p className="excerpt">{article.excerpt}</p>
                        <hr />
                        <p>This is where the full content of the blog article would go. For now, we're displaying the excerpt as a placeholder for the detailed review and guide.</p>
                        <p>At SeneFo, we are committed to providing you with the most accurate and helpful information possible. Stay tuned for more expert advice and product comparisons!</p>
                    </div>
                </article>
            </div>

            <style jsx>{`
                .blog-detail {
                    padding: 2rem 0 4rem;
                    background: #f8fafc;
                    min-height: 100vh;
                }
                .breadcrumbs {
                    margin-bottom: 2rem;
                    color: #64748b;
                }
                .current {
                    color: #1a4231;
                    font-weight: 600;
                }
                .post {
                    background: white;
                    border-radius: 20px;
                    padding: 3rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    max-width: 900px;
                    margin: 0 auto;
                }
                .post-header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }
                .category-badge {
                    background: #f0f7f4;
                    color: #2d5a43;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    display: inline-block;
                }
                .post-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    color: #1a4231;
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }
                .post-meta {
                    color: #94a3b8;
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    align-items: center;
                }
                .stars {
                    color: #fbbf24;
                }
                .post-image {
                    margin-bottom: 2.5rem;
                    border-radius: 12px;
                    overflow: hidden;
                    max-height: 500px;
                }
                .post-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .post-content {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: #4a5568;
                }
                .excerpt {
                    font-weight: 500;
                    color: #1a1a1a;
                    margin-bottom: 2rem;
                    font-size: 1.25rem;
                }
                hr {
                    border: 0;
                    border-top: 1px solid #f1f5f9;
                    margin: 2rem 0;
                }
                @media (max-width: 768px) {
                    .post {
                        padding: 1.5rem;
                    }
                    .post-title {
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </div>
    );
}
