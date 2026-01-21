export default function DisclosurePage() {
    return (
        <div className="policy-page">
            <div className="container">
                <div className="policy-content">
                    <h1>Affiliate Disclosure</h1>
                    <p className="last-updated">Last updated: January 17, 2026</p>

                    <section>
                        <p>
                            SeneFo is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in.
                        </p>
                    </section>

                    <section>
                        <h2>Transparency is Key</h2>
                        <p>
                            Our priority is always to provide honest and unbiased information to our readers. We only recommend products that we believe are of high quality and provide value to our audience.
                        </p>
                        <p>
                            When you click on an affiliate link on SeneFo and make a purchase, we may receive a small commission from the retailer. This commission comes at no additional cost to you. In many cases, our links may even provide you with a special discount or deal.
                        </p>
                    </section>

                    <section>
                        <h2>Why We Use Affiliate Links</h2>
                        <p>
                            The commissions we earn through affiliate links help us cover the costs of operating this website, including hosting, research, content creation, and maintenance. This allows us to continue providing free, high-quality information to our users.
                        </p>
                    </section>

                    <section>
                        <h2>Our Commitment</h2>
                        <p>
                            We value the trust of our readers above all else. We do not accept paid reviews or placements that would compromise our integrity. If a product is bad, we'll tell you. If it's great, we'll explain why.
                        </p>
                    </section>

                    <p className="contact-note">
                        If you have any questions regarding this disclosure or our affiliation with Amazon, please feel free to <a href="/contact">contact us</a>.
                    </p>
                </div>
            </div>

            <style jsx>{`
                .policy-page {
                    padding: 4rem 0;
                    background-color: #f8fafc;
                    min-height: 80vh;
                }
                .policy-content {
                    max-width: 900px;
                    margin: 0 auto;
                    background: white;
                    padding: 4rem;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }
                h1 {
                    font-size: 2.5rem;
                    color: #2d5a43;
                    margin-bottom: 0.5rem;
                }
                .last-updated {
                    color: #94a3b8;
                    margin-bottom: 3rem;
                    font-style: italic;
                }
                section {
                    margin-bottom: 2.5rem;
                }
                h2 {
                    color: #2d5a43;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    border-bottom: 2px solid #f1f5f9;
                    padding-bottom: 0.5rem;
                }
                p {
                    color: #4a5568;
                    line-height: 1.8;
                    margin-bottom: 1rem;
                }
                .contact-note {
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 1px solid #f1f5f9;
                    color: #64748b;
                }
                .contact-note a {
                    color: #2d5a43;
                    font-weight: 600;
                    text-decoration: underline;
                }
                @media (max-width: 600px) {
                    .policy-content {
                        padding: 2.5rem 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
