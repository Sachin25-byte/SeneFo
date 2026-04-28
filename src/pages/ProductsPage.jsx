import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
];

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sort, setSort] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [priceRange, setPriceRange] = useState([0, 6000]);

  useEffect(() => {
    setActiveCategory(categoryParam);
    setLocalSearch(searchQuery);
  }, [categoryParam, searchQuery]);

  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory || p.badge === activeCategory);
    }

    // Search filter
    if (localSearch) {
      const q = localSearch.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }

    // Price range
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sort) {
      case 'price_asc': return list.sort((a, b) => a.price - b.price);
      case 'price_desc': return list.sort((a, b) => b.price - a.price);
      case 'rating': return list.sort((a, b) => b.rating - a.rating);
      case 'reviews': return list.sort((a, b) => b.reviews - a.reviews);
      default: return list;
    }
  }, [activeCategory, sort, localSearch, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-1">Shop All Styles</h1>
        <p className="text-gray-400 text-sm">{filtered.length} products found</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={localSearch}
          onChange={e => setLocalSearch(e.target.value)}
          placeholder="Search styles, categories..."
          className="w-full pl-11 pr-4 py-3 rounded-full border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-pink-50/50"
        />
        {localSearch && (
          <button onClick={() => setLocalSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-700">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`lg:w-56 flex-shrink-0 ${filterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wider">Category</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-rose-700 text-white'
                        : 'text-gray-600 hover:bg-pink-50 hover:text-rose-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wider">Price Range</h3>
              <p className="text-xs text-gray-400 mb-2">₹{priceRange[0]} – ₹{priceRange[1]}</p>
              <input
                type="range"
                min={0}
                max={6000}
                step={100}
                value={priceRange[1]}
                onChange={e => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-rose-700"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            {/* Category pills (scrollable) */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    activeCategory === cat
                      ? 'bg-rose-700 text-white border-rose-700'
                      : 'border-pink-200 text-rose-700 hover:bg-pink-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-pink-200 text-sm text-rose-700 font-semibold hover:bg-pink-50"
              >
                <SlidersHorizontal size={15} /> Filters
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none pl-4 pr-9 py-2 rounded-full border border-pink-200 text-sm font-semibold text-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white cursor-pointer"
                >
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No styles found</h3>
              <p className="text-gray-400 text-sm">Try a different search or category</p>
              <button onClick={() => { setLocalSearch(''); setActiveCategory('All'); }} className="mt-4 bg-rose-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-rose-800 transition-all">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
