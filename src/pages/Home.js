import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
// import ProductCard from '../components/ProductCard';
import api from '../services/api';
import './Home.css';
// New Arrival Images
import new1 from '../assets/new1.webp';
import new2 from '../assets/new2.webp';
import new3 from '../assets/new3.webp';
import new4 from '../assets/new4.webp';
import new5 from '../assets/new5.webp';
import new6 from '../assets/new6.webp';
import new7 from '../assets/new7.jpg';
import new8 from '../assets/new8.webp';

// Top Selling Images

import top1 from '../assets/top1.webp';
import top2 from '../assets/top2.webp';
import top3 from '../assets/top3.webp';
import top4 from '../assets/top4.webp';
import top5 from '../assets/top5.webp';
import top6 from '../assets/top6.webp';




const NEW_IMAGES = [new1, new2, new3, new4, new5, new6, new7, new8];
const TOP_IMAGES = [top1, top2, top3, top4, top5, top6,];
// ── Hero Slides ──
const HERO_SLIDES = [
  {
    badge: 'Flat 30% off',
    title: 'Baby beds &',
    subtitle: 'Accessories',
    btn: 'Shop Now',
    link: '/products?category=Newborn',
    bg: 'linear-gradient(135deg, #ffe0f0 0%, #ffd6e8 100%)',
    // உன் image: img: require('../assets/hero1.jpg')
    img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop',
  },
  {
    badge: 'New Launch',
    title: 'Strollers &',
    subtitle: 'Car Seats',
    btn: 'Shop Now',
    link: '/products?category=Gear',
    bg: 'linear-gradient(135deg, #fff3cd 0%, #ffe8a0 100%)',
    // உன் image: img: require('../assets/hero2.jpg')
    img: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&auto=format&fit=crop',
  },
];

// ── Categories ──
// உன் images: img: require('../assets/boys.jpg') etc.
const CATEGORIES = [
  { name: 'Boys fashion',  img: require('../assets/IMG_20250824_195106_608.jpg') , link: '/products?category=Baby Fashion ' },
  { name: 'Girls fashion', img: require('../assets/IMG_20250824_195115_947.jpg'), link: '/products?category=Baby Fashion' },
  { name: 'Footwear',      img: require('../assets/20682525a.webp'), link: '/products?category=footwear' },
  { name: 'Accessories',   img: require('../assets/IMG_20250824_195157_036.jpg'), link: '/products?category=Footwear' },
  { name: 'Toys',          img: require('../assets/IMG_20250824_195229_011.jpg'), link: '/products?category=Toys' },
  { name: 'Beds',          img: require('../assets/IMG_20250824_195307_666.jpg'), link: '/products?category=Beds' },
];

// ── Brands ──
const BRANDS = [
  { name: "Johnson's baby", color: '#e8f4fd', text: '#1565C0' },
  { name: 'Pampers',        color: '#e3f2fd', text: '#0277BD' },
  { name: 'Babyking',       color: '#fce4ec', text: '#C62828' },
  { name: 'KIDLON',         color: '#f3e5f5', text: '#6A1B9A' },
  { name: "Tang's",         color: '#fff8e1', text: '#F57F17' },
  { name: 'Mamaearth',      color: '#e8f5e9', text: '#2E7D32' },
  { name: 'Himalaya',       color: '#e0f2f1', text: '#00695C' },
  { name: 'Babyhug',        color: '#fff3e0', text: '#E65100' },
];

// ── Testimonials ──
const TESTIMONIALS = [
  { name: 'Bosky', img: require('../assets/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'), rating: 5, text: 'Very fast service and products are genuine..Definitely I am satisfied!', likes: 5, dislikes: 0 },
  { name: 'Tulip', img: require('../assets/4e22beef6d94640c45a1b15f4a158b23.jpg') , rating: 5, text: 'Amazing products. Reasonable prices. Gr8 customer service. Cheers !!!!!!', likes: 5, dislikes: 0 },
  { name: 'Deepa',  img: require('../assets/beautiful-woman-avatar-character-icon-free-vector.jpg'), rating: 5, text: 'Great range of products right from new-born essentials … Excellent product quality and delivery', likes: 5, dislikes: 0 },
  { name: 'Moshin', img: require('../assets/thumb-1920-375571.png'), rating: 5, text: 'Great site for baby product, i m shopping here since 2012. The quality of product and services is never changed. Keep it up', likes: 5, dislikes: 0 },
];

