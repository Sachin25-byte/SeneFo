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
            background: 'linear-gradient(135deg, #1a4231 0%, #0f2b1d 100%)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 2px 15px rgba(0,0,0,0.15)',
            padding: '0.2rem 0',
            color: 'white'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
            }}>
                <Link href="/" style={{ zIndex: 1001 }}>
                    <img
                        src="/logo-gold.png"
                        alt="SeneFo Logo"
                        style={{
                            height: '80px',
                            width: 'auto',
                            objectFit: 'contain'
                        }}
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <ul style={{
                        display: 'flex',
                        gap: '2.5rem',
                        alignItems: 'center',
                        fontWeight: 500
                    }}>
                        <li><Link href="/" className={`nav-link ${isActive('/')}`}>Home</Link></li>
                        <li><Link href="/best_deals" className={`nav-link ${isActive('/best_deals')}`}>Best Deals</Link></li>
                        <li><Link href="/reviews" className={`nav-link ${isActive('/reviews')}`}>Reviews</Link></li>
                        <li><Link href="/blog" className={`nav-link ${isActive('/blog')}`}>Blog</Link></li>
                        <li><Link href="/about" className={`nav-link ${isActive('/about')}`}>About</Link></li>
                        <li>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                {/* Instagram */}
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Z" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7616 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.5229 8.09117 14.345 8.52846 14.9427 9.22961C15.5404 9.93076 15.8727 10.8447 15.8727 11.8H16V11.37Z" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.5 6.5H17.51" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                                {/* Twitter */}
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="#1DA1F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                                {/* Facebook */}
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                        color: 'white',
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
                        background: 'linear-gradient(135deg, #1a4231 0%, #0f2b1d 100%)',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem',
                        zIndex: 1000
                    }}>
                        <Link href="/" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 600 }}>Home</Link>
                        <Link href="/best_deals" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 600 }}>Best Deals</Link>
                        <Link href="/reviews" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 600 }}>Reviews</Link>
                        <Link href="/blog" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 600 }}>Blog</Link>
                        <Link href="/about" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 600 }}>About</Link>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Z" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7616 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.5229 8.09117 14.345 8.52846 14.9427 9.22961C15.5404 9.93076 15.8727 10.8447 15.8727 11.8H16V11.37Z" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.5 6.5H17.51" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="#1DA1F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </nav>
                )}
            </div>

            <style jsx>{`
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
