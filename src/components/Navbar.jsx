import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, User, LogOut, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/products' },
    { label: 'New Arrivals', to: '/products?category=New' },
    { label: 'Sale', to: '/products?sale=true' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-rose-700 text-white text-center text-xs py-2 font-medium tracking-wide">
        🎀 Free Shipping on orders above ₹999 | Use code GIRLY20 for 20% off! 🎀
      </div>

      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-700 to-rose-900 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-rose-800 to-rose-900 bg-clip-text text-transparent tracking-tight">
                SeneFo
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-sm font-semibold text-gray-600 hover:text-rose-700 transition-colors relative group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-rose-700 hover:bg-pink-50 rounded-full transition-all"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <button className="p-2 text-gray-600 hover:text-rose-700 hover:bg-pink-50 rounded-full transition-all hidden sm:block">
                <Heart size={20} />
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-rose-700 hover:bg-pink-50 rounded-full transition-all">
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </Link>

              {/* User */}
              {user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Hi, {user.name}!</span>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-500 hover:text-rose-700 hover:bg-pink-50 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 bg-rose-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-rose-800 transition-all shadow-md hover:shadow-rose-200"
                >
                  <User size={15} />
                  Login
                </Link>
              )}

              {/* Hamburger */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-rose-700 hover:bg-pink-50 rounded-full transition-all"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-pink-100 px-4 py-3 bg-pink-50/60">
            <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
              <input
                autoFocus
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search dresses, tops, sets..."
                className="flex-1 px-4 py-2 rounded-full border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
              />
              <button
                type="submit"
                className="bg-rose-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-rose-800 transition-all"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-pink-100 bg-white px-4 py-4 flex flex-col gap-3">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-gray-700 hover:text-rose-700 py-2 border-b border-pink-50 transition-colors"
              >
                {label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Hi, {user.name}!</span>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="text-sm text-rose-700 font-semibold">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-rose-700 text-white text-center py-2.5 rounded-full text-sm font-semibold mt-1"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
