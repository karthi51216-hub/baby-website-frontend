import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const SUGGESTED = [
  { id: 1, name: 'Babyhug Sleeveless Kotta Printed Ethnic Dress With Floral & Embroidery - Orange', price: 890, age: '0-12m, 3-4y, 4-5', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&auto=format&fit=crop' },
  { id: 2, name: 'Babyhug Organic Cotton Knit Full Sleeves Sweater Sets with Cap', price: 930, age: '0-12m, 3-4y, 4-5', img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&auto=format&fit=crop' },
  { id: 3, name: 'Cotton Woven Full Sleeves Floral Printed Kurta & Pyjama Set - Red', price: 960, age: '0-12m, 3-4y, 4-5', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&auto=format&fit=crop' },
  { id: 4, name: 'Woven Half Puff Sleeves Ethnic Dress With Floral & Sequin Embroidery - Pink', price: 1699, age: '0-12m, 3-4y, 4-5', img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&auto=format&fit=crop' },
  { id: 5, name: 'Organic Cotton Onesie Set', price: 699, age: '0-6m', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&auto=format&fit=crop' },
];

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useAuth();
  const navigate = useNavigate();
  const [sugIdx, setSugIdx] = useState(0);

  const imgSrc = (item) => item.image || `https://via.placeholder.com/80x80/FFB6C1/5C3D2E?text=${encodeURIComponent(item.name)}`;

  return (
    <div className="cart-page">
      <div className="container">

        {/* Breadcrumb */}
        <p className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / Cart
        </p>

        <h2 className="cart-heading">Cart</h2>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>🛒 Your cart is empty!</p>
            <Link to="/products" className="continue-btn">Start Shopping</Link>
          </div>
        ) : (
          <>
            {/* Cart Table */}
            <div className="cart-table-wrap">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Age</th>
                    <th>Price</th>
                    <th>Remove</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="cart-item-name">
                          <img src={imgSrc(item)} alt={item.name} />
                          <div>
                            <p>{item.name}</p>
                            <p className="cart-item-color">Color: ⚪ 🔵</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <select
                          value={item.quantity}
                          onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                          className="qty-select"
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(n => (
                            <option key={n} value={n}>{n} ▾</option>
                          ))}
                        </select>
                      </td>
                      <td className="cart-age">0-12M</td>
                      <td className="cart-price">{item.price}</td>
                      <td>
                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                      <td>
                        <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                          Checkout
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* You might also like */}
            <div className="suggested-section">
              <h3>You might also like</h3>
              <div className="sug-slider-wrap">
                <button className="sug-arrow left" onClick={() => setSugIdx(i => Math.max(0, i - 1))}>
                  <ChevronLeft size={18} />
                </button>
                <div className="sug-viewport">
                  <div className="sug-track" style={{ transform: `translateX(-${sugIdx * 25}%)` }}>
                    {SUGGESTED.map((p, i) => (
                      <div key={i} className="sug-card">
                        <div className="sug-img">
                          <img src={p.img} alt={p.name} />
                          <button className="wish-btn">♡</button>
                        </div>
                        <div className="sug-info">
                          <p className="sug-name">{p.name}</p>
                          <p className="sug-price">Price : ₹ {p.price}</p>
                          <p className="sug-age">Age: {p.age}</p>
                          <p className="sug-color">Color: ⚪ 🔵 🔴</p>
                          <div className="sug-btns">
                            <button className="buy-now-btn">Buy Now</button>
                            <button className="add-cart-btn2" onClick={() => {}}>Add to cart</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="sug-arrow right" onClick={() => setSugIdx(i => Math.min(SUGGESTED.length - 4, i + 1))}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Continue shopping */}
            <div className="continue-wrap">
              <Link to="/products" className="continue-btn">Continue shopping</Link>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:'4px',marginBottom:'12px'}}>
              <img src={require('../assets/IMG_20250821_174843_910-removebg-preview.png')} alt="baby" style={{width:80,height:80,objectFit:'contain'}} />
              <img src={require('../assets/IMG_20250821_174843_910-removebg-preview (1).png')} alt="BabyBliss" style={{width:100,objectFit:'contain',marginTop:'-8px'}} />
            </div>
            <p>4th street, pallavaram,<br />Near bus stand<br />Madurai-234567</p>
          </div>
          <div><h3>Top categories</h3><Link to="/products?category=Clothing">Baby Fashion</Link><Link to="/products?category=Toys">Toys</Link><Link to="/products?category=Gear">Footwear & Accessories</Link><Link to="/products?category=Feeding">Moms & Baby care</Link><Link to="/products?category=Safety">Furniture & Bedding</Link><Link to="/products?category=Rental">Rental services</Link></div>
          <div><h3>Customer support</h3><a href="#">Help & contact us</a><a href="#">Delivery information</a><a href="#">Track your order</a><a href="#">Returns & exchange</a><a href="#">Promotion Terms & conditions</a><a href="#">Terms & conditions</a></div>
          <div><h3>Useful Links</h3><a href="#">Store finder</a><a href="#">Sitemap</a><a href="#">Fees and payments policy</a></div>
          <div><h3>About BabyZone</h3><a href="#">Privacy Policy</a><a href="#">Terms & conditions</a></div>
          <div>
            <h3>Social Media</h3>
            <div className="social-icons">
              <a href="#" style={{background:'#1877F2',color:'white',width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:16}}>f</a>
              <a href="#" style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743)',color:'white',width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>📷</a>
              <a href="#" style={{background:'#1DA1F2',color:'white',width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>🐦</a>
              <a href="#" style={{background:'#FF0000',color:'white',width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>▶</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
