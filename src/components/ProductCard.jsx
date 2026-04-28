import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, product.colors[0], product.sizes[Math.floor(product.sizes.length / 2)]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-pink-50 shadow-sm hover:shadow-xl hover:shadow-pink-100 transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/4] bg-pink-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="bg-rose-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWished(!wished); }}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all ${
              wished ? 'bg-rose-700 text-white scale-110' : 'bg-white/90 text-gray-400 hover:text-rose-700'
            }`}
          >
            <Heart size={15} fill={wished ? 'currentColor' : 'none'} />
          </button>

          {/* Quick Add overlay */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className={`w-full py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-rose-700 text-white hover:bg-rose-800'
              }`}
            >
              <ShoppingBag size={16} />
              {added ? '✓ Added to Bag!' : 'Quick Add'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-rose-600 font-semibold mb-1 uppercase tracking-wider">{product.category}</p>
          <h3 className="font-bold text-gray-800 text-sm leading-tight mb-2 group-hover:text-rose-700 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-400">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
