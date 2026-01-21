export default function PrivacyPage() {
    return (
        <div className="policy-page">
            <div className="container">
                <div className="policy-content">
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Last updated: January 17, 2026</p>

                    <section>
                        <h2>1. Information We Collect</h2>
                        <p>At SeneFo, we collect minimal information to provide you with the best experience. This includes information you provide directly (like through our contact form) and automated technical data (like IP address and browser type).</p>
                    </section>

                    <section>
                        <h2>2. How We Use Information</h2>
                        <p>We use your information to:</p>
                        <ul>
                            <li>Provide, operate, and maintain our website</li>
                            <li>Improve, personalize, and expand our website</li>
                            <li>Understand and analyze how you use our website</li>
                            <li>Develop new products, services, features, and functionality</li>
                            <li>Communicate with you for customer service and updates</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Affiliate Disclosure Link</h2>
                        <p>Please note that some of the links on this website are affiliate links, and at no additional cost to you, we may earn a commission if you decide to make a purchase after clicking through the link.</p>
                    </section>

                    <section>
                        <h2>4. Cookies</h2>
                        <p>We use cookies to store information about visitors' preferences, to record user-specific information on which pages the user accesses or visits, and to customize web page content based on visitors' browser type or other information that the visitor sends via their browser.</p>
                    </section>

                    <section>
                        <h2>5. Third-Party Privacy Policies</h2>
                        <p>SeneFo's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.</p>
                    </section>
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
                ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    color: #4a5568;
                    line-height: 1.8;
                }
                li {
                    margin-bottom: 0.5rem;
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
