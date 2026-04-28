import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">👋</div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Hi, {user.name}!</h2>
        <p className="text-gray-400 mb-8">You're already logged in. Start exploring! ✨</p>
        <Link to="/products" className="bg-gradient-to-r from-rose-800 to-rose-900 text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
          Shop Now <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      let result;
      if (isLogin) {
        result = login(form.email, form.password);
      } else {
        result = signup(form.name, form.email, form.password);
      }
      setLoading(false);
      if (result.success) navigate('/');
      else setError(result.error);
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-pink-100 border border-pink-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-800 to-rose-900 px-8 py-10 text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-white mb-1">
              {isLogin ? 'Welcome Back! 💕' : 'Join SeneFo ✨'}
            </h1>
            <p className="text-rose-100 text-sm">
              {isLogin ? 'Login to your account' : 'Create your free account'}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex mx-6 mt-6 bg-pink-50 rounded-full p-1">
            {['Login', 'Sign Up'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => { setIsLogin(i === 0); setError(''); }}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                  (i === 0) === isLogin
                    ? 'bg-white text-rose-700 shadow-sm'
                    : 'text-gray-500 hover:text-rose-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Priya Sharma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-pink-50/30"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-pink-50/30"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-pink-50/30 pr-12"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-700 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-sm text-red-500 font-medium">
                ⚠️ {error}
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs text-rose-600 hover:text-rose-700 font-semibold">Forgot password?</button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-800 to-rose-900 text-white py-4 rounded-xl font-bold text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-rose-200 disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Login to SeneFo' : 'Create Account'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 pt-1">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-rose-700 font-bold hover:underline">
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </form>

          <div className="px-6 pb-6">
            <div className="relative flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-pink-100" />
              <span className="text-xs text-gray-400 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-pink-100" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['🇬 Google', '🍎 Apple'].map(provider => (
                <button key={provider}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-pink-100 text-sm font-semibold text-gray-600 hover:bg-pink-50 hover:border-pink-200 transition-all">
                  {provider}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          By continuing, you agree to SeneFo's{' '}
          <a href="#" className="text-rose-600 hover:underline">Terms</a> &{' '}
          <a href="#" className="text-rose-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
