'use client';

import { useState, useEffect } from 'react';
import DealProductCard from './DealProductCard';
import Link from 'next/link';

export default function FeaturedDeals() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                // Filter out inactive products
                const activeProducts = data.filter((p: any) => p.isActive !== false);
                setProducts(activeProducts.slice(0, 10));
            })
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
                <div className="products-slider">
                    {products.map((product) => (
                        <div key={product.id} className="slider-item">
                            <DealProductCard
                                image={product.image}
                                title={product.title}
                                link={product.link}
                                originalPrice={product.originalPrice}
                                discountedPrice={product.discountedPrice}
                                rating={product.rating}
                                reviewsCount={product.reviewsCount}
                                discount={product.discount}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .featured-deals {
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
                
                .view-all-link svg {
                    transition: transform var(--transition-fast);
                }
                
                .view-all-link:hover svg {
                    transform: translateX(3px);
                }
                
                .products-slider {
                    display: flex;
                    gap: 1.5rem;
                    overflow-x: auto;
                    padding: 1rem 0 2rem;
                    scroll-snap-type: x mandatory;
                    -webkit-overflow-scrolling: touch;
                }
                
                .products-slider::-webkit-scrollbar {
                    height: 6px;
                }
                
                .products-slider::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.05);
                    border-radius: 10px;
                }
                
                .products-slider::-webkit-scrollbar-thumb {
                    background: var(--accent-red);
                    border-radius: 10px;
                }

                .slider-item {
                    flex: 0 0 400px;
                    width: 400px;
                    height: 600px;
                    scroll-snap-align: start;
                }
                
                @media (max-width: 768px) {
                    .slider-item {
                        flex: 0 0 300px;
                        width: 300px;
                        height: 500px;
                    }
                    .header-section {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .view-all-link {
                        width: 100%;
                        justify-content: center;
                    }
                }

                @media (max-width: 480px) {
                    .slider-item {
                        flex: 0 0 260px;
                        width: 260px;
                        height: 400px;
                    }
                }
            `}</style>
        </section>
    );
}
