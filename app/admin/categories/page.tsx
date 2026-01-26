'use client';

import { useState, useEffect } from 'react';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error('Error fetching categories:', err));
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
            <h1 className="page-title">Manage Categories</h1>
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
                                <td data-label="Name">{cat.name}</td>
                                <td data-label="Link">{cat.link}</td>
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
                .page-title {
                    font-family: var(--font-heading);
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: var(--text-main);
                    margin-bottom: 2.5rem;
                    letter-spacing: -0.02em;
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
                    min-width: 600px;
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
                    letter-spacing: 0.05em;
                }
                .thumb {
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                    border-radius: var(--border-radius-md);
                    background: var(--bg-tertiary);
                    padding: 4px;
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
                    font-size: 0.85rem;
                }
                .del-btn:hover {
                    background: #dc2626;
                    color: white;
                    transform: translateY(-1px);
                }
                
                @media (max-width: 768px) {
                    .admin-table { min-width: 100%; }
                    .admin-table thead { display: none; }
                    .admin-table tr {
                        display: block;
                        background: white;
                        margin-bottom: 1.5rem;
                        border: 1px solid var(--bg-tertiary);
                        border-radius: var(--border-radius-lg);
                        padding: 1rem;
                    }
                    .admin-table td {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0.75rem 0;
                        border-bottom: 1px solid var(--bg-tertiary);
                        text-align: right;
                    }
                    .admin-table td::before {
                        content: attr(data-label);
                        font-weight: 700;
                        color: var(--text-muted);
                    }
                    .admin-table td:last-child { border-bottom: none; padding-top: 1rem; }
                }
            `}</style>
        </div>
    );
}
