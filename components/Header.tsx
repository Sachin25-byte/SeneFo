'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setIsMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Helper to check if link is active
    const isActive = (path: string) => pathname === path ? 'active' : '';

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'var(--bg-primary)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--bg-tertiary)',
            boxShadow: 'var(--shadow-sm)',
            padding: '0.75rem 0',
            color: 'var(--text-main)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
            }}>
                <Link href="/" style={{ zIndex: 1001 }}>
                    <img
                        src="/logo.png"
                        alt="SeneFo Logo"
                        style={{
                            height: '50px',
                            width: 'auto',
                            objectFit: 'contain'
                        }}
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <ul style={{
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center',
                        fontWeight: 600,
                        listStyle: 'none'
                    }}>
                        <li><Link href="/" className={`nav-link ${isActive('/')}`}>Home</Link></li>
                        <li><Link href="/best_deals" className={`nav-link ${isActive('/best_deals')}`}>Deals</Link></li>
                        <li><Link href="/reviews" className={`nav-link ${isActive('/reviews')}`}>Reviews</Link></li>
                        <li><Link href="/blog" className={`nav-link ${isActive('/blog')}`}>Blog</Link></li>
                        <li><Link href="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link></li>
                        <li>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginLeft: '1rem' }}>
                                {/* Instagram */}
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: '#FD5949' }} />
                                                <stop offset="50%" style={{ stopColor: '#D6249F' }} />
                                                <stop offset="100%" style={{ stopColor: '#285AEB' }} />
                                            </linearGradient>
                                        </defs>
                                        <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Z" stroke="url(#instagram-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7616 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.5229 8.09117 14.345 8.52846 14.9427 9.22961C15.5404 9.93076 15.8727 10.8447 15.8727 11.8H16V11.37Z" stroke="url(#instagram-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="17.5" cy="6.5" r="0.5" fill="url(#instagram-gradient)" />
                                    </svg>
                                </a>
                                {/* Twitter */}
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
                                    </svg>
                                </a>
                                {/* Facebook */}
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.8rem',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        zIndex: 1001
                    }}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <nav style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-main)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem',
                        zIndex: 1000
                    }}>
                        <Link href="/" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700 }}>Home</Link>
                        <Link href="/best_deals" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700 }}>Best Deals</Link>
                        <Link href="/reviews" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700 }}>Reviews</Link>
                        <Link href="/blog" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700 }}>Blog</Link>
                        <Link href="/contact" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700 }}>Contact</Link>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="instagram-gradient-mobile" x1="0%" y1="100%" x2="100%" y2="0%">
                                            <stop offset="0%" style={{ stopColor: '#FD5949' }} />
                                            <stop offset="50%" style={{ stopColor: '#D6249F' }} />
                                            <stop offset="100%" style={{ stopColor: '#285AEB' }} />
                                        </linearGradient>
                                    </defs>
                                    <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Z" stroke="url(#instagram-gradient-mobile)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7616 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.5229 8.09117 14.345 8.52846 14.9427 9.22961C15.5404 9.93076 15.8727 10.8447 15.8727 11.8H16V11.37Z" stroke="url(#instagram-gradient-mobile)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
                                </svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </nav>
                )}
            </div>

            <style jsx>{`
        .nav-link {
          color: var(--text-muted);
          transition: var(--transition-fast);
          position: relative;
        }
        .nav-link:hover {
          color: var(--accent-red);
        }
        .nav-link.active {
          color: var(--accent-red);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-red);
          transition: width var(--transition-fast);
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
        </header>
    );
}
