export default function TrustSection() {
    return (
        <section style={{
            padding: '4rem 0',
            textAlign: 'center',
            borderTop: '1px solid #eee'
        }}>
            <div className="container">
                <h2 className="section-title">Why Trust SeneFo?</h2>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '1.2rem',
                    fontWeight: 600
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--primary-green)' }}>✓</span> Honest Reviews
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--primary-green)' }}>✓</span> Expert Comparisons
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--primary-green)' }}>✓</span> Indian Consumer Focus
                    </div>
                </div>
            </div>
        </section>
    );
}
