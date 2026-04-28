import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [ordered, setOrdered] = useState(false);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'GIRLY20') {
      setDiscount(Math.round(total * 0.2));
      setCouponMsg('✅ 20% off applied!');
    } else {
      setDiscount(0);
      setCouponMsg('❌ Invalid coupon code');
    }
  };

  const shipping = (total - discount) >= 999 ? 0 : 99;
  const finalTotal = total - discount + shipping;

  if (ordered) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="text-7xl mb-6">🎉</div>
      <h2 className="text-3xl font-black text-gray-900 mb-3">Order Placed!</h2>
      <p className="text-gray-400 mb-8">Thank you for shopping with SeneFo! Your order is on its way. 💕</p>
      <Link to="/" className="bg-gradient-to-r from-rose-800 to-rose-900 text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 shadow-lg shadow-rose-200 hover:scale-105 transition-all">
        Continue Shopping <ArrowRight size={18} />
      </Link>
    </div>
  );

  if (cart.length === 0) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <ShoppingBag size={64} className="text-pink-200 mx-auto mb-6" />
      <h2 className="text-2xl font-black text-gray-800 mb-3">Your bag is empty</h2>
      <p className="text-gray-400 mb-8">Add some gorgeous styles to your bag! ✨</p>
      <Link to="/products" className="bg-gradient-to-r from-rose-800 to-rose-900 text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
        Shop Now <ArrowRight size={18} />
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-black text-gray-900 mb-8">My Bag 🛍️</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.key} className="bg-white rounded-2xl border border-pink-50 shadow-sm p-4 flex gap-4">
              <Link to={`/product/${item.id}`} className="w-24 h-28 rounded-xl overflow-hidden bg-pink-50 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-rose-600 font-semibold">{item.category}</p>
                    <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{item.selectedColor} • Size {item.selectedSize}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.key)} className="p-1.5 text-gray-300 hover:text-red-400 transition-all">
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-pink-50 rounded-full px-3 py-1.5">
                    <button onClick={() => updateQty(item.key, item.qty - 1)} className="text-rose-700"><Minus size={14} /></button>
                    <span className="text-sm font-bold text-gray-700 w-5 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.key, item.qty + 1)} className="text-rose-700"><Plus size={14} /></button>
                  </div>
                  <span className="font-black text-gray-900">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-2xl border border-pink-50 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-rose-700" />
              <h3 className="font-bold text-gray-700 text-sm">Apply Coupon</h3>
            </div>
            <div className="flex gap-2">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter code (e.g. GIRLY20)"
                className="flex-1 px-4 py-2.5 rounded-full border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-pink-50/50" />
              <button onClick={applyCoupon} className="bg-rose-700 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-rose-800 transition-all">Apply</button>
            </div>
            {couponMsg && <p className="text-xs mt-2 font-medium text-gray-500">{couponMsg}</p>}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-pink-50 shadow-sm p-6 sticky top-24">
            <h2 className="font-black text-gray-900 text-xl mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span><span className="font-semibold text-gray-700">₹{total.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-500 font-semibold">
                  <span>Discount</span><span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-500 font-semibold' : 'font-semibold text-gray-700'}>
                  {shipping === 0 ? 'FREE 🎉' : `₹${shipping}`}
                </span>
              </div>
              <div className="border-t border-pink-50 pt-3 flex justify-between font-black text-gray-900 text-base">
                <span>Total</span><span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => { setOrdered(true); clearCart(); }}
              className="w-full bg-gradient-to-r from-rose-800 to-rose-900 text-white py-4 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2">
              Place Order <ArrowRight size={16} />
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">🔒 Secure & encrypted checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
