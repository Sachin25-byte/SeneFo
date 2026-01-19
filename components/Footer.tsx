import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--accent-gradient)',
            color: 'white',
            padding: '2rem 0',
            marginTop: '4rem'
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    fontWeight: 500,
                    flexDirection: 'row'
                }} className="footer-links">
                    <Link href="/about">About SeneFo</Link>
                    <span className="divider">|</span>
                    <Link href="/privacy">Privacy Policy</Link>
                    <span className="divider">|</span>
                    <Link href="/disclosure">Affiliate Disclosure</Link>
                    <span className="divider">|</span>
                    <Link href="/contact">Contact Us</Link>
                </div>
                <style jsx>{`
                    @media (max-width: 600px) {
                        .footer-links {
                            flex-direction: column !important;
                            gap: 1rem !important;
                        }
                        .divider {
                            display: none;
                        }
                    }
                `}</style>
            </div>
        </footer>
    );
}
