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
                .table-container {
                    overflow-x: auto;
                    width: 100%;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                }
                .products-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 600px; /* Desktop min-width */
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
                .product-thumb {
                    width: 50px;
                    height: 50px;
                    object-fit: contain;
                }
                .actions {
                    white-space: nowrap;
                    display: flex;
                    gap: 8px;
                }
                
                @media (max-width: 768px) {
                    .products-table {
                        min-width: 100%; /* Reset min-width */
                    }
                    .products-table thead {
                        display: none; /* Hide headers */
                    }
                    .products-table tr {
                        display: block;
                        background: white;
                        margin-bottom: 1rem;
                        border: 1px solid #eee;
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.02);
                    }
                    .products-table td {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0.8rem 1rem;
                        border-bottom: 1px solid #f0f0f0;
                        text-align: right;
                    }
                    .products-table td:last-child {
                        border-bottom: none;
                    }
                    .products-table td::before {
                        content: attr(data-label);
                        font-weight: 600;
                        color: #666;
                        margin-right: 1rem;
                    }
                    .actions {
                        justify-content: flex-end;
                        width: 100%;
                    }
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
            `}</style>
        </div>
    );
}
