'use client';

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
    originalPrice,
    discountedPrice,
    rating = 0,
    reviewsCount = 0,
    discount
}: ProductProps) {
    return (
        <div className="product-card">
            <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
                <div className="card-inner">
                    {/* Image Section */}
                    <div className="image-section">
                        <img src={image} alt={title} />
                        {discount && <div className="discount-badge">{discount}</div>}
                    </div>

                    {/* Details Section */}
                    <div className="details-section">
                        <h3 className="title">{title}</h3>

                        <div className="rating-block">
                            <span className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < Math.floor(rating) ? "star filled" : "star"}>
                                        {i < Math.floor(rating) ? '★' : '☆'}
                                    </span>
                                ))}
                            </span>
                            <span className="count">({reviewsCount})</span>
                        </div>

                        <div className="price-block">
                            <span className="current-price">₹{discountedPrice}</span>
                            <span className="mrp">M.R.P: <span className="strike">₹{originalPrice}</span></span>
                        </div>

                        <button className="amazon-btn">
                            🛒 Check Price on Amazon
                        </button>
                    </div>
                </div>
            </a>

            <style jsx>{`
        .product-card {
          background: var(--card-gradient);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          transition: all var(--transition-smooth);
          height: 100%;
          position: relative;
        }
        
        .product-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--gold-gradient);
          opacity: 0;
          transition: opacity var(--transition-smooth);
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
          border-color: var(--royal-gold);
        }
        
        .product-card:hover::before {
          opacity: 1;
        }
        
        .card-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-inner {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .image-section {
          position: relative;
          background: rgba(26, 26, 26, 0.5);
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: var(--border-radius-md);
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          overflow: hidden;
        }
        
        .image-section img {
          max-width: 100%;
          max-height: 180px;
          object-fit: contain;
          transition: transform var(--transition-smooth);
        }
        
        .product-card:hover .image-section img {
          transform: scale(1.05);
        }
        
        .discount-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: var(--gold-gradient);
          color: var(--midnight-black);
          padding: 0.4rem 0.8rem;
          font-size: 0.85rem;
          border-radius: var(--border-radius-sm);
          font-weight: 700;
          box-shadow: var(--gold-shadow);
        }

        .details-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex-grow: 1;
        }

        .title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--soft-white);
          line-height: 1.4;
          max-height: 2.8em;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .rating-block {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .stars {
          color: var(--royal-gold);
          letter-spacing: -1px;
          font-size: 1rem;
        }
        
        .count {
          color: var(--medium-gray);
          font-size: 0.85rem;
        }

        .price-block {
          margin-top: auto;
          padding-top: 0.5rem;
        }
        
        .current-price {
          font-size: 1.4rem;
          font-weight: 700;
          background: var(--gold-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-right: 0.5rem;
        }
        
        .mrp {
          font-size: 0.85rem;
          color: var(--medium-gray);
        }
        
        .strike {
          text-decoration: line-through;
          opacity: 0.7;
        }

        .amazon-btn {
          background: var(--amazon-orange);
          border: none;
          border-radius: var(--border-radius-md);
          padding: 0.75rem 1.25rem;
          margin-top: 1rem;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--midnight-black);
          box-shadow: 0 4px 12px var(--amazon-orange-glow);
          transition: all var(--transition-smooth);
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .amazon-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        
        .amazon-btn:hover {
          background: var(--amazon-orange-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 153, 0, 0.4);
        }
        
        .amazon-btn:hover::before {
          left: 100%;
        }
      `}</style>
        </div>
    );
}
