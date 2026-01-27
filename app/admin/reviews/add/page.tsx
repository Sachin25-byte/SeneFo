'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddReviewPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        images: [] as string[],
        video: '',
        rating: 5,
        reviewsCount: 0,
        totalComments: 0,
        excerpt: '',
        category: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/admin/reviews');
            } else {
                alert('Failed to add review');
            }
        } catch (error) {
            console.error('Error adding review', error);
        }
    };

    return (
        <div className="add-review">
            <h1>Create New Review</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Review Title</label>
                    <input name="title" required onChange={handleChange} placeholder="e.g. Sony WH-1000XM5 Review" />
                </div>

                <div className="form-group">
                    <label>Featured Image</label>
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
                            placeholder="Featured Image URL or Upload File"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Review Gallery (Add up to 5 more images)</label>
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
                    <label>Video Review URL (YouTube/Direct Link)</label>
                    <input name="video" value={formData.video} onChange={handleChange} placeholder="https://..." />
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Category</label>
                        <input name="category" required onChange={handleChange} placeholder="Audio" />
                    </div>
                    <div className="form-group">
                        <label>Rating (1-5)</label>
                        <input name="rating" type="number" step="0.1" max="5" required onChange={handleChange} placeholder="4.5" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Short Review Summary</label>
                    <textarea name="excerpt" required onChange={handleChange} rows={4} placeholder="Brief summary of the review..." />
                </div>

                <button type="submit" className="submit-btn">Publish Review</button>
            </form>

            <style jsx>{`
                .add-review {
                    max-width: 600px;
                    margin: 0 auto;
                }
                h1 {
                    margin-bottom: 2rem;
                    color: var(--text-main);
                    font-family: var(--font-heading);
                    font-weight: 800;
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
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                    color: var(--text-main);
                    font-size: 0.9rem;
                }
                input, textarea {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid var(--bg-tertiary);
                    border-radius: var(--border-radius-md);
                    font-size: 1rem;
                    background: var(--bg-secondary);
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
                }
            `}</style>
        </div>
    );
}
