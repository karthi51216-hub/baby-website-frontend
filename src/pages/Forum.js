import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Forum.css';

const FORUM_CATS = [
  { name: 'Pregnancy',       img: require('../assets/pregency.jpg') },
  { name: 'Parenting',       img: require('../assets/parenting.jpg') },
  { name: 'Childcare',       img: require('../assets/childcare.jpg') },
  { name: 'Product Reviews', img: require('../assets/reviews.jpg') },
];

const BLOGS = [
  { title: 'The Story of My Rainbow Baby', img: require('../assets/baby.jpg'), desc: 'What does it mean when i say that my daughter is my Rainbow Baby? A "Rainbow Baby" is a baby that is born following a miscarriage or an infant loss. Just like a beautiful and...' },
  { title: 'Baby Dry Skin: Symptoms, Causes and Treatment', img: require('../assets/feet.jpg'), desc: 'For a parent, their baby\'s health is of utmost importance. This means taking care of their internal health by ensuring the right kind of nutrition and choosing products that...' },
  { title: 'Raisins for babies- Health benefits and risks', img: require('../assets/raisins.jpg'), desc: 'Many of us love a good old raisin - they are small, wrinkled packets of energy that have been around since medieval times and are famous for being a natural source of minerals...' },
  { title: 'Hernia in Babies – Types, Causes, Signs and Treatment', img: require('../assets/sleeping baby.jpg'), desc: 'A hernia is a lump that develops under the skin, in the tummy or groin region, and in variable sizes. When the muscles across the tummy area and the pelvic region weaken...' },
];

export default function Forum() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCat, setSelectedCat] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ name: user?.name || 'John Doe', email: user?.email || 'johndoe@gmail.com', password: '' });

  const handleJoin = (catName) => {
    setSelectedCat(catName);
    setShowPopup(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setShowPopup(false);
    navigate('/forum/chat');
  };

  return (
    <div className="forum-page">
      <div className="container">
        <p className="breadcrumb"><Link to="/">Home</Link> / Forum</p>

        {/* Join Forum heading */}
        <div className="forum-heading-wrap">
          <h2 className="forum-heading">Join Forum</h2>
        </div>

        {/* 4 Category cards */}
        <div className="forum-cats-grid">
          {FORUM_CATS.map(cat => (
            <div key={cat.name} className="forum-cat-card">
              <img src={cat.img} alt={cat.name} />
              <div className="forum-cat-overlay">
                <h3>{cat.name}</h3>
                <p>Join forum to ask or share something</p>
                <button className="join-btn" onClick={() => handleJoin(cat.name)}>Join</button>
              </div>
            </div>
          ))}
        </div>

        {/* Blogs */}
        <div className="blogs-header">
          <h2 className="forum-heading">Blogs</h2>
          <a href="#" className="view-more-link">View more</a>
        </div>

        <div className="blogs-grid">
          {BLOGS.map((blog, i) => (
            <div key={i} className="blog-card">
              <img src={blog.img} alt={blog.title} />
              <div className="blog-info">
                <h3>{blog.title}</h3>
                <p>{blog.desc}</p>
                <button className="read-more-btn">Read more</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={e => e.stopPropagation()}>
            <h3>Sign in to Join</h3>
            <form onSubmit={handleRegister}>
              <div className="popup-form-group">
                <label>Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" />
              </div>
              <div className="popup-form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="johndoe@gmail.com" />
              </div>
              <div className="popup-form-group">
                <label>Password</label>
                <div className="pwd-wrap">
                  <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="XXXXXX" />
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
