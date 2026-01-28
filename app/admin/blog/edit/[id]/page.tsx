'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditBlogPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        images: [] as string[],
        video: '',
        excerpt: '',
        category: '',
        date: ''
    });

    useEffect(() => {
        fetch(`/api/blogs/${id}`)
            .then(res => res.json())
            .then(data => setFormData(data))
            .catch(err => console.error('Error fetching blog:', err));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/admin/blog');
            } else {
                alert('Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post', error);
        }
    };

    return (
        <div className="add-blog">
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Post Title</label>
                    <input name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. Top 10 Gadgets" />
                </div>

                <div className="form-group">
                    <label>Featured Image</label>
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
                    {formData.image && <img src={formData.image} alt="Preview" style={{ height: '50px', marginTop: '10px', borderRadius: '4px' }} />}
                </div>

                <div className="form-group">
                    <label>Post Images Gallery (Add up to 5 more images)</label>
                    <div className="image-grid">
                        {(formData.images || []).map((img, index) => (
                            <div key={index} className="image-item">
                                <img src={img} alt={`Slide ${index + 1}`} />
                                <button type="button" onClick={() => {
                                    const newImgs = [...(formData.images || [])];
                                    newImgs.splice(index, 1);
                                    setFormData({ ...formData, images: newImgs });
                                }} className="remove-img">×</button>
                            </div>
                        ))}
                        {(formData.images || []).length < 5 && (
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
                                                    setFormData(prev => ({ ...prev, images: [...(prev.images || []), result.url] }));
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
                    <input name="video" value={formData.video || ''} onChange={handleChange} placeholder="https://..." />
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Category</label>
                        <input name="category" required value={formData.category} onChange={handleChange} placeholder="Guide" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Excerpt / Short Description</label>
                    <textarea name="excerpt" required value={formData.excerpt} onChange={handleChange} rows={4} placeholder="Brief summary..." />
                </div>

                <button type="submit" className="submit-btn">Update Post</button>
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
                    border: 1px solid #ddd;
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
                    border: 2px dashed #ced4da;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    color: #6c757d;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .add-image-box:hover {
                    border-color: #2d5a43;
                    color: #2d5a43;
                }
                .add-image-box input {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    cursor: pointer;
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
