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
            <h1 className="page-title">Manage Reviews</h1>
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
                                    <button className="del-btn" onClick={() => handleDelete(review.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style jsx>{`
                .page-title { margin-bottom: 2rem; color: #1a4231; }
                .admin-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; min-width: 600px; }
                th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
                th { background: #f8fafc; font-weight: 600; }
                .del-btn { background: #fee2e2; color: #dc2626; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; }

                @media (max-width: 768px) {
                    .admin-table { min-width: 100%; }
                    .admin-table thead { display: none; }
                    .admin-table tr {
                        display: block;
                        background: white;
                        margin-bottom: 1rem;
                        border: 1px solid #eee;
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.02);
                    }
                    .admin-table td {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0.8rem 1rem;
                        border-bottom: 1px solid #f0f0f0;
                        text-align: right;
                    }
                    .admin-table td::before {
                        content: attr(data-label);
                        font-weight: 600;
                        color: #666;
                        margin-right: 1rem;
                    }
                    .admin-table td:last-child { border-bottom: none; }
                }
            `}</style>
        </div>
    );
}
