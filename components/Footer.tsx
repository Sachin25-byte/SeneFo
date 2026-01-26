import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--bg-dark)',
            borderTop: '1px solid #333',
            color: 'var(--text-light)',
            padding: '1.5rem 0 1rem',
            marginTop: '4rem'
        }}>
            <div className="container">
                {/* Amazon Affiliate Disclaimer */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '0.75rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.7',
                        margin: 0
                    }}>
                        <strong style={{ color: 'var(--accent-red)' }}>Affiliate Disclosure:</strong>{' '}
                        SENEFO participates in the Amazon Services LLC Associates Program, an affiliate advertising
                        program designed to provide a means for sites to earn advertising fees by advertising and linking
                        to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    {/* Logo Section */}
                    <div style={{ textAlign: 'center' }}>
                        <Link href="/">
                            <img
                                src="/logo.png"
                                alt="SENEFO Logo"
                                style={{
                                    height: '45px',
                                    width: 'auto',
                                    marginBottom: '0.75rem',
                                    filter: 'brightness(0) invert(1)',
                                    objectFit: 'contain'
                                }}
                            />
                        </Link>
                        <p style={{
                            fontSize: '0.95rem',
                            color: 'rgba(255, 255, 255, 0.6)',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            Helping you make smarter buying decisions with expert reviews,
                            practical buying guides, and handpicked deals.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        fontWeight: 600
                    }} className="footer-links">
                        <Link href="/about" style={{ color: 'inherit' }}>About</Link>
                        <Link href="/privacy" style={{ color: 'inherit' }}>Privacy</Link>
                        <Link href="/disclosure" style={{ color: 'inherit' }}>Disclosure</Link>
                        <Link href="/contact" style={{ color: 'inherit' }}>Contact</Link>
                    </div>

                    {/* Social Media Icons */}
                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        alignItems: 'center'
                    }}>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="instagram-gradient-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{ stopColor: '#FD5949' }} />
                                        <stop offset="50%" style={{ stopColor: '#D6249F' }} />
                                        <stop offset="100%" style={{ stopColor: '#285AEB' }} />
                                    </linearGradient>
                                </defs>
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#instagram-gradient-footer)" strokeWidth="2"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#instagram-gradient-footer)" strokeWidth="2"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#instagram-gradient-footer)" strokeWidth="2"></line>
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
                            </svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                    </div>

                    {/* Copyright */}
                    <div style={{
                        marginTop: '1rem',
                        fontSize: '0.85rem',
                        color: 'rgba(255, 255, 255, 0.4)',
                        textAlign: 'center',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        paddingTop: '1.5rem',
                        width: '100%'
                    }}>
                        <p style={{ margin: 0 }}>
                            © {new Date().getFullYear()} <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>SENEFO</span>. All rights reserved.
                        </p>
                    </div>
                </div>

                <style jsx>{`
                    .footer-links :global(a) {
                        transition: color var(--transition-fast);
                        color: rgba(255, 255, 255, 0.7) !important;
                    }
                    .footer-links :global(a:hover) {
                        color: var(--accent-red) !important;
                    }
                    .social-icon {
                        color: rgba(255, 255, 255, 0.6);
                        transition: all var(--transition-fast);
                    }
                    .social-icon:hover {
                        color: var(--accent-red);
                        transform: translateY(-2px);
                    }
                    @media (max-width: 768px) {
                        .footer-links {
                            flex-direction: column !important;
                            gap: 1rem !important;
                        }
                    }
                `}</style>
            </div>
        </footer>
    );
}
