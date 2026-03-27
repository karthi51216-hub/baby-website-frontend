

import React from 'react';
import { Link } from 'react-router-dom'; // ✅ இது MUST


   {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:'4px',marginBottom:'12px'}}>
              <img src={require('../assets/IMG_20250821_174843_910-removebg-preview.png')} alt="baby" style={{width:80,height:80,objectFit:'contain'}} />
              {/* <img src={require('../assets/IMG_20250821_174843_910-removebg-preview (1).png')} alt="BabyBliss" style={{width:100,objectFit:'contain',marginTop:'-8px'}} /> */}
            </div>
            <p>4th street, pallavaram,<br />Near bus stand<br />Madurai-234567</p>
          </div>
          <div><h3>Top categories</h3><Link to="/products?category=Baby Fashion">Baby Fashion</Link><Link to="/products?category=Toys">Toys</Link><Link to="/products?category=Footwear">Footwear & Accessories</Link><Link to="/products?category=Feeding">Moms & Baby care</Link><Link to="/products?category=Beds">Furniture & Bedding</Link><Link to="/products?category=Rider">Rental services</Link></div>
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

