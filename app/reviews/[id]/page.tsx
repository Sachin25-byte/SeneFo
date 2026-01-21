'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ReviewDetailPage() {
    const { id } = useParams();
    const [review, setReview] = useState<any>(null);

    useEffect(() => {
        fetch('/api/reviews')
            .then(res => res.json())
            .then(data => {
                const found = data.find((r: any) => r.id === id);
                setReview(found);
            })
            .catch(err => console.error('Error fetching review:', err));
    }, [id]);

    if (!review) return <div className="container" style={{ padding: '4rem 0' }}>Loading...</div>;

    return (
        <div className="review-detail">
            <div className="container">
                <div className="breadcrumbs">
                    <Link href="/reviews">Reviews</Link> / <span className="current">{review.title}</span>
                </div>

                <article className="post">
                    <div className="post-header">
                        <span className="category-badge">{review.category}</span>
                        <h1 className="post-title">{review.title}</h1>
                        <div className="post-meta">
                            <span className="rating">
                                <span className="stars">{'★'.repeat(Math.floor(review.rating))}</span>
                                <span className="score"> {review.rating}/5</span>
                            </span>
                            <span className="meta-item">{review.reviewsCount} Global Ratings</span>
                        </div>
                    </div>

                    <div className="post-image">
                        <img src={review.image} alt={review.title} />
                    </div>

                    <div className="post-content">
                        <div className="summary-box">
                            <h3>Review Summary</h3>
                            <p>{review.excerpt}</p>
                        </div>

                        <h2>Our Verdict</h2>
                        <p>After intensive testing and comparing with competitors, we've found that this product stands out for its performance and value. It addresses many common user concerns and provides a premium experience at its price point.</p>

                        <div className="pros-cons">
                            <div className="pros">
                                <h3>Pros</h3>
                                <ul>
                                    <li>Excellent build quality</li>
                                    <li>Premium performance features</li>
                                    <li>Great value for money</li>
                                    <li>Highly recommended by users</li>
                                </ul>
                            </div>
                            <div className="cons">
                                <h3>Cons</h3>
                                <ul>
                                    <li>Slightly higher price than basic models</li>
                                    <li>Limited color options</li>
                                </ul>
                            </div>
                        </div>

                        <h2>Final Thoughts</h2>
                        <p>If you're in the market for a reliable {review.category} product, this is definitely one to consider. It offers a balance of quality and functionality that is hard to beat.</p>
                    </div>
                </article>
            </div>

            <style jsx>{`
                .review-detail {
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
                .score {
                    font-weight: 700;
                    color: #1a1a1a;
                }
                .post-image {
                    margin-bottom: 2.5rem;
                    border-radius: 12px;
                    overflow: hidden;
                    max-height: 500px;
                    display: flex;
                    justify-content: center;
                    background: #f7f7f7;
                }
                .post-image img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }
                .post-content {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: #4a5568;
                }
                .summary-box {
                    background: #f8fafc;
                    border-left: 4px solid #2d5a43;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    border-radius: 0 8px 8px 0;
                }
                .summary-box h3 {
                    margin-bottom: 0.5rem;
                    color: #2d5a43;
                }
                h2 {
                    color: #1a4231;
                    margin: 2rem 0 1rem;
                }
                .pros-cons {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    margin: 2rem 0;
                }
                .pros h3 { color: #2d5a43; }
                .cons h3 { color: #c53030; }
                ul {
                    padding-left: 1.5rem;
                }
                @media (max-width: 768px) {
                    .pros-cons {
                        grid-template-columns: 1fr;
                    }
                    .post {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
