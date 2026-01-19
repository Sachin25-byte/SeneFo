'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Products', href: '/admin/products', icon: '📦' },
    { name: 'Categories', href: '/admin/categories', icon: '🏷️' },
    { name: 'Reviews', href: '/admin/reviews', icon: '⭐' },
    { name: 'Blog', href: '/admin/blog', icon: '📝' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="admin-container">
      {/* Mobile Header/Toggle */}
      <div className="mobile-header">
        <button
          className="mobile-toggle"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>
        <span className="mobile-title">Admin Panel</span>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button
            className="close-sidebar"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="icon">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Link href="/" className="nav-item logout">
            <span className="icon">🚪</span>
            Exit to Site
          </Link>
        </div>
      </aside>
      <main className="main-content">
        {children}
      </main>

      <style jsx>{`
        .admin-container {
          display: flex;
          height: 100vh;
          background: #f8fafc;
          overflow: hidden;
        }
        .mobile-header {
            display: none;
            padding: 1rem;
            background: #1a4231;
            color: white;
            align-items: center;
            gap: 1rem;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 900;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .sidebar {
          width: 260px;
          min-width: 260px;
          background: #1a4231;
          color: white;
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 10px rgba(0,0,0,0.05);
          height: 100%;
          z-index: 1001; /* Fixed: Above overlay (999) */
          overflow-y: auto;
        }
        /* ... */
        .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5); /* Dimming effect */
            backdrop-filter: blur(2px); /* nice blur for background only */
            z-index: 999;
        }
        .sidebar-header {
          padding: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        .close-sidebar {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
        }
        .sidebar-nav {
          flex: 1;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem; /* Increased gap */
          overflow-y: auto;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding: 1rem 1.5rem;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: all 0.3s ease;
          border-radius: 8px;
          width: 100%;
          font-weight: 500;
          white-space: nowrap; /* Prevent text wrap */
        }
        .nav-item:hover, .nav-item.active {
          color: #FFD700;
          background: rgba(255,255,255,0.1);
          transform: translateX(5px);
          font-size: 1.05rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .nav-item.active {
           border-left: 4px solid #FFD700;
           border-right: none;
        }
        .icon {
          font-size: 1.2rem;
          min-width: 24px; /* Fix icon width */
          text-align: center;
        }
        .sidebar-footer {
          padding: 1rem 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        
        .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          height: 100%;
          position: relative;
        }

        @media (max-width: 768px) {
            .mobile-header {
                display: flex;
            }
            .admin-container {
                flex-direction: column;
            }
            .sidebar {
                position: fixed;
                height: 100vh;
                top: 0;
                left: 0;
                transform: translateX(-100%); /* Default hidden on mobile */
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .sidebar.open {
                transform: translateX(0);
            }
            .sidebar-overlay {
                display: block;
            }
            .close-sidebar {
                display: block;
            }
            .main-content {
                height: 100%;
                padding-top: 5rem; 
                padding-left: 1rem;
                padding-right: 1rem;
                width: 100%;
            }
        }
      `}</style>
    </div>
  );
}
