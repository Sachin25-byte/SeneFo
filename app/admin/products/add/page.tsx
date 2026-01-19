'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        originalPrice: '',
        discountedPrice: '',
        rating: 5,
        reviewsCount: 0,
        discount: '',
        category: '',
        link: '#'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/admin/products');
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product', error);
        }
    };

    return (
        <div className="add-product">
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Product Title</label>
                    <input name="title" required onChange={handleChange} placeholder="e.g. Wireless Earbuds" />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const data = new FormData();
                                    data.append('file', file);
                                    try {
                                        const res = await fetch('/api/upload', {
                                            method: 'POST',
                                            body: data
                                        });
                                        const result = await res.json();
                                        if (result.url) {
                                            setFormData(prev => ({ ...prev, image: result.url }));
                                        }
                                    } catch (err) {
                                        console.error('Upload failed', err);
                                        alert('Image upload failed');
                                    }
                                }
                            }}
                        />
                    </div>
                    <input
                        name="image"
                        required
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL or Upload File"
                        style={{ marginTop: '10px' }}
                    />
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Original Price (₹)</label>
                        <input name="originalPrice" required onChange={handleChange} placeholder="1999" />
                    </div>
                    <div className="form-group">
                        <label>Discounted Price (₹)</label>
                        <input name="discountedPrice" required onChange={handleChange} placeholder="1499" />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Category</label>
                        <input name="category" required onChange={handleChange} placeholder="Electronics" />
                    </div>
                    <div className="form-group">
                        <label>Discount Label</label>
                        <input name="discount" onChange={handleChange} placeholder="25% OFF" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Affiliate Link</label>
                    <input name="link" onChange={handleChange} placeholder="https://amazon..." />
                </div>

                <button type="submit" className="submit-btn">Add Product</button>
            </form>

            <style jsx>{`
                .add-product {
                    max-width: 600px;
                    margin: 0 auto;
                }
                h1 {
                    margin-bottom: 2rem;
                    color: #1a4231;
                }
                .form-container {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .form-group {
                    margin-bottom: 1.5rem;
                }
                .row {
                    display: flex;
                    gap: 1.5rem;
                }
                .row .form-group {
                    flex: 1;
                }
                @media (max-width: 600px) {
                    .row {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: #444;
                }
                input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 1rem;
                }
                .submit-btn {
                    width: 100%;
                    padding: 12px;
                    background: #2d5a43;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    margin-top: 1rem;
                }
                .submit-btn:hover {
                    background: #1e3d2d;
                }
            `}</style>
        </div>
    );
}
