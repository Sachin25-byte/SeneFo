'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchProducts(); // Refresh list
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    return (
        <div className="products-manager">
            <div className="header">
                <h1>Manage Products</h1>
                <Link href="/admin/products/add" className="add-btn">
                    + Add New Product
                </Link>
            </div>

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product: any) => (
                                <tr key={product.id}>
                                    <td data-label="Image">
                                        <img src={product.image} alt={product.title} className="product-thumb" />
                                    </td>
                                    <td data-label="Title">{product.title}</td>
                                    <td data-label="Price">
                                        {product.discountedPrice ? (
                                            `₹${product.discountedPrice}`
                                        ) : (
                                            `₹${product.originalPrice || '0'}`
                                        )}
                                    </td>
                                    <td className="actions" data-label="Actions">
                                        <Link href={`/admin/products/edit/${product.id}`} className="edit-btn">Edit</Link>
                                        <button className="del-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
                .products-manager {
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
                .products-table {
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
                .product-thumb {
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
                
                @media (max-width: 768px) {
                    .header {
                        flex-direction: column;
                        gap: 1.5rem;
                        align-items: flex-start;
                    }
                    .products-table {
                        min-width: 100%;
                    }
                    .products-table thead {
                        display: none;
                    }
                    .products-table tr {
                        display: block;
                        background: white;
                        margin-bottom: 1.5rem;
                        border: 1px solid var(--bg-tertiary);
                        border-radius: var(--border-radius-lg);
                        padding: 1rem;
                    }
                    .products-table td {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0.75rem 0;
                        border-bottom: 1px solid var(--bg-tertiary);
                        text-align: right;
                    }
                    .products-table td:last-child {
                        border-bottom: none;
                        padding-top: 1rem;
                    }
                    .products-table td::before {
                        content: attr(data-label);
                        font-weight: 700;
                        color: var(--text-muted);
                    }
                    .actions {
                        justify-content: center;
                        width: 100%;
                    }
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
            `}</style>
        </div>
    );
}
