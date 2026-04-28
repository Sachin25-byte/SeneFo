import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, ArrowLeft, Share2, ChevronRight, Truck, RotateCcw, Shield } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImg, setMainImg] = useState(product?.images[0] || product?.image);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) return (
    <div className="text-center py-32">
      <p className="text-5xl mb-4">😢</p>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Product not found</h2>
      <Link to="/products" className="bg-rose-700 text-white px-6 py-3 rounded-full font-semibold">Back to Shop</Link>
    </div>
  );

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addToCart(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-rose-700 hover:text-rose-700 font-semibold">
          <ArrowLeft size={15} /> Back
        </button>
        <ChevronRight size={13} />
        <Link to="/products" className="hover:text-rose-700">Shop</Link>
        <ChevronRight size={13} />
        <span className="text-gray-600 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-pink-50">
            <img src={mainImg} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(img)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${mainImg === img ? 'border-rose-700 scale-105' : 'border-transparent hover:border-pink-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Badge + Category */}
          <div className="flex items-center gap-2">
            {product.badge && (
              <span className="bg-rose-700 text-white text-xs font-bold px-3 py-1 rounded-full">{product.badge}</span>
            )}
            <span className="text-rose-600 text-sm font-semibold">{product.category}</span>
          </div>

          {/* Name */}
          <h1 className="text-3xl font-black text-gray-900 leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 py-4 border-y border-pink-50">
            <span className="text-4xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
            <div>
              <span className="text-gray-400 line-through text-sm">₹{product.originalPrice.toLocaleString()}</span>
              <span className="ml-2 text-green-500 font-bold text-sm">{discount}% off</span>
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">Color: <span className="font-normal text-gray-500">{selectedColor}</span></p>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                    selectedColor === color
                      ? 'border-rose-700 bg-rose-700 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-rose-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-700">Size:</p>
              <button className="text-xs text-rose-700 font-semibold hover:underline">Size Guide</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  className={`w-12 h-12 rounded-xl text-sm font-bold border-2 transition-all ${
                    selectedSize === size
                      ? 'border-rose-700 bg-rose-700 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-rose-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && <p className="text-red-400 text-xs mt-2">⚠️ Please select a size</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-rose-800 to-rose-900 text-white hover:opacity-90 hover:scale-[1.02] shadow-lg shadow-rose-200'
              }`}
            >
              <ShoppingBag size={18} />
              {added ? '✓ Added to Bag!' : 'Add to Bag'}
            </button>
            <button
              onClick={() => setWished(!wished)}
              className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                wished ? 'bg-rose-700 border-rose-700 text-white' : 'border-gray-200 text-gray-400 hover:border-rose-400 hover:text-rose-700'
              }`}
            >
              <Heart size={20} fill={wished ? 'currentColor' : 'none'} />
            </button>
            <button className="w-14 h-14 rounded-2xl border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-rose-400 hover:text-rose-700 transition-all">
              <Share2 size={20} />
            </button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-3">
            {[
              [Truck, 'Free Delivery', 'above ₹999'],
              [RotateCcw, 'Easy Returns', '30 days'],
              [Shield, 'Secure Pay', '100% safe'],
            ].map(([Icon, title, sub]) => (
              <div key={title} className="bg-pink-50 rounded-xl p-3 text-center">
                <Icon size={18} className="text-rose-700 mx-auto mb-1" />
                <p className="text-xs font-bold text-gray-700">{title}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-gray-800 mb-2">About this style</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {product.tags.map(tag => (
              <span key={tag} className="text-xs bg-pink-50 text-rose-700 border border-pink-100 px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900">You May Also Like</h2>
            <Link to="/products" className="text-rose-700 font-semibold text-sm hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
