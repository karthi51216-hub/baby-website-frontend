import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="container">

        {/* Breadcrumb */}
        <p className="breadcrumb">
          <Link to="/">Home</Link> / About
        </p>

        <h1 className="about-heading">About Us</h1>

        <div className="about-content">
          {/* Left text */}
          <div className="about-text">
            <div className="about-section">
              <h2>Our Mission</h2>
              <p>To empower parents by providing thoughtfully designed, safe, and sustainable baby essentials that make childcare easier and more enjoyable for every family. To be the go-to online store for parents seeking reliable, expertly curated baby products, ensuring peace of mind with every purchase. To offer innovative, high-quality baby gear and apparel that promote infant comfort, safety, and healthy development from day one.</p>
            </div>

            <div className="about-section">
              <h2>Our Vision</h2>
              <p>To create a world where every new parent has access to the best resources and products, fostering a generation of healthy, happy, and thriving children. To become the most beloved and trusted global community for parents, known for our commitment to quality, innovation, and family well-being. To revolutionize the way families shop for baby products, setting the standard for sustainability, transparency, and personalized support in the industry.</p>
            </div>
          </div>

          {/* Right image */}
          <div className="about-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&auto=format&fit=crop"
              alt="Happy baby"
            />
          </div>
        </div>

      
       {/* Map */}
<div className="about-map">
  <img
    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=900&auto=format&fit=crop"
    alt="Store Location"
    style={{ width: '100%', height: 350, objectFit: 'cover', borderRadius: 16 }}
  />
</div>

      </div>


{/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'4px', marginBottom:'12px'}}>
              <img src={require('../assets/IMG_20250821_174843_910-removebg-preview.png')} alt="baby" style={{width: 80, height: 80, objectFit:'contain'}} />
              <img src={require('../assets/IMG_20250821_174843_910-removebg-preview (1).png')} alt="BabyBliss" style={{width: 100, objectFit:'contain', marginTop:'-8px'}} />
            </div>
            <p>4th street, pallavaram,<br />Near bus stand<br />Madurai-234567</p>
          </div>
          <div>
            <h3>Top categories</h3>
            <Link to="/products?category=Clothing">Baby Fashion</Link>
            <Link to="/products?category=Toys">Toys</Link>
            <Link to="/products?category=Gear">Footwear & Accessories</Link>
            <Link to="/products?category=Feeding">Moms & Baby care</Link>
            <Link to="/products?category=Safety">Furniture & Bedding</Link>
            <Link to="/products?category=Rental">Rental services</Link>
          </div>
          <div>
            <h3>Customer support</h3>
            <a href="#">Help & contact us</a>
            <a href="#">Delivery information</a>
            <a href="#">Track your order</a>
            <a href="#">Returns & exchange</a>
            <a href="#">Promotion Terms & conditions</a>
            <a href="#">Terms & conditions</a>
          </div>
          <div>
            <h3>Useful Links</h3>
            <a href="#">Store finder</a>
            <a href="#">Sitemap</a>
            <a href="#">Fees and payments policy</a>
          </div>
          <div>
            <h3>About BabyZone</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & conditions</a>
          </div>
          <div>
            <h3>Social Media</h3>
            <div className="social-icons">
              <a href="#" className="social-btn fb" style={{background:'#1877F2',color:'white',width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:16}}>f</a>
              <a href="#" className="social-btn ig" style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',color:'white',width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>📷</a>
              <a href="#" className="social-btn tw" style={{background:'#1DA1F2',color:'white',width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>🐦</a>
           <a href="#" className="social-btn yt" style={{background:'#FF0000',color:'white',width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>▶</a>
            </div>
          </div>
        </div>
      </footer>





    </div>
  );
}
