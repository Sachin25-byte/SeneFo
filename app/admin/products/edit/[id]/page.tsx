'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        images: [] as string[],
        video: '',
        originalPrice: '',
        discountedPrice: '',
        rating: 5,
        reviewsCount: 0,
        discount: '',
        category: '',
        link: '#'
    });

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    ...data,
                    images: data.images || [],
                    video: data.video || ''
                });
            })
            .catch(err => console.error('Error fetching product:', err));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const submissionData = {
                ...formData,
                rating: Number(formData.rating),
                reviewsCount: Number(formData.reviewsCount),
                images: Array.isArray(formData.images) ? formData.images : []
            };

            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            if (res.ok) {
                router.push('/admin/products');
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    return (
        <div className="add-product">
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Product Title</label>
                    <input name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. Wireless Earbuds" />
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
                    {formData.image && <img src={formData.image} alt="Preview" style={{ height: '50px', marginTop: '10px' }} />}
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Original Price (₹)</label>
                        <input name="originalPrice" required value={formData.originalPrice} onChange={handleChange} placeholder="1999" />
                    </div>
                    <div className="form-group">
                        <label>Discounted Price (₹)</label>
                        <input name="discountedPrice" required value={formData.discountedPrice} onChange={handleChange} placeholder="1499" />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Category</label>
                        <input name="category" required value={formData.category} onChange={handleChange} placeholder="Electronics" />
                    </div>
                    <div className="form-group">
                        <label>Discount Label</label>
                        <input name="discount" value={formData.discount} onChange={handleChange} placeholder="25% OFF" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Affiliate Link</label>
                    <input name="link" value={formData.link} onChange={handleChange} placeholder="https://amazon..." />
                </div>

                <button type="submit" className="submit-btn">Update Product</button>
            </form>

            <style jsx>{`
                .add-product {
                    max-width: 600px;
                    margin: 0 auto;
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                h1 {
                    margin-bottom: 2.5rem;
                    color: var(--text-main);
                    font-family: var(--font-heading);
                    font-weight: 800;
                    font-size: 2.25rem;
                    letter-spacing: -0.02em;
                }
                .form-container {
                    background: white;
                    padding: 2.5rem;
                    border-radius: var(--border-radius-xl);
                    box-shadow: var(--shadow-lg);
                    border: 1px solid var(--bg-tertiary);
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
                    .form-container {
                        padding: 1.5rem;
                    }
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                    color: var(--text-main);
                    font-size: 0.9rem;
                }
                input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid var(--bg-tertiary);
                    border-radius: var(--border-radius-md);
                    font-size: 1rem;
                    background: var(--bg-secondary);
                    transition: all var(--transition-fast);
                    font-family: var(--font-primary);
                }
                input:focus {
                    outline: none;
                    border-color: var(--accent-blue);
                    background: white;
                    box-shadow: 0 0 0 4px var(--accent-blue-glow);
                }
                .submit-btn {
                    width: 100%;
                    padding: 14px;
                    background: var(--accent-blue);
                    color: white;
                    border: none;
                    border-radius: var(--border-radius-md);
                    font-weight: 800;
                    font-size: 1rem;
                    cursor: pointer;
                    margin-top: 1rem;
                    transition: all var(--transition-fast);
                    box-shadow: 0 4px 12px rgba(19, 114, 154, 0.2);
                }
                .submit-btn:hover {
                    background: var(--accent-blue-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(19, 114, 154, 0.3);
                }
            `}</style>
        </div>
    );
}
