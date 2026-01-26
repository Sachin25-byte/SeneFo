'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        console.log('Attempting to delete blog post with ID:', id);
        if (!confirm('Are you sure you want to delete this post?')) {
            console.log('Delete canceled by user');
            return;
        }

        try {
            const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            console.log('Delete response status:', res.status);
            if (res.ok) {
                console.log('Blog post deleted successfully');
                fetchBlogs(); // Refresh list
            } else {
                const errorData = await res.json();
                console.error('Failed to delete post:', errorData);
                alert('Failed to delete post: ' + (errorData.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('An error occurred while deleting the post.');
        }
    };

    return (
        <div className="blog-manager">
            <div className="header">
                <h1>Manage Blog Posts</h1>
                <Link href="/admin/blog/add" className="add-btn">
                    + Write New Post
                </Link>
            </div>

            {loading ? (
                <p>Loading posts...</p>
            ) : (
                <div className="table-container">
                    <table className="blog-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((post: any) => (
                                <tr key={post.id}>
                                    <td data-label="Image">
                                        <img src={post.image} alt={post.title} className="post-thumb" />
                                    </td>
                                    <td data-label="Title">{post.title}</td>
                                    <td data-label="Date">{post.date}</td>
                                    <td data-label="Category">
                                        <span className="category-badge">{post.category}</span>
                                    </td>
                                    <td className="actions" data-label="Actions">
                                        <Link href={`/admin/blog/edit/${post.id}`} className="edit-btn">Edit</Link>
                                        <button className="del-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
                .blog-manager {
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
                .header h1 {
                    font-family: var(--font-heading);
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: var(--text-main);
                }
                .add-btn {
                    background: var(--accent-blue);
                    color: white;
                    padding: 12px 24px;
                    border-radius: var(--border-radius-md);
                    text-decoration: none;
                    font-weight: 700;
                    box-shadow: 0 4px 12px rgba(19, 114, 154, 0.2);
                    transition: all var(--transition-fast);
                }
                .add-btn:hover {
                    background: var(--accent-blue-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(19, 114, 154, 0.3);
                }
                .table-container {
                    overflow-x: auto;
                    width: 100%;
                    background: white;
                    border-radius: var(--border-radius-xl);
                    box-shadow: var(--shadow-md);
                    border: 1px solid var(--bg-tertiary);
                }
                .blog-table {
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

                @media (max-width: 768px) {
                    .header {
                        flex-direction: column;
                        gap: 1.5rem;
                        align-items: flex-start;
                    }
                    .blog-table { min-width: 100%; }
                    .blog-table thead { display: none; }
                    .blog-table tr {
                        display: block;
                        background: white;
                        margin-bottom: 1.5rem;
                        border: 1px solid var(--bg-tertiary);
                        border-radius: var(--border-radius-lg);
                        padding: 1rem;
                    }
                    .blog-table td {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0.75rem 0;
                        border-bottom: 1px solid var(--bg-tertiary);
                        text-align: right;
                    }
                    .blog-table td::before {
                        content: attr(data-label);
                        font-weight: 700;
                        color: var(--text-muted);
                    }
                    .blog-table td:last-child { border-bottom: none; padding-top: 1rem; }
                    .actions {
                        justify-content: center;
                        width: 100%;
                    }
                }
                .post-thumb {
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                    border-radius: var(--border-radius-md);
                    background: var(--bg-tertiary);
                    padding: 4px;
                }
                .actions {
                    white-space: nowrap;
                    display: flex;
                    gap: 12px;
                }
                .edit-btn, .del-btn {
                    padding: 8px 20px;
                    border: none;
                    border-radius: var(--border-radius-md);
                    cursor: pointer;
                    font-weight: 700;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    transition: all var(--transition-fast);
                }
                .edit-btn {
                    background: var(--accent-blue-light);
                    color: var(--accent-blue);
                }
                .edit-btn:hover {
                    background: var(--accent-blue);
                    color: white;
                }
                .del-btn {
                    background: #fee2e2;
                    color: #dc2626;
                }
                .del-btn:hover {
                    background: #dc2626;
                    color: white;
                }
                .category-badge {
                    background: var(--accent-blue-light);
                    color: var(--accent-blue);
                    padding: 4px 12px;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
            `}</style>
        </div>
    );
}
