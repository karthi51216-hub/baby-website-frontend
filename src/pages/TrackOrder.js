import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home, Truck, ThumbsUp } from 'lucide-react';
import './TrackOrder.css';

const STEPS = [
  { icon: <ShoppingCart size={22} />, label: 'Order Placed',        time: 'May 21,2025 | 03:45 pm', done: true },
  { icon: <Home size={22} />,         label: 'Order Dispatched',     time: 'May 22,2025 | 11:45 am', done: true },
  { icon: <Truck size={22} />,        label: 'Order in transit',     time: 'Reached at Tenkasi, Post office', done: true },
  { icon: <ThumbsUp size={22} />,     label: 'Delivered successfully', time: 'Not delivered yet',     done: false },
];

export default function TrackOrder() {
  return (
    <div className="track-page">
      <div className="container">
        <p className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/contact">Contact</Link> / Track order
        </p>

        <div className="track-card">
          <h2>Your Order</h2>

          {/* Order summary */}
         <div className="track-order-row">
  <img
    src={require('../assets/1318917a.jpg')}
    alt="product"
  />
            <div className="track-order-info">
              <p className="track-order-id">Order no #2345CD6789072 &nbsp;&nbsp; Cash on Delivery ₹ 3,850</p>
              <p className="track-order-name">Luv Lap LuvLap Galaxy Baby Stroller for 03 Years, 5-Point Safety Harness</p>
              <p className="track-order-date">Exp. Delivery by Sun, Aug 31</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="track-timeline">
            {STEPS.map((step, i) => (
              <div key={i} className={`track-step ${step.done ? 'done' : 'pending'}`}>
                <div className="track-step-left">
                  <div className="track-icon">{step.icon}</div>
                  {i < STEPS.length - 1 && <div className="track-line" />}
                </div>
                <div className="track-step-text">
                  <p className="track-step-label">{step.label}</p>
                  <p className="track-step-time">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
