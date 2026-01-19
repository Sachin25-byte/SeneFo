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
            <div className="card-inner">
                {/* Top: Image Section */}
                <div className="image-section">
                    <img src={image} alt={title} />
                    {discount && <div className="discount-badge">{discount}</div>}
                </div>

                {/* Bottom: Details Section */}
                <div className="details-section">
                    <h3 className="title">{title}</h3>

                    <div className="rating-block">
                        <span className="stars">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(rating) ? "star filled" : "star"}>{i < Math.floor(rating) ? '★' : '☆'}</span>
                            ))}
                        </span>
                        <span className="count">({reviewsCount})</span>
                    </div>

                    <div className="price-block">
                        <span className="current-price">₹{discountedPrice}</span>
                        <span className="mrp">M.R.P: <span className="strike">₹{originalPrice}</span></span>
                    </div>

                    <button className="add-to-cart-btn">
                        Add to cart
                    </button>
                </div>
            </div>

            <style jsx>{`
        .product-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          transition: box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .product-card:hover {
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .card-inner {
            padding: 10px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .image-section {
            position: relative;
            background: #f7f7f7;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
        }
        .image-section img {
            max-width: 100%;
            max-height: 180px;
            object-fit: contain;
        }
        .discount-badge {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #CC0C39;
            color: white;
            padding: 2px 6px;
            font-size: 0.75rem;
            border-radius: 2px;
            font-weight: 700;
        }

        .details-section {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex-grow: 1;
        }

        .title {
            font-size: 1rem;
            font-weight: 500;
            color: #0F1111;
            line-height: 1.3;
            max-height: 2.6em; 
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical; 
        }

        .rating-block {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.85rem;
        }
        .stars {
            color: #FFA41C;
            letter-spacing: -1px;
        }
        .count {
            color: #007185;
        }

        .price-block {
            margin-top: auto; /* Push to bottom of details if needed */
        }
        .current-price {
            font-size: 1.2rem;
            font-weight: 500;
            color: #0F1111;
            margin-right: 6px;
        }
        .mrp {
            font-size: 0.85rem;
            color: #565959;
        }
        .strike {
            text-decoration: line-through;
        }

        .add-to-cart-btn {
            background: #FFD814;
            border: 1px solid #FCD200;
            border-radius: 20px;
            padding: 6px 12px;
            margin-top: 10px;
            cursor: pointer;
            font-size: 0.85rem;
            color: #0F1111;
            box-shadow: 0 2px 5px rgba(213,217,217,0.5);
            transition: background 0.2s;
            width: fit-content;
        }
        .add-to-cart-btn:hover {
            background: #F7CA00;
        }
      `}</style>
        </div>
    );
}
