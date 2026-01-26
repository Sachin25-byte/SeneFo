'use client';

import Link from 'next/link';

interface ProductProps {
  image: string;
  title: string;
  link?: string;
  originalPrice?: string;
  discountedPrice?: string;
  rating?: number;
  reviewsCount?: number;
  discount?: string;
}

export default function DealProductCard({
  image,
  title,
  link = '#',
  discountedPrice,
}: ProductProps) {
  return (
    <div className="product-card">
      <Link href={link} className="card-link" target="_blank" rel="nofollow sponsored noopener noreferrer">
        <div className="image-wrapper">
          <img src={image} alt={title} className="product-image" />
          <div className="wishlist-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <div className="hover-action-btn">
            View on Amazon
          </div>
        </div>

        <div className="content">
          <h3 className="product-name">{title}</h3>
          <div className="price-section">
            <p className="cta-text">Check Price on Amazon</p>
            <p className="price-disclaimer">Prices may change. See latest price on Amazon.</p>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .product-card {
          background: #FFFFFF;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          transition: transform var(--transition-smooth), box-shadow var(--transition-smooth);
          height: 100%;
          border: 1px solid #f0f0f0;
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        
        .card-link {
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 350px;
          background: #fff;
          overflow: hidden;
        }

        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 2rem;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover .product-image {
          transform: scale(1.1);
        }

        .wishlist-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 2;
          color: var(--text-dim);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(4px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          opacity: 0;
          transform: translateY(-10px);
        }

        .product-card:hover .wishlist-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .wishlist-btn:hover {
          color: var(--accent-red);
          background: #fff;
        }

        .hover-action-btn {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          z-index: 3;
          background: var(--amazon-orange);
          color: #FFFFFF;
          padding: 1rem 2rem;
          border-radius: var(--border-radius-md);
          font-weight: 700;
          font-size: 1rem;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(255, 153, 0, 0.3);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .product-card:hover .hover-action-btn {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .hover-action-btn:hover {
          background: var(--amazon-orange-hover);
          box-shadow: 0 6px 16px rgba(255, 153, 0, 0.4);
        }

        .content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .product-name {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.3;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.6em;
        }

        .price-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .cta-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--amazon-orange);
          margin: 0;
        }

        .price-disclaimer {
          font-size: 0.85rem;
          color: var(--text-dim);
          margin: 0;
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
}
