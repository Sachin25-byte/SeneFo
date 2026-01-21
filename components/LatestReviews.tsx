'use client';

import { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import Link from 'next/link';

export default function LatestReviews() {
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/reviews')
            .then(res => res.json())
            .then(data => setReviews(data.slice(0, 3)))
            .catch(err => console.error('Error fetching reviews:', err));
    }, []);

    if (reviews.length === 0) return null;

    return (
        <section className="latest-reviews">
            <div className="container">
                <div className="header-section">
                    <h2 className="section-title">
                        Expert <span>Product Reviews</span>
                    </h2>
                    <Link href="/reviews" className="view-all-link">
                        All Reviews
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
                <div className="reviews-grid">
                    {reviews.map((review, idx) => (
                        <ReviewCard key={idx} review={review} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .latest-reviews {
                    padding: clamp(4rem, 10vw, 6rem) 0;
                    background: var(--midnight-black);
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
                
                .reviews-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 2rem;
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
                    
                    .reviews-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
