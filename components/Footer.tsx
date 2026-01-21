import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.98) 0%, rgba(18, 18, 18, 0.95) 100%)',
            borderTop: '1px solid rgba(212, 175, 55, 0.15)',
            color: 'var(--soft-white)',
            padding: '4rem 0 2rem',
            marginTop: '4rem'
        }}>
            <div className="container">
                {/* Amazon Affiliate Disclaimer */}
                <div style={{
                    background: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '1.5rem',
                    marginBottom: '3rem',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--light-gray)',
                        lineHeight: '1.7',
                        margin: 0
                    }}>
                        <strong style={{ color: 'var(--royal-gold)' }}>Affiliate Disclosure:</strong>{' '}
                        SENEFO participates in the Amazon Services LLC Associates Program, an affiliate advertising
                        program designed to provide a means for sites to earn advertising fees by advertising and linking
                        to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2.5rem'
                }}>
                    {/* Logo Section */}
                    <div style={{ textAlign: 'center' }}>
                        <Link href="/">
                            <img
                                src="/logo-gold.png"
                                alt="SENEFO Logo"
                                style={{
                                    height: '70px',
                                    width: 'auto',
                                    marginBottom: '1rem',
                                    filter: 'drop-shadow(0 4px 12px rgba(212, 175, 55, 0.3))'
                                }}
                            />
                        </Link>
                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--medium-gray)',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            A product review site helping you make informed shopping decisions through
                            honest comparisons and detailed buying guides.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        fontWeight: 500
                    }} className="footer-links">
                        <Link href="/about" style={{
                            color: 'var(--light-gray)',
                            transition: 'color 0.3s ease'
                        }}>About SENEFO</Link>
                        <span style={{ color: 'var(--dark-gold)' }}>•</span>
                        <Link href="/privacy" style={{
                            color: 'var(--light-gray)',
                            transition: 'color 0.3s ease'
                        }}>Privacy Policy</Link>
                        <span style={{ color: 'var(--dark-gold)' }}>•</span>
                        <Link href="/disclosure" style={{
                            color: 'var(--light-gray)',
                            transition: 'color 0.3s ease'
                        }}>Affiliate Disclosure</Link>
                        <span style={{ color: 'var(--dark-gold)' }}>•</span>
                        <Link href="/contact" style={{
                            color: 'var(--light-gray)',
                            transition: 'color 0.3s ease'
                        }}>Contact Us</Link>
                    </div>

                    {/* Social Media Icons */}
                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        alignItems: 'center'
                    }}>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                transition: 'transform 0.3s ease',
                                display: 'flex'
                            }}
                            className="social-icon"
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Z" stroke="var(--royal-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7616 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.5229 8.09117 14.345 8.52846 14.9427 9.22961C15.5404 9.93076 15.8727 10.8447 15.8727 11.8H16V11.37Z" stroke="var(--royal-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.5 6.5H17.51" stroke="var(--royal-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                transition: 'transform 0.3s ease',
                                display: 'flex'
                            }}
                            className="social-icon"
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="var(--royal-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                transition: 'transform 0.3s ease',
                                display: 'flex'
                            }}
                            className="social-icon"
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="var(--royal-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>

                    {/* Copyright */}
                    <div style={{
                        marginTop: '1rem',
                        fontSize: '0.9rem',
                        color: 'var(--medium-gray)',
                        textAlign: 'center',
                        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
                        paddingTop: '1.5rem',
                        width: '100%'
                    }}>
                        <p style={{ margin: 0 }}>
                            © {new Date().getFullYear()} <span style={{ color: 'var(--royal-gold)', fontWeight: 600 }}>SENEFO</span>. All rights reserved.
                        </p>
                        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.8 }}>
                            Made with ❤️ for smart shoppers worldwide
                        </p>
                    </div>
                </div>

                <style jsx>{`
                    .footer-links a:hover {
                        color: var(--royal-gold) !important;
                    }
                    
                    .social-icon:hover {
                        transform: translateY(-3px);
                    }
                    
                    .social-icon:hover svg path {
                        stroke: var(--bright-gold);
                        filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.5));
                    }
                    
                    @media (max-width: 768px) {
                        .footer-links {
                            flex-direction: column !important;
                            gap: 1rem !important;
                            text-align: center;
                        }
                        .footer-links span {
                            display: none;
                        }
                    }
                `}</style>
            </div>
        </footer>
    );
}
