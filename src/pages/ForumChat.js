import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, MessageCircle, Bell, LogOut, Send, MoreVertical } from 'lucide-react';
import './ForumChat.css';

const GROUPS = [
  { name: 'Pregnancy',       users: 500, img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=60&auto=format&fit=crop' },
  { name: 'Parenting',       users: 500, img: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=60&auto=format&fit=crop' },
  { name: 'Child care',      users: 500, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=60&auto=format&fit=crop' },
  { name: 'Product reviews', users: 500, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&auto=format&fit=crop' },
];

const INIT_MSGS = [
  { id: 1, from: 'other', name: 'Benny', text: 'Hi everyone !', time: '12:00 AM, 25/08/2025', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&auto=format&fit=crop' },
  { id: 2, from: 'other', name: 'Benny', text: 'Hi everyone !', time: '1:00 PM, 25/08/2025',  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&auto=format&fit=crop' },
  { id: 3, from: 'other', name: 'Benny', text: 'Hi everyone !', time: '12:00 AM, 25/08/2025', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&auto=format&fit=crop' },
  { id: 4, from: 'me',    name: 'Me',    text: 'Hi everyone !', time: '12:00 AM, 25/08/2025', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&auto=format&fit=crop' },
];

export default function ForumChat() {
  const navigate = useNavigate();
  const [activeGroup, setActiveGroup] = useState(1);
  const [msgs, setMsgs] = useState(INIT_MSGS);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, {
      id: Date.now(), from: 'me', name: 'Me', text: input,
      time: new Date().toLocaleString(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&auto=format&fit=crop'
    }]);
    setInput('');
  };

  return (
    <div className="chat-page">
      <div className="container">
        <p className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/forum">Forum</Link> / Chat
        </p>

        <div className="chat-layout">
          {/* Left sidebar */}
          <div className="chat-sidebar">
            <div className="chat-sidebar-avatar">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop" alt="me" />
            </div>
            <nav className="chat-nav">
              <Link to="/" className="chat-nav-item"><Home size={18} /> Home</Link>
              <Link to="/forum/chat" className="chat-nav-item active"><MessageCircle size={18} /> Chat</Link>
              <button className="chat-nav-item"><Bell size={18} /> Notification</button>
            </nav>
            <button className="leave-btn" onClick={() => navigate('/forum')}>
              <LogOut size={16} /> Leave
            </button>
          </div>

          {/* Groups */}
          <div className="chat-groups">
            <h3>Groups</h3>
            {GROUPS.map((g, i) => (
              <button
                key={i}
                className={`group-item ${activeGroup === i ? 'active' : ''}`}
                onClick={() => setActiveGroup(i)}
              >
                <img src={g.img} alt={g.name} />
                <span className="group-name">{g.name}</span>
                <span className="group-users">{g.users} Users</span>
              </button>
            ))}
          </div>

          {/* Chat window */}
          <div className="chat-window">
            {/* Header */}
            <div className="chat-win-header">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&auto=format&fit=crop" alt="Benny" />
              <div>
                <p className="chat-win-name">Benny</p>
                <p className="chat-win-status">Active</p>
              </div>
              <button className="chat-more"><MoreVertical size={18} /></button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {msgs.map(msg => (
                <div key={msg.id} className={`chat-msg-row ${msg.from === 'me' ? 'me' : 'other'}`}>
                  {msg.from !== 'me' && <img src={msg.avatar} alt={msg.name} className="msg-avatar" />}
                  <div className="msg-bubble-wrap">
                    <div className={`msg-bubble ${msg.from === 'me' ? 'me' : ''}`}>{msg.text}</div>
                    <p className="msg-time">{msg.time}</p>
                  </div>
                  {msg.from === 'me' && <img src={msg.avatar} alt="me" className="msg-avatar" />}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="chat-input-bar">
              <input
                placeholder="Type Message"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
              />
              <button onClick={sendMsg}><Send size={16} /></button>
            </div>
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
          <div><h3>Top categories</h3><Link to="/products?category=Clothing">Baby Fashion</Link><Link to="/products?category=Toys">Toys</Link><Link to="/products?category=Gear">Footwear & Accessories</Link><Link to="/products?category=Feeding">Moms & Baby care</Link><Link to="/products?category=Safety">Furniture & Bedding</Link></div>
          <div><h3>Customer support</h3><a href="#">Help & contact us</a><a href="#">Delivery information</a><a href="#">Track your order</a><a href="#">Returns & exchange</a></div>
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
