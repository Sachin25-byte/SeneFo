'use client';

import { useState, useEffect } from 'react';

interface Article {
    title: string;
    image: string;
}

export default function LatestArticles() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => setArticles(data))
            .catch(err => console.error('Error fetching blogs:', err));
    }, []);

    if (articles.length === 0) return null;

    return (
        <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
            <div className="container">
                <h2 className="section-title">Latest Articles</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {articles.map((article, idx) => (
                        <div key={idx} style={{
                            background: 'white',
                            borderRadius: 'var(--border-radius)',
                            overflow: 'hidden',
                            boxShadow: 'var(--box-shadow)',
                            border: '1px solid #eee'
                        }}>
                            <img src={article.image} alt={article.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--primary-green)' }}>{article.title}</h3>
                                <div style={{ height: '4px', background: '#eee', borderRadius: '2px', width: '80%', margin: '0 auto 0.5rem' }}></div>
                                <div style={{ height: '4px', background: '#eee', borderRadius: '2px', width: '50%', margin: '0 auto 1.5rem' }}></div>
                                <button className="btn btn-primary" style={{ padding: '8px 24px', width: '100%' }}>
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
