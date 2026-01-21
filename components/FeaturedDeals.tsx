'use client';

import { useState, useEffect } from 'react';
import DealProductCard from './DealProductCard';
import Link from 'next/link';

export default function FeaturedDeals() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data.slice(0, 4)))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    if (products.length === 0) return null;

    return (
        <section className="featured-deals">
            <div className="container">
                <div className="header-section">
                    <h2 className="section-title">
                        <span>Current Product Picks</span>
                    </h2>
                    <Link href="/best_deals" className="view-all-link">
                        View All Products
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
                <div className="products-grid">
                    {products.map((product) => (
                        <DealProductCard
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            link={product.link}
                            originalPrice={product.originalPrice}
                            discountedPrice={product.discountedPrice}
                            rating={product.rating}
                            reviewsCount={product.reviewsCount}
                            discount={product.discount}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .featured-deals {
                    padding: clamp(4rem, 10vw, 6rem) 0;
                    background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.02) 0%, var(--midnight-black) 70%);
                    position: relative;
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
                    background: transparent;
                }
                
                .view-all-link:hover {
                    background: var(--royal-gold);
                    color: var(--midnight-black);
                    transform: translateX(5px);
                }
                
                .view-all-link svg {
                    transition: transform var(--transition-fast);
                }
                
                .view-all-link:hover svg {
                    transform: translateX(3px);
                }
                
                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
                    
                    .products-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
