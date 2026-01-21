'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd send this to your API
        console.log('Form submitted:', formData);
        setSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="contact-page">
            <div className="container">
                <div className="contact-card">
                    <h1 className="page-title">Contact Us</h1>
                    <p className="page-lead">Have questions or feedback? We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.</p>

                    {submitted ? (
                        <div className="success-message">
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We will get back to you shortly.</p>
                            <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What is this regarding?"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Type your message here..."
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary submit-btn">Send Message</button>
                        </form>
                    )}
                </div>
            </div>

            <style jsx>{`
                .contact-page {
                    padding: 4rem 0;
                    background-color: #f8fafc;
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                }
                .contact-card {
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }
                .page-title {
                    text-align: center;
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #2d5a43;
                    margin-bottom: 1rem;
                }
                .page-lead {
                    text-align: center;
                    color: #64748b;
                    margin-bottom: 3rem;
                    font-size: 1.1rem;
                }
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-group label {
                    font-weight: 600;
                    color: #4a5568;
                }
                .form-group input, 
                .form-group textarea {
                    padding: 12px 16px;
                    border-radius: 10px;
                    border: 1px solid #e2e8f0;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: border-color 0.2s;
                }
                .form-group input:focus, 
                .form-group textarea:focus {
                    outline: none;
                    border-color: #2d5a43;
                    box-shadow: 0 0 0 3px rgba(45, 90, 67, 0.1);
                }
                .submit-btn {
                    margin-top: 1rem;
                    padding: 14px;
                    font-size: 1.1rem;
                }
                .success-message {
                    text-align: center;
                    padding: 2rem 0;
                }
                .success-message h3 {
                    color: #2d5a43;
                    font-size: 1.8rem;
                    margin-bottom: 1rem;
                }
                .success-message p {
                    color: #64748b;
                    margin-bottom: 2rem;
                }

                @media (max-width: 600px) {
                    .contact-card {
                        padding: 2rem 1.5rem;
                    }
                    .page-title {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}
