import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Package, RefreshCw, MessageCircle, X, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Contact.css';

const FAQS = [
  { q: 'Where are the offices of BabyZone located?', a: 'Currently our office is located in Madurai while the orders are shipped from our warehouses located across India.' },
  { q: 'How do I know my order has been confirmed?', a: 'After checking out during the payment process, you will get a confirmation that your payment has been processed successfully. You will also get a mail in your registered email id, along with an SMS to your registered mobile number confirming the order.' },
  { q: 'Are there any other hidden charges like Octroi or Entry tax?', a: 'You will get the final price during check out. Our prices are all inclusive and you need not pay anything extra.' },
  { q: 'How long will it take to receive my orders?', a: 'For all areas serviced by reputed couriers, the delivery time would be within 3 to 4 business days after dispatch. However items weighing over 2 kilos may take a couple of days longer to reach.' },
  { q: 'Will my GST amount be refunded on Order Cancellation and Returns?', a: 'Yes, GST amount collected will be returned to customer\'s source method at the time of Cancellation and Returns.' },
];

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatMsgs, setChatMsgs] = useState([
    { from: 'bot', text: 'Hello! How can I help you today? 😊' }
  ]);
  const [openFaq, setOpenFaq] = useState(null);

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSend = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const userMsg = chatMsg;
    setChatMsgs(prev => [...prev, { from: 'user', text: userMsg }]);
    setChatMsg('');
    setTimeout(() => {
      setChatMsgs(prev => [...prev, {
        from: 'bot',
        text: 'Thank you for reaching out! Our team will get back to you shortly. 🛍️'
      }]);
    }, 800);
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Breadcrumb */}
        <p className="breadcrumb">
          <Link to="/">Home</Link> / Contact
        </p>

        <div className="contact-grid">
          {/* ── Left ── */}
          <div className="contact-left">
            <h2>Reach us</h2>

            <div className="reach-card">
              <Phone size={18} color="#FF69B4" />
              <span>+123-456-7890</span>
            </div>
            <div className="reach-card">
              <Mail size={18} color="#FF69B4" />
              <span>support@babyzone.com</span>
            </div>

            <Link to="/track-order" className="reach-card link-card">
              <Package size={22} color="#FF69B4" />
              <div>
                <p>Track order&</p>
                <p>Cancel order</p>
              </div>
            </Link>

            <div className="reach-card">
              <RefreshCw size={22} color="#FF69B4" />
              <div>
                <p>Exchange and</p>
                <p>refund policy</p>
              </div>
            </div>

            <button className="live-chat-btn" onClick={() => setChatOpen(true)}>
              <MessageCircle size={18} /> Live Chat
            </button>
          </div>

          {/* ── Right Form ── */}
          <div className="contact-right">
            <h2>Contact Form</h2>
            {sent ? (
              <div className="sent-msg">✅ Message sent successfully!</div>
            ) : (
              <form onSubmit={handleSend} className="contact-form">
                <div className="form-group">
                  <label>Name</label>
                  <input name="name" placeholder="Your Name" value={form.name} onChange={handleForm} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" placeholder="Email id" value={form.email} onChange={handleForm} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleForm} />
                </div>
                <div className="form-group">
                  <label>Queries</label>
                  <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleForm} rows={4} required />
                </div>
                <button type="submit" className="send-btn">Send</button>
              </form>
            )}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="faq-section">
          <h2>FAQ's</h2>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openFaq === i && <p className="faq-a">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Live Chat Popup ── */}
      {chatOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <span>🔒 Messages are end-to-end encrypted</span>
            <button onClick={() => setChatOpen(false)}><X size={18} /></button>
          </div>
          <div className="chat-msgs">
            {chatMsgs.length === 1 && (
              <p className="chat-start-hint">Start asking what do you think!</p>
            )}
            {chatMsgs.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.from}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="chat-hello">
            <button onClick={() => { setChatMsg('Hello!'); }}>Hello!</button>
          </div>
          <div className="chat-input-row">
            <input
              placeholder="Type message..."
              value={chatMsg}
              onChange={e => setChatMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendChat()}
            />
            <button onClick={sendChat}><Send size={16} /></button>
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
