import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-img-wrap">
        <img
         src={product.image || `https://via.placeholder.com/300?text=${product.name}`}
          alt={product.name}
        />
        <button className="wishlist-btn"><Heart size={16} /></button>
        {product.is_new && <span className="badge-new">New</span>}
        {product.discount_percent > 0 && (
          <span className="badge-sale">-{product.discount_percent}%</span>
        )}
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <Star size={13} fill="#FFB300" color="#FFB300" />
          <span>{product.rating || '4.5'}</span>
          <span className="review-count">({product.reviews_count || 0})</span>
        </div>
        <div className="product-footer">
          <div className="product-price">
            <span className="price">₹{product.price}</span>
            {product.original_price && (
              <span className="original-price">₹{product.original_price}</span>
            )}
          </div>
          <button className="add-cart-btn" onClick={handleAddToCart}>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}
