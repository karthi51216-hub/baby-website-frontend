import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ChevronLeft, Plus, Minus, Truck, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import toast from 'react-hot-toast';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useAuth();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    api.get(`/products/${id}/`).then(r => {
      setProduct(r.data);
      api.get(`/products/?category=${r.data.category}&limit=4`).then(r2 => {
        setRelated((r2.data.results || r2.data).filter(p => p.id !== parseInt(id)));
      });
    });
  }, [id]);

  if (!product) return <div className="loading-page">Loading...</div>;

  const images = product.images?.length ? product.images : [product.image || `https://via.placeholder.com/500x500/FFB6C1/5C3D2E?text=${product.name}`];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to="/products" className="back-link"><ChevronLeft size={18} /> Back to Products</Link>

        <div className="detail-grid">
          {/* Images */}
          <div className="detail-images">
            <div className="main-image">
              <img src={images[activeImg]} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="image-thumbnails">
                {images.map((img, i) => (
                  <img key={i} src={img} alt="" className={activeImg === i ? 'active' : ''} onClick={() => setActiveImg(i)} />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-rating">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={16} fill={s <= Math.round(product.rating || 4.5) ? '#FFB300' : 'none'} color="#FFB300" />
              ))}
              <span>{product.rating || '4.5'}</span>
              <span className="review-count">({product.reviews_count || 0} reviews)</span>
            </div>

            <div className="detail-price">
              <span className="big-price">₹{product.price}</span>
              {product.original_price && <span className="crossed">₹{product.original_price}</span>}
              {product.discount_percent > 0 && <span className="discount-tag">{product.discount_percent}% OFF</span>}
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="quantity-control">
              <label>Quantity</label>
              <div className="qty-btns">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn-primary add-btn" onClick={handleAddToCart}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button className="btn-outline wishlist"><Heart size={18} /></button>
            </div>

            <div className="detail-badges">
              <div className="d-badge"><Truck size={16} /> Free delivery on ₹499+</div>
              <div className="d-badge"><Shield size={16} /> 100% Safe & Certified</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="detail-tabs">
          <div className="tab-nav">
            {['description', 'reviews', 'specs'].map(t => (
              <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {activeTab === 'description' && <p>{product.description}</p>}
            {activeTab === 'reviews' && <p>No reviews yet. Be the first to review!</p>}
            {activeTab === 'specs' && (
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specifications || { 'Material': 'Organic Cotton', 'Age': '0-12 months', 'Origin': 'India' }).map(([k, v]) => (
                    <tr key={k}><td>{k}</td><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="related-section">
            <h2 className="page-title">Related Products</h2>
            <div className="products-grid">
              {related.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
