'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem('admin_logged_in');

    if (isLoggedIn !== 'true' && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // If it's the login page, don't show the sidebar layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    router.push('/admin/login');
  };

  // Prevent flash of content
  if (!isAuthenticated && pathname !== '/admin/login') {
    return <div style={{ height: '100vh', background: '#0f172a' }}></div>;
  }

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
              <span className="nav-text">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="nav-item logout" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
            <span className="icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
          <Link href="/" className="nav-item" style={{ marginTop: '0.5rem' }}>
            <span className="icon">🏠</span>
            <span className="nav-text">Back to Site</span>
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
          background: var(--bg-secondary);
          overflow: hidden;
          font-family: var(--font-primary);
        }
        .mobile-header {
            display: none;
            padding: 1rem;
            background: var(--bg-dark);
            color: white;
            align-items: center;
            gap: 1rem;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 900;
            box-shadow: var(--shadow-md);
        }

        .sidebar {
          width: 260px;
          min-width: 260px;
          background: #0f172a; /* Sleek dark blue/gray */
          color: white;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          height: 100%;
          z-index: 1001;
          overflow-y: auto;
        }

        .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(2px);
            z-index: 999;
        }
        .sidebar-header {
          padding: 2.5rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        .sidebar-header h2 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: white;
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
          gap: 0.5rem;
          overflow-y: auto;
        }
        .nav-item {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: flex-start !important;
          gap: 0.75rem;
          padding: 0.85rem 1.25rem;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: all var(--transition-smooth);
          border-radius: var(--border-radius-md);
          width: 100%;
          font-weight: 500;
          font-size: 0.95rem;
          text-align: left;
          line-height: 1;
        }
        .nav-item:hover {
          color: white;
          background: rgba(255,255,255,0.05);
          transform: translateX(4px);
        }
        .nav-item.active {
          color: white;
          background: var(--accent-blue);
          box-shadow: 0 4px 12px rgba(19, 114, 154, 0.4);
        }
        .icon {
          font-size: 1.25rem;
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .nav-text {
          display: inline-block;
          white-space: nowrap;
        }
        .sidebar-footer {
          padding: 1rem 1rem 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
        }
        
        .nav-item.logout {
          color: #fca5a5;
        }
        .nav-item.logout:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
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

