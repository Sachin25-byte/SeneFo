import { Link } from 'react-router-dom';
import { Share2, Send, Globe, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-gradient-to-br from-rose-700 to-rose-900 rounded-full flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">SeneFo</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Fashion that celebrates every girl. Trendy, affordable, and made with love. 💖
          </p>
          <div className="flex gap-3 mt-5">
            {[Share2, Send, Globe].map((Icon, i) => (
              <a key={i} href="#" className="p-2 bg-gray-800 rounded-full hover:bg-rose-700 hover:text-white transition-all text-gray-400">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2 text-sm">
            {['New Arrivals', 'Dresses', 'Tops', 'Sets', 'Sale', 'Gift Cards'].map(link => (
              <li key={link}>
                <Link to="/products" className="text-gray-400 hover:text-rose-600 transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Help</h4>
          <ul className="space-y-2 text-sm">
            {['Size Guide', 'Returns & Exchanges', 'Shipping Info', 'Track Order', 'FAQ', 'Contact Us'].map(link => (
              <li key={link}>
                <a href="#" className="text-gray-400 hover:text-rose-600 transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Stay Glowing ✨</h4>
          <p className="text-sm text-gray-400 mb-4">Get exclusive drops, style tips, and deals straight to your inbox.</p>
          <form className="flex flex-col gap-2" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="px-4 py-2.5 rounded-full bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:border-pink-400 text-white placeholder-gray-500"
            />
            <button className="bg-rose-700 text-white py-2.5 rounded-full text-sm font-semibold hover:bg-rose-800 transition-all">
              Subscribe 🎀
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
        <p className="flex items-center justify-center gap-1">
          © 2026 SeneFo. Made with <Heart size={12} className="text-rose-700 fill-rose-700" /> for every girl.
        </p>
      </div>
    </footer>
  );
}
