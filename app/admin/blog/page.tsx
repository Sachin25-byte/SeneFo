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
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                .add-btn {
                    background: #2d5a43;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                }
                .blog-table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    min-width: 600px;
                }
                th, td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid #f0f0f0;
                }
                th {
                    background: #f8fafc;
                    font-weight: 600;
                    color: #666;
                }

                @media (max-width: 768px) {
                    .blog-table { min-width: 100%; }
                    .blog-table thead { display: none; }
                    .blog-table tr {
                        display: block;
                        background: white;
                        margin-bottom: 1rem;
                        border: 1px solid #eee;
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.02);
                    }
                    .blog-table td {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0.8rem 1rem;
                        border-bottom: 1px solid #f0f0f0;
                        text-align: right;
                    }
                    .blog-table td::before {
                        content: attr(data-label);
                        font-weight: 600;
                        color: #666;
                        margin-right: 1rem;
                    }
                    .blog-table td:last-child { border-bottom: none; }
                    .actions {
                        justify-content: flex-end;
                        width: 100%;
                    }
                }
                .post-thumb {
                    width: 50px;
                    height: 50px;
                    object-fit: contain;
                    border-radius: 4px;
                }
                .actions {
                    white-space: nowrap;
                    display: flex;
                    gap: 8px;
                }
                .actions {
                    white-space: nowrap;
                    display: flex;
                    gap: 8px;
                }
                .edit-btn, .del-btn {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }
                .edit-btn {
                    background: #e0f2fe;
                    color: #0284c7;
                }
                .edit-btn:hover {
                    background: #bae6fd;
                }
                .del-btn {
                    background: #fee2e2;
                    color: #dc2626;
                }
                .del-btn:hover {
                    background: #fecaca;
                }
                .category-badge {
                    background: #f0f7f4;
                    color: #2d5a43;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.85em;
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
}
