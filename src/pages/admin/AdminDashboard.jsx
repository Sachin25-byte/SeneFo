import { useState, useEffect } from 'react';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'from-blue-400 to-blue-600', light: 'bg-blue-50' },
    { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'from-rose-400 to-pink-600', light: 'bg-rose-50' },
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-purple-400 to-purple-600', light: 'bg-purple-50' },
    { title: 'Revenue (Mock)', value: '₹45,200', icon: TrendingUp, color: 'from-green-400 to-emerald-600', light: 'bg-green-50' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black text-gray-900 mb-8">Dashboard Overview</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Chart Mockup Area */}
      <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Sales Overview</h2>
        <div className="flex-1 flex items-end justify-between gap-2 border-b border-gray-100 pb-4">
          {/* Simple mockup bar chart */}
          {[40, 70, 45, 90, 65, 85, 120].map((height, i) => (
            <div key={i} className="w-full flex flex-col items-center gap-2 group">
              <div 
                className="w-full bg-rose-100 rounded-t-md group-hover:bg-rose-400 transition-colors relative" 
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {height * 100}
                </div>
              </div>
              <span className="text-xs text-gray-400">Day {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
