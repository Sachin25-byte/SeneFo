'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBlogPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        excerpt: '',
        category: '',
        rating: 5,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/admin/blog');
            } else {
                alert('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
        <div className="add-blog">
            <h1>Write New Post</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Post Title</label>
                    <input name="title" required onChange={handleChange} placeholder="e.g. Top 10 Gadgets" />
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
                        <label>Category</label>
                        <input name="category" required onChange={handleChange} placeholder="Guide" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Excerpt / Short Description</label>
                    <textarea name="excerpt" required onChange={handleChange} rows={4} placeholder="Brief summary..." />
                </div>

                <button type="submit" className="submit-btn">Publish Post</button>
            </form>

            <style jsx>{`
                .add-blog {
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
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: #444;
                }
                input, textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 1rem;
                    font-family: inherit;
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
