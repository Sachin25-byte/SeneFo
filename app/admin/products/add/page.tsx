'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Convert numbers and ensure arrays
            const submissionData = {
                ...formData,
                rating: Number(formData.rating),
                reviews_count: Number(formData.reviewsCount),
                images: Array.isArray(formData.images) ? formData.images : []
            };

            // Remove the old camelCase key
            delete (submissionData as any).reviewsCount;

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
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
                    <label>Main Product Image</label>
                    <div className="image-upload-wrapper">
                        <div className="file-input-box">
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
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Additional Images (Add up to 5 more)</label>
                    <div className="image-grid">
                        {formData.images.map((img, index) => (
                            <div key={index} className="image-item">
                                <img src={img} alt={`Slide ${index + 1}`} />
                                <button type="button" onClick={() => {
                                    const newImgs = [...formData.images];
                                    newImgs.splice(index, 1);
                                    setFormData({ ...formData, images: newImgs });
                                }} className="remove-img">×</button>
                            </div>
                        ))}
                        {formData.images.length < 5 && (
                            <div className="add-image-box">
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
                                                    setFormData(prev => ({ ...prev, images: [...prev.images, result.url] }));
                                                }
                                            } catch (err) {
                                                console.error('Upload failed', err);
                                            }
                                        }
                                    }}
                                />
                                <span>+ Add</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Video URL (YouTube/Direct Link)</label>
                    <input name="video" value={formData.video} onChange={handleChange} placeholder="https://..." />
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
                .image-upload-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .image-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
                    gap: 10px;
                    margin-top: 10px;
                }
                .image-item {
                    position: relative;
                    height: 80px;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid var(--bg-tertiary);
                }
                .image-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .remove-img {
                    position: absolute;
                    top: 2px;
                    right: 2px;
                    background: rgba(220, 38, 38, 0.8);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    font-size: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .add-image-box {
                    height: 80px;
                    border: 2px dashed var(--bg-tertiary);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    color: var(--text-dim);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .add-image-box:hover {
                    border-color: var(--accent-blue);
                    color: var(--accent-blue);
                }
                .add-image-box input {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    cursor: pointer;
                }
                .file-input-box {
                    background: var(--bg-secondary);
                    padding: 12px;
                    border-radius: var(--border-radius-md);
                    border: 1px dashed var(--accent-blue-light);
                }
                .file-input-box input[type="file"] {
                    font-size: 0.9rem;
                    color: var(--text-muted);
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
