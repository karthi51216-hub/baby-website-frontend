import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './ParentingClasses.css';

const ONLINE_CLASSES = [
  { name: 'Parenting techniques', starts: '30/08/2025', days: '10 Days', img: require('../assets/parenting tech.jpg') },
  { name: 'Parenting techniques', starts: '02/09/2025', days: '30 Days', img: require('../assets/parenting tech2.jpg') },
  { name: 'Child Development',    starts: '28/08/2025', days: '10 Days', img: require('../assets/child develp.jpg') },
  { name: 'Discipline',           starts: '29/08/2025', days: '10 Days', img: require('../assets/disclipline.jpg') },
];

const WORKSHOPS = [
  { name: 'Child care',              conductor: 'Conducted by James doe', role: 'Senior Doctor', date: 'Wed, 28 Aug, 2025', time: 'Time: 10.00 Am - 1.00Pm', img: require('../assets/istockphoto-1386217759-612x612.jpg') },
  { name: 'First step with baby',    conductor: 'Conducted by James doe', role: 'Senior Doctor', date: 'Wed, 28 Aug, 2025', time: 'Time: 10.00 Am - 1.00Pm', img: require('../assets/360_F_191850653_IkzN9vZTtOtJ8NTKLKOp8PlaY8iCk6Ls.jpg') },
  { name: 'The Art of Baby Handling',conductor: 'Conducted by James doe', role: 'Senior Doctor', date: 'Wed, 28 Aug, 2025', time: 'Time: 10.00 Am - 1.00Pm', img: require('../assets/beautiful-professional-woman-10497271.webp') },
];


export default function ParentingClasses() {
  const { user } = useAuth();
  const [slideIdx, setSlideIdx] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
  const timerRef = useRef(null);
  const VISIBLE = 4;

  // Auto slide
 
  useEffect(() => {
  timerRef.current = setInterval(() => {
    setSlideIdx(i => i + 1);
  }, 1000);
  return () => clearInterval(timerRef.current);
}, []);


  const handleRegister = (e) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => { setRegistered(false); setShowPopup(false); }, 2500);
  };

  return (
    <div className="pclass-page">
      <div className="container">
        <p className="breadcrumb"><Link to="/">Home</Link> / Parenting classes</p>

        {/* ── Online Classes ── */}
        <h2 className="pclass-heading">Online Classes</h2>

        <div className="oc-slider-wrap">
          {/* Left arrow */}
          <button className="oc-arrow left" onClick={() => setSlideIdx(i => (i - 1 + ONLINE_CLASSES.length) % ONLINE_CLASSES.length)}>
            <ChevronLeft size={20} />
          </button>

        <div className="oc-viewport">
  <div 
    className="oc-track" 
    style={{ 
      transform: `translateX(-${slideIdx * 12.5}%)`,
      transition: slideIdx === 0 ? 'none' : 'transform 0.6s ease'
    }}
    onTransitionEnd={() => {
      if (slideIdx >= ONLINE_CLASSES.length) {
        setSlideIdx(0);
      }
    }}
  >
    {[...ONLINE_CLASSES, ...ONLINE_CLASSES].map((cls, i) => (
      <div key={i} className="oc-card">
        <div className="oc-img">
          <img src={cls.img} alt={cls.name} />
        </div>
        <div className="oc-info">
          <h3>{cls.name}</h3>
          <p>Starts on {cls.starts} &nbsp; {cls.days}</p>
          <button className="join-class-btn" onClick={() => setShowPopup(true)}>Join class</button>
        </div>
      </div>
    ))}
  </div>
</div>

          {/* Right arrow */}
          <button className="oc-arrow right" onClick={() => setSlideIdx(i => (i + 1) % ONLINE_CLASSES.length)}>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ── Workshops ── */}
        <h2 className="pclass-heading" style={{ marginTop: 48 }}>Workshops</h2>

        <div className="workshops-grid">
          {WORKSHOPS.map((w, i) => (
            <div key={i} className="workshop-card">
              <div className="ws-img">
                <img src={w.img} alt={w.name} />
              </div>
              <div className="ws-info">
                <h3>{w.name}</h3>
                <p>{w.conductor}</p>
                <p className="ws-role">{w.role}</p>
                <p>{w.date}</p>
                <p>{w.time}</p>
                <button className="register-ws-btn" onClick={() => setShowPopup(true)}>Register</button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Banner ── */}
        <div className="pclass-banner">
          <div>
            <p>Free sign in to Join classes and Workshop now</p>
            <button className="banner-register-btn" onClick={() => setShowPopup(true)}>Register</button>
          </div>
          <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=120&auto=format&fit=crop" alt="baby" />
        </div>
      </div>

      {/* ── Register Popup ── */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={e => e.stopPropagation()}>
            {registered ? (
              <div className="success-msg">
                <p>✅ Registered Successfully!</p>
                <p>We'll contact you soon.</p>
              </div>
            ) : (
              <>
                <h3>Sign in to register</h3>
                <form onSubmit={handleRegister}>
                  <div className="popup-form-group">
                    <label>Name</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="1" />
                  </div>
                  <div className="popup-form-group">
                    <label>Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email Id" />
                  </div>
                  <div className="popup-form-group">
                    <label>Password</label>
                    <div className="pwd-wrap">
                      <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Password" />
                      <button type="button" onClick={() => setShowPwd(!showPwd)}>
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <p className="forgot-pwd">Forget password?</p>
                  </div>
                  <div className="popup-btns">
                    <button type="button" className="back-btn" onClick={() => setShowPopup(false)}>Back</button>
                    <button type="submit" className="register-btn">Register</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

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