export default function Home() {
  const [slide, setSlide]       = useState(0);
  const [newArr, setNewArr]     = useState([]);
  const [topSell, setTopSell]   = useState([]);
  const [topIdx, setTopIdx]     = useState(0);
  const VISIBLE = 4;

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
     api.get('/products/?ordering=-created_at&limit=8').then(r => setNewArr(r.data.results || r.data)).catch(() => {});
     api.get('/products/?ordering=-reviews_count&limit=8').then(r => setTopSell(r.data.results || r.data)).catch(() => {});
   }, []);




  const cur = HERO_SLIDES[slide];

  return (
    <div className="home">

      {/* ── Hero Slider ── */}
      <section className="hero-slider" style={{ background: cur.bg }}>
        {HERO_SLIDES.map((s, i) => (
          <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
            <div className="container hero-slide-inner">
              <div className="hero-text">
                {s.badge && <div className="hero-badge">{s.badge}</div>}
                <h1>{s.title}<br /><span>{s.subtitle}</span></h1>
                <Link to={s.link} className="hero-btn">{s.btn}</Link>
              </div>
              <div className="hero-img-wrap">
                <img src={s.img} alt={s.title} />
              </div>
            </div>
          </div>
        ))}
        <button className="slide-arrow left" onClick={() => setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}><ChevronLeft size={22} /></button>
        <button className="slide-arrow right" onClick={() => setSlide(s => (s + 1) % HERO_SLIDES.length)}><ChevronRight size={22} /></button>
        <div className="slide-dots">
          {HERO_SLIDES.map((_, i) => <button key={i} className={`dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />)}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center'}}>Categories</h2>
       
           <div className="cat-grid">
            {CATEGORIES.map(cat => (
              <Link to={cat.link} key={cat.name} className="cat-card">
                <div className="cat-img-oval">
                  <img src={cat.img} alt={cat.name} />
                </div>
                <p>{cat.name}</p>
              </Link>
            ))}
          </div>
          <div className="cat-divider" />
        </div> 
      </section>

      {/* ── New Arrivals ── */}
<section className="section">
  <div className="container">
    <h2 className="section-title">New Arrivals</h2>

    <div className="products-grid">
      {newArr.length ? (
        newArr.map((p, index) => (
          <NewArrivalCard
            key={p.id}
            product={p}
            customImg={NEW_IMAGES[index % NEW_IMAGES.length]}
          />
        ))
      ) : (
        Array(8)
          .fill(0)
          .map((_, i) => <div key={i} className="skeleton-card" />)
      )}
    </div>

  </div>
</section>

      {/* ── Top Selling slider ── */}
      <section className="section bg-pink-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Top selling</h2>
            <Link to="/products?ordering=-reviews_count" className="view-all-btn">View All →</Link>
          </div>
          <div className="slider-wrap">
            {topIdx > 0 && <button className="slider-arrow left" onClick={() => setTopIdx(i => Math.max(0, i - 1))}><ChevronLeft size={20} /></button>}
            <div className="slider-viewport">
              <div className="slider-track" style={{ transform: `translateX(-${topIdx * 25}%)` }}>
                {topSell.map((p, index) => (
                  <div key={p.id} className="slider-item">
                    <div className="top-sell-card">
                      <div className="ts-img">
                        <img src={TOP_IMAGES[index % TOP_IMAGES.length] || p.image} />
                      </div>
                      <h3>{p.name}</h3>
                      <Link to={`/products/${p.id}`} className="shop-now-btn">Shop Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {topSell.length > VISIBLE && topIdx < topSell.length - VISIBLE && (
              <button className="slider-arrow right" onClick={() => setTopIdx(i => i + 1)}><ChevronRight size={20} /></button>
            )}
          </div>
        </div>
      </section>

      {/* ── Top Brands ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Top Brands</h2>
          <div className="brands-track-wrap">
            <div className="brands-track">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <div key={i} className="brand-card" style={{ background: b.color }}>
                  <span style={{ color: b.text, fontWeight: 700, fontSize: 15 }}>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Happy Customers ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center'}}>Our happy customer</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                {/* <div className="t-avatar" style={{ background: t.color }}>
                  {t.name[0]}
                </div> */}
                <div className="t-avatar">
                 <img src={t.img} alt={t.name} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%'}} />
                 </div>
                <h3>{t.name}</h3>
                <div className="t-stars">
                  {Array(t.rating).fill(0).map((_, s) => <Star key={s} size={16} fill="#FFB300" color="#FFB300" />)}
                </div>
                <p>{t.text}</p>
                <div className="t-actions">
                  <span><ThumbsDown size={14} /> {t.dislikes}</span>
                  <span><ThumbsUp size={14} /> {t.likes}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <button className="view-more-btn">View More</button>
          </div>
        </div>
      </section>

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
    </div>
  );
}

// New Arrival Card Component

function NewArrivalCard({ product, customImg }) {
  const imgSrc = customImg || product.image || `https://via.placeholder.com/300`;

  return (
    <Link to={`/products/${product.id}`} className="na-card">
      <div className="na-img">
        <img src={imgSrc} alt={product.name} />
      </div>
      <div className="na-info">
        <h3>{product.name}</h3>
        <p>MRP: ₹ {product.price}</p>
        <button className="buy-btn">Buy</button>
      </div>
    </Link>
  );
}

