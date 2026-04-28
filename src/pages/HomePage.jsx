import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Truck, RotateCcw, Shield, Star, Sparkles, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products as hardcodedProducts, categories } from '../data/products';

const heroSlides = [
  {
    tag: "New Collection 2026",
    title: "Dress Like You\nOwn The World",
    subtitle: "Trending styles for every girl. Discover fashion that speaks your personality.",
    cta: "Shop Now",
    bg: "from-pink-100 via-rose-50 to-white",
    accent: "from-rose-800 to-rose-900",
    img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80",
  }
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: Shield, title: "Secure Payment", desc: "100% safe & encrypted" },
  { icon: Star, title: "Premium Quality", desc: "Curated by fashion experts" },
];

const testimonials = [
  { name: "Priya S.", rating: 5, text: "Absolutely love my Floral Maxi Dress! The quality is amazing and it fits perfectly. Will definitely shop again! 💕", avatar: "PS" },
  { name: "Aarti M.", rating: 5, text: "SeneFo has the best collection. The Pink Blazer Set is my office go-to now. Fast shipping too!", avatar: "AM" },
  { name: "Sneha R.", rating: 4, text: "Love the variety and the AI chatbot helped me pick the perfect wedding guest outfit!", avatar: "SR" },
];

const banners = [
  { title: "Up to 40% Off", subtitle: "Sale Picks", color: "from-rose-700 to-rose-900", emoji: "🎀" },
  { title: "New Arrivals", subtitle: "Fresh Drops Weekly", color: "from-purple-400 to-pink-500", emoji: "✨" },
  { title: "Ethnic Wear", subtitle: "Festival Ready", color: "from-amber-400 to-orange-500", emoji: "🌸" },
];

export default function HomePage() {
  const [products, setProducts] = useState(hardcodedProducts);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setProducts(data);
      })
      .catch(err => console.error(err));
  }, []);

  const trending = products.slice(0, 4);
  const bestDeals = products.slice(4, 8);
  const under999 = products.slice(0, 4); // Reused since prices are hidden

  return (
    <div>
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${heroSlides[0].bg} min-h-[90vh] flex items-center relative overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-rose-200/40 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 bg-pink-100 text-rose-700 text-xs font-bold px-4 py-2 rounded-full border border-pink-200">
              <Sparkles size={12} />
              {heroSlides[0].tag}
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight whitespace-pre-line">
              {heroSlides[0].title.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className={`bg-gradient-to-r ${heroSlides[0].accent} bg-clip-text text-transparent`}>{line}</span>
                  ) : line}
                </span>
              ))}
            </h1>
            <p className="text-gray-500 text-lg max-w-md leading-relaxed">{heroSlides[0].subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-800 to-rose-900 text-white px-8 py-4 rounded-full font-bold text-base shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:scale-105 transition-all"
              >
                {heroSlides[0].cta} <ArrowRight size={18} />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-bold text-base border border-gray-200 hover:border-rose-400 hover:text-rose-700 transition-all"
              >
                View Lookbook <ChevronRight size={18} />
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[['10K+', 'Happy Girls'], ['500+', 'Styles'], ['4.8★', 'Rating']].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black text-gray-900">{num}</p>
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center">
            <div className="relative w-80 h-96 md:w-96 md:h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-300 rounded-[40px] blur-xl opacity-50" />
              <img
                src={heroSlides[0].img}
                alt="Fashion Hero"
                className="relative z-10 w-full h-full object-cover rounded-[32px] shadow-2xl"
              />
              {/* Floating badges */}
              <div className="absolute -left-6 top-16 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2 z-20">
                <span className="text-2xl">🎀</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">New Drop!</p>
                  <p className="text-[10px] text-gray-400">Summer 2026</p>
                </div>
              </div>
              <div className="absolute -right-6 bottom-20 bg-white rounded-2xl px-4 py-3 shadow-xl z-20">
                <p className="text-xs font-bold text-gray-800">⭐ 4.9/5</p>
                <p className="text-[10px] text-gray-400">10K+ Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map(cat => (
            <Link
              key={cat}
              to={cat === 'All' ? '/products' : `/products?category=${cat}`}
              className="flex-shrink-0 px-5 py-2.5 rounded-full border-2 border-pink-200 text-rose-700 font-semibold text-sm hover:bg-rose-700 hover:text-white hover:border-rose-700 transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {banners.map(({ title, subtitle, color, emoji }) => (
            <Link key={title} to="/products" className={`bg-gradient-to-r ${color} text-white rounded-2xl p-6 flex items-center justify-between hover:scale-[1.02] transition-transform shadow-md`}>
              <div>
                <p className="text-xs font-semibold opacity-80 mb-1">{subtitle}</p>
                <p className="text-xl font-black">{title}</p>
              </div>
              <span className="text-4xl">{emoji}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-rose-700 font-semibold text-sm mb-1">Top rated globally</p>
            <h2 className="text-3xl font-black text-gray-900">🔥 Trending on Amazon</h2>
          </div>
          <Link to="/products" className="flex items-center gap-1.5 text-rose-700 font-semibold text-sm hover:gap-3 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Feature Strip */}
      <section className="bg-pink-50 py-12 my-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 p-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Icon size={22} className="text-rose-700" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Deals Today */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-rose-700 font-semibold text-sm mb-1">Massive discounts</p>
            <h2 className="text-3xl font-black text-gray-900">💖 Best Deals Today</h2>
          </div>
          <Link to="/products?category=Sale" className="flex items-center gap-1.5 text-rose-700 font-semibold text-sm hover:gap-3 transition-all">
            See All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestDeals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Under 999 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-rose-700 font-semibold text-sm mb-1">Budget friendly finds</p>
            <h2 className="text-3xl font-black text-gray-900">👗 Under ₹999</h2>
          </div>
          <Link to="/products" className="flex items-center gap-1.5 text-rose-700 font-semibold text-sm hover:gap-3 transition-all">
            Shop More <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {under999.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-rose-700 font-semibold text-sm mb-1">💬 What they say</p>
            <h2 className="text-3xl font-black text-gray-900">Loved by Girls Everywhere</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, rating, text, avatar }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-pink-50">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(rating)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-rose-700 to-rose-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {avatar}
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="relative z-10">
            <p className="text-rose-100 text-sm mb-3 font-medium">Limited Time Offer ⏰</p>
            <h2 className="text-4xl font-black mb-3">Get 20% Off Your First Order!</h2>
            <p className="text-rose-100 mb-6 text-sm">Use code <strong className="bg-white/20 px-2 py-0.5 rounded-lg">GIRLY20</strong> at checkout</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-rose-700 font-black px-8 py-4 rounded-full hover:scale-105 transition-all shadow-lg"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
