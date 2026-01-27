'use client';

import { useState, useEffect } from 'react';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        fetch('/api/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error('Error fetching reviews:', err));
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchReviews();
            } else {
                alert('Failed to delete review');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className="admin-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h1 className="page-title" style={{ marginBottom: 0 }}>Manage Reviews</h1>
                <button className="add-btn" onClick={() => window.location.href = '/admin/reviews/add'}>+ New Review</button>
            </div>
            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Rating</th>
                            <th>Comments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review: any) => (
                            <tr key={review.id}>
                                <td data-label="Title">{review.title}</td>
                                <td data-label="Rating">{review.rating} ⭐</td>
                                <td data-label="Comments">{review.totalComments}</td>
                                <td data-label="Actions">
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="edit-btn" onClick={() => window.location.href = `/admin/reviews/edit/${review.id}`}>Edit</button>
                                        <button className="del-btn" onClick={() => handleDelete(review.id)}>Delete</button>
                                    </div>
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
                .add-btn {
                    background: var(--accent-blue);
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: var(--border-radius-md);
                    cursor: pointer;
                    font-weight: 700;
                    box-shadow: 0 4px 12px rgba(19, 114, 154, 0.2);
                    transition: all var(--transition-fast);
                }
                .add-btn:hover {
                    background: var(--accent-blue-hover);
                    transform: translateY(-2px);
                }
                .edit-btn {
                    background: #e0f2fe;
                    color: #0369a1;
                    border: none;
                    padding: 8px 16px;
                    border-radius: var(--border-radius-sm);
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.85rem;
                    transition: all var(--transition-fast);
                }
                .edit-btn:hover {
                    background: #bae6fd;
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
