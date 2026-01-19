'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DealProductCard from '@/components/DealProductCard';
import Link from 'next/link';

function BestDealsPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    // Default to 'All' to show all products initially
    const initialTab = searchParams.get('tab') || 'All';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<string[]>(['Earbuds', 'Power Banks', 'Accessories']);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                const cats = Array.from(new Set(data.map((p: any) => p.category))).filter(Boolean) as string[];
                const uniqueCats = Array.from(new Set([...categories, ...cats]));
                setCategories(uniqueCats);
            })
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    useEffect(() => {
        const newUrl = `/best_deals?tab=${activeTab}`;
        router.push(newUrl, { scroll: false });
    }, [activeTab, router]);

    const filteredProducts = products.filter((p: any) => {
        // If activeTab is 'All', show everything. Otherwise match category.
        const matchesCategory = activeTab === 'All' || p.category === activeTab;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="best-page">
            {/* Breadcrumbs */}
            <div className="container">
                <div className="breadcrumbs">
                    <Link href="/">Home</Link> <span className="separator">/</span> <span className="current">Best Deals</span>
                </div>
            </div>

            <div className="container">
                <header className="page-header">
                    <h1>Best Deals On Every Thing You Want</h1>

                    {/* Search Bar */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for deals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                </header>

                <div className="tabs-container">
                    {/* "All Deals" Button - Functional, No Icon */}
                    <button
                        className={activeTab === 'All' ? 'tab-btn' : 'tab-btn-simple'}
                        onClick={() => setActiveTab('All')}
                    >
                        All Deals
                    </button>

                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={activeTab === cat ? 'tab-btn' : 'tab-btn-simple'}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="products-list">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product: any) => (
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
                        ))
                    ) : (
                        <div className="no-results">No products found for {activeTab}.</div>
                    )}
                </div>
            </div>

            {/* Trust Section */}
            <div className="trust-footer">
                <div className="container">
                    <div className="badges-grid">
                        <div className="badge-item">
                            <div className="badge-gold">
                                <span className="count">+1</span>
                                <span className="label">Review Site</span>
                            </div>
                            <p>India's Trusted Review Site</p>
                        </div>
                        <div className="badge-item">
                            <div className="badge-gold">
                                <span className="count">100K+</span>
                                <span className="label">Happy Users</span>
                            </div>
                            <p>Helping 100,000+ Users Choose</p>
                        </div>
                        <div className="badge-item">
                            <div className="badge-gold">
                                <span className="count">Top</span>
                                <span className="label">Rated</span>
                            </div>
                            <p>Recognized for Best Comparisons</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .best-page {
                    min-height: 100vh;
                    background: #f0f2f5;
                    font-family: 'Inter', sans-serif;
                    padding-bottom: 2rem;
                }
                .breadcrumbs {
                    padding: 1rem 0;
                    color: #64748b;
                    font-size: 0.9rem;
                }
                .breadcrumbs a {
                    color: #64748b;
                    text-decoration: none;
                }
                .separator {
                    margin: 0 0.5rem;
                }
                .current {
                    color: #1a4231;
                    font-weight: 500;
                }
                .page-header {
                    text-align: center;
                    margin: 1rem 0 2rem 0;
                }
                .page-header h1 {
                    font-size: 2rem;
                    color: #1a4231;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                }
                
                .search-container {
                    max-width: 600px;
                    margin: 0 auto;
                    position: relative;
                }
                .search-input {
                    width: 100%;
                    padding: 12px 20px 12px 40px;
                    border-radius: 6px;
                    border: 1px solid #e2e8f0;
                    font-size: 1rem;
                    background: white;
                }
                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }

                .tabs-container {
                    display: flex;
                    align-items: center;
                    background: #e9ecef;
                    padding: 4px;
                    border-radius: 4px;
                    max-width: 1200px;
                    margin: 0 auto 2rem auto;
                    overflow-x: auto;
                }
                
                .tab-btn {
                    padding: 8px 16px;
                    background: #2d4a3e; 
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    margin-right: 1rem;
                }

                .tab-btn-simple {
                    background: transparent;
                    border: none;
                    padding: 8px 16px;
                    color: #4b5563;
                    font-weight: 500;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: all 0.2s;
                }
                .tab-btn-simple:hover {
                    color: #1a4231;
                    background: rgba(0,0,0,0.05);
                }
                
                .products-list {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                    padding-bottom: 4rem;
                }
                @media (max-width: 1024px) {
                    .products-list {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                @media (max-width: 768px) {
                    .products-list {
                        grid-template-columns: repeat(2, 1fr);
                        max-width: 100%;
                        padding: 0 1rem 4rem 1rem;
                    }
                }
                @media (max-width: 480px) {
                    .products-list {
                        grid-template-columns: 1fr;
                    }
                }
                
                .no-results {
                    text-align: center;
                    padding: 4rem;
                    color: #94a3b8;
                    font-size: 1.2rem;
                }
                
                .trust-footer {
                    background: linear-gradient(135deg, #1a4231 0%, #0f2b1d 100%);
                    padding: 4rem 0 2rem 0;
                    color: white;
                    margin-top: auto;
                    width: 100%;
                }
                .badges-grid {
                    display: flex;
                    justify-content: center;
                    gap: 4rem;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                }
                .badge-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 1rem;
                }
                .badge-gold {
                    width: 100px;
                    height: 100px;
                    border: 3px solid #bf9b30;
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: #bf9b30;
                    background: rgba(0,0,0,0.3);
                    box-shadow: 0 0 15px rgba(191, 155, 48, 0.3);
                }
                .badge-gold .count {
                    font-size: 1.5rem;
                    font-weight: 800;
                    line-height: 1;
                }
                .badge-gold .label {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .badge-item p {
                    font-size: 0.9rem;
                    opacity: 0.9;
                    max-width: 150px;
                }
                @media (max-width: 768px) {
                    .page-header h1 { font-size: 1.5rem; }
                    .tab-btn, .tab-btn-simple { padding: 6px 12px; font-size: 0.9rem; }
                    .badges-grid { gap: 2rem; }
                    .tabs-container { justify-content: flex-start; } 
                }
            `}</style>
        </div>
    );
}

export default function BestDealsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BestDealsPageContent />
        </Suspense>
    );
}
