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
    const [categories, setCategories] = useState<string[]>(['Earbuds', 'Power Banks']);

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

            <style jsx>{`
                .best-page {
                    min-height: 100vh;
                    background: var(--bg-secondary);
                    padding-bottom: 4rem;
                }
                .breadcrumbs {
                    padding: 1.5rem 0;
                    color: var(--text-dim);
                    font-size: 0.85rem;
                }
                .breadcrumbs a {
                    color: var(--text-dim);
                    text-decoration: none;
                }
                .breadcrumbs a:hover {
                    color: var(--accent-red);
                }
                .separator {
                    margin: 0 0.5rem;
                    opacity: 0.5;
                }
                .current {
                    color: var(--text-main);
                    font-weight: 600;
                }
                .page-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                .page-header h1 {
                    font-size: 2.5rem;
                    color: var(--text-main);
                    font-weight: 900;
                    margin-bottom: 2rem;
                    letter-spacing: -0.02em;
                }
                
                .search-container {
                    max-width: 600px;
                    margin: 0 auto;
                    position: relative;
                }
                .search-input {
                    width: 100%;
                    padding: 1rem 1rem 1rem 3rem;
                    border-radius: var(--border-radius-md);
                    border: 1px solid var(--bg-tertiary);
                    font-size: 1rem;
                    background: #FFFFFF;
                    box-shadow: var(--shadow-sm);
                    transition: border-color var(--transition-fast);
                }
                .search-input:focus {
                    outline: none;
                    border-color: var(--accent-red);
                }
                .search-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    opacity: 0.5;
                }

                .tabs-container {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin: 0 auto 3rem auto;
                    overflow-x: auto;
                    padding-bottom: 0.5rem;
                    scrollbar-width: none;
                }
                .tabs-container::-webkit-scrollbar {
                    display: none;
                }
                
                .tab-btn {
                    padding: 10px 24px;
                    background: var(--accent-red);
                    color: #FFFFFF;
                    border: none;
                    border-radius: 6px;
                    font-weight: 700;
                    cursor: pointer;
                    white-space: nowrap;
                    box-shadow: var(--accent-shadow);
                }

                .tab-btn-simple {
                    background: #FFFFFF;
                    border: 1px solid var(--bg-tertiary);
                    padding: 10px 24px;
                    color: var(--text-muted);
                    font-weight: 600;
                    cursor: pointer;
                    border-radius: 6px;
                    white-space: nowrap;
                    transition: all var(--transition-fast);
                }
                .tab-btn-simple:hover {
                    color: var(--accent-red);
                    border-color: var(--accent-red);
                }
                
                .products-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    padding-bottom: 4rem;
                }
                
                .no-results {
                    text-align: center;
                    padding: 4rem;
                    color: var(--text-dim);
                    font-size: 1.2rem;
                    background: #FFFFFF;
                    border-radius: var(--border-radius-lg);
                    border: 1px dashed var(--bg-tertiary);
                }
                
                @media (max-width: 768px) {
                    .page-header h1 { font-size: 1.75rem; }
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
