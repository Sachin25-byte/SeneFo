'use client';

import { useState, useEffect } from 'react';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        images: [] as string[],
        video: '',
        link: ''
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error('Error fetching categories:', err));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Auto generate link if name is changed
            if (name === 'name') {
                newData.link = `/best_deals?tab=${encodeURIComponent(value)}`;
            }
            return newData;
        });
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchCategories();
                setShowAddForm(false);
                setFormData({ name: '', image: '', images: [], video: '', link: '' });
            } else {
                alert('Failed to add category');
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchCategories();
            } else {
                alert('Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="admin-page">
            <div className="header">
                <h1 className="page-title">Manage Categories</h1>
                <button
                    className="add-btn"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? '✕ Close Form' : '+ Add New Category'}
                </button>
            </div>

            {showAddForm && (
                <div className="add-category-form">
                    <form onSubmit={handleSubmit} className="form-container">
                        <h2>Add New Category</h2>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                required
                                onChange={handleChange}
                                placeholder="e.g. Smart Watches"
                            />
                        </div>

                        <div className="form-group">
                            <label>Featured Category Image</label>
                            <div className="upload-container">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                    className="file-input"
                                />
                            </div>
                            <input
                                name="image"
                                value={formData.image}
                                required
                                onChange={handleChange}
                                placeholder="Image URL or Upload File"
                                className="url-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Additional Category Images (3-5 for gallery)</label>
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
                            <label>Category Video URL</label>
                            <input name="video" value={formData.video || ''} onChange={handleChange} placeholder="https://..." />
                        </div>

                        <div className="form-group">
                            <label>Auto-generated Link</label>
                            <input
                                name="link"
                                value={formData.link}
                                required
                                onChange={handleChange}
                                placeholder="/best_deals?tab=..."
                            />
                            <small>This link is automatically generated based on the name.</small>
                        </div>

                        <button type="submit" className="submit-btn">Save Category</button>
                    </form>
                </div>
            )}

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat: any) => (
                            <tr key={cat.id}>
                                <td data-label="Image"><img src={cat.image} alt={cat.name} className="thumb" /></td>
                                <td data-label="Name" className="cat-name">{cat.name}</td>
                                <td data-label="Link" className="cat-link">{cat.link}</td>
                                <td data-label="Actions">
                                    <button className="del-btn" onClick={() => handleDelete(cat.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
                .admin-page {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2.5rem;
                }
                .page-title {
                    font-family: var(--font-heading);
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: var(--text-main);
                    margin-bottom: 0;
                    letter-spacing: -0.02em;
                }
                .add-btn {
                    background: var(--accent-blue);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: var(--border-radius-md);
                    font-weight: 700;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    box-shadow: 0 4px 12px rgba(19, 114, 154, 0.2);
                }
                .add-btn:hover {
                    background: var(--accent-blue-hover);
                    transform: translateY(-2px);
                }

                .add-category-form {
                    margin-bottom: 3rem;
                }
                .form-container {
                    background: white;
                    padding: 2.5rem;
                    border-radius: var(--border-radius-xl);
                    box-shadow: var(--shadow-lg);
                    border: 1px solid var(--bg-tertiary);
                    max-width: 600px;
                }
                .form-container h2 {
                    margin-bottom: 1.5rem;
                    font-size: 1.25rem;
                    font-weight: 700;
                }
                .form-group {
                    margin-bottom: 1.5rem;
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
                }
                input:focus {
                    outline: none;
                    border-color: var(--accent-blue);
                    background: white;
                }
                .upload-container {
                    background: var(--bg-tertiary);
                    padding: 10px;
                    border-radius: var(--border-radius-md);
                    margin-bottom: 10px;
                }
                .file-input {
                    font-size: 0.85rem;
                    border: none;
                    padding: 0;
                    background: transparent;
                }
                .url-input {
                    margin-top: 5px;
                }
                small {
                    color: var(--text-muted);
                    font-size: 0.8rem;
                    display: block;
                    margin-top: 5px;
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
                    transition: all var(--transition-fast);
                }
                .submit-btn:hover {
                    opacity: 0.9;
                    transform: scale(0.99);
                }

                .table-container {
                    background: white;
                    border-radius: var(--border-radius-xl);
                    box-shadow: var(--shadow-md);
                    border: 1px solid var(--bg-tertiary);
                    overflow: hidden;
                }
                .admin-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 1.25rem 1.5rem;
                    text-align: left;
                    border-bottom: 1px solid var(--bg-tertiary);
                }
                th {
                    background: var(--bg-secondary);
                    font-weight: 700;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                }
                .thumb {
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                    border-radius: var(--border-radius-md);
                    background: var(--bg-tertiary);
                    padding: 4px;
                }
                .cat-name {
                    font-weight: 700;
                    color: var(--text-main);
                }
                .cat-link {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    font-family: monospace;
                }
                .del-btn {
                    background: #fee2e2;
                    color: #dc2626;
                    border: none;
                    padding: 8px 16px;
                    border-radius: var(--border-radius-md);
                    cursor: pointer;
                    font-weight: 700;
                    transition: all var(--transition-fast);
                }
                .del-btn:hover {
                    background: #dc2626;
                    color: white;
                }
                
                @media (max-width: 768px) {
                    .header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }
                    .admin-table thead { display: none; }
                    .admin-table tr {
                        display: block;
                        margin-bottom: 1.5rem;
                        padding: 1rem;
                        border: 1px solid var(--bg-tertiary);
                    }
                    .admin-table td {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0.75rem 0;
                        border-bottom: 1px solid var(--bg-tertiary);
                    }
                    .admin-table td::before {
                        content: attr(data-label);
                        font-weight: 700;
                        color: var(--text-muted);
                    }
                    .admin-table td:last-child { border-bottom: none; }
                }
            `}</style>
        </div>
    );
}
