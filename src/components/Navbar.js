import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ShoppingCart, Search, Mic, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

// ── Dropdown Data ──────────────────────────────────────────────
const BABY_FASHION_MENU = [
  {
    heading: 'New Baby clothing',
    items: [
      'New born onesies & rompers', 'New born nightwear & sleepsuits',
      'New born baby sets & suits', 'New born baby dresses & frocks',
      'New born baby leggings & shorts', 'New born baby t-shirts',
      'New born caps, gloves & mittens', 'New born inner wear',
      'New born baby jackets', 'New born baby sweaters',
    ],
  },
  {
    heading: 'Baby boys clothing',
    items: [
      'Baby boys t-shirts', 'Baby boys shirts',
      'Baby boys jeans & trousers', 'Baby boys shorts',
      'Baby boys innerwear & thermals', 'Baby boys socks',
      'Baby boys sweat shirts & jackets', 'Baby boys sweaters',
      'Baby boys swim wear', 'Baby boys sets & suits',
    ],
  },
  {
    heading: 'Baby girls clothing',
    items: [
      'Baby girls tops & t-shirts', 'Baby girls dresses & frocks',
      'Baby girls jeans & trousers', 'Baby girls leggings',
      'Baby girls shorts & skirts', 'Baby girls sets & suits',
      'Baby girls socks', 'Baby girls swim wear',
      'Baby girls sweat shirts & jackets', 'Baby girls sweaters',
    ],
  },
];

const FOOTWEAR_MENU = [
  {
    heading: 'Baby Footwear',
    items: ['Baby Booties'],
  },
  {
    heading: 'Kids Footwear',
    items: [
      'Kids casual shoes', 'Kids sneakers & sports shoes',
      'Kids bellies', 'Kids sandals', 'Kids flip flops',
    ],
  },
  {
    heading: 'Fashion Accessories',
    items: [
      'Kids bags', 'Kids hair accessories',
      'Kids caps & gloves', 'Kids scarfs',
    ],
  },
];

const MOMS_MENU = [
  {
    heading: 'Breast Feeding',
    items: [
      'Electric breast pump', 'Manual breast pump',
      'Feeding shawls', 'Breast pads & nipple shields',
    ],
  },
  {
    heading: 'Maternity Pillows',
    items: ['Feeding Pillows', 'Pregnancy Pillows'],
  },
  {
    heading: 'Maternity clothing',
    items: [
      'Maternity lingerie', 'Maternity bottom wear',
      'Maternity sleep wear', 'Maternity tops', 'Maternity dresses',
    ],
  },
  {
    heading: 'Diaper bags',
    items: ['Diaper bags'],
  },
  {
    heading: 'Maternity clothing',
    items: [
      'Stretch mark cream', 'Maternity pads',
      'Disposable maternity panties', 'Maternity bed mats',
    ],
  },
  {
    heading: 'Maternity clothing',
    items: [
      'Bibs & burp cloths', 'Feeding bottles', 'Muslins',
      'Soothers & pacifiers', 'Teethers & nibblers',
      'Baby food storage & milk storages', 'Baby sippers & cups',
      'Weaning plates & bowls', 'Kids water bottles & lunch box',
      'Bottle warmer & sterilizer',
    ],
  },
  {
    heading: 'Baby feeding & Nursery essentials',
    items: [
      'Bibs & burp cloths', 'Feeding bottles', 'Muslins',
      'Soothers & pacifiers', 'Teethers & nibblers',
      'Baby food storage & milk storages', 'Baby sippers & cups',
      'Weaning plates & bowls', 'Kids water bottles & lunch box',
      'Bottle warmer & sterilizer',
    ],
  },
  {
    heading: 'Bath accessories',
    items: [
      'Baby bath tub', 'Baby bather & chair',
      'Baby bath sponge & bath caps', 'Bath stands & box',
      'Baby quick dry sheet & changing mats',
    ],
  },
  {
    heading: 'Baby hair care',
    items: ['Baby shampoo', 'Baby conditioner', 'Baby hair oil'],
  },
  {
    heading: 'Baby grooming',
    items: [
      'Baby toothbrush & baby toothpaste', 'Baby brush & comb',
      'Baby nail cutter & scissors', 'Cotton buds & pleats',
    ],
  },
  {
    heading: 'Diaper and toilet training',
    items: [
      'Diaper pants', 'Diaper & nappy accessories',
      'Baby potty seat & chair',
    ],
  },
  {
    heading: 'Baby skincare',
    items: [
      'Baby body oil & baby massage Oil', 'Baby body wash',
      'Baby cream & baby lotion', 'Baby diaper rash cream',
      'Baby powder', 'Baby wipes & tissues',
    ],
  },
  {
    heading: 'Health & Safety',
    items: [
      'Baby care equipments', 'Detergent & cleansers',
      'Humidifiers & air purifiers', 'Mosquito repellants',
      'Sanitisers & hand cleansing gels', 'Thermometer',
    ],
  },
];

const FURNITURE_MENU = [
  {
    heading: 'Baby Bedding',
    items: [
      'Baby bedding sets', 'Baby cot sheets & crib sheets',
      'Baby mattress', 'Baby mosquito nets', 'Baby pillows',
    ],
  },
  {
    heading: 'Baby furniture & storage',
    items: ['Baby cots & cribs', 'Travel baby bed', 'Baby storage cabinets'],
  },
  {
    heading: 'Blankets, quilts & wraps',
    items: [
      'Baby blankets', 'Swaddles',
      'Baby quilts & comforters', 'Sleeping bags',
    ],
  },
];

// ── Main Navbar ────────────────────────────────────────────────
export default function Navbar() {
  const { user, cart, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  // Which dropdown is open: 'allcat' | 'fashion' | 'footwear' | 'moms' | 'furniture' | null
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const [showAccount, setShowAccount] = useState(false);

  // Close on outside click
  useEffect(() => {

    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setShowAccount(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleMenu = (key) => setOpenMenu(prev => prev === key ? null : key);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setOpenMenu(null);
    }
  };

  const cartCount = cart?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  return (
    <nav className="navbar" ref={navRef}>

    {/* 1. PROMO BAR (Yellow Sliding Bar) */}
      <div className="promo-bar">
        <div className="promo-text-wrapper">
          <span>Get Rs:250 additional off on cart value of Rs:499 and above</span>
          <span>Get Rs:250 additional off on cart value of Rs:999 and above</span>
        </div>
      </div>

    
      {/* ── Top Bar ── */}
      <div className="navbar-top container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setOpenMenu(null)}>
          <img
            src={require('../assets/IMG_20250821_174843_910-removebg-preview.png')}
            alt="BabyZone"
          />
        </Link>

        {/* Search */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="button" className="mic-btn"><Mic size={18} /></button>
          <button type="submit" className="search-btn"><Search size={18} /></button>
        </form>

        {/* Right Icons */}
        <div className="navbar-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/forum" className="nav-link">Forum</Link>
          <Link to="/parenting-classes" className="nav-link">Parenting Classes</Link>

          {user ? (
            <div className="account-wrap">
  <span
    className="nav-link"
    onClick={() => setShowAccount(prev => !prev)}
    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
  >
    Account 
    <ChevronDown 
      size={14} 
      style={{ 
        transform: showAccount ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: '0.3s'
      }} 
    />
  </span>

  {showAccount && (
    <div className="account-drop">
      <Link to="/profile">Profile</Link>
      <Link to="/track-order">Track Order</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )}  q
</div>
          ) : (
            <Link to="/login" className="nav-link">Account</Link>
          )}

          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={20} />
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* ── Category Bar ── */}
      <div className="cat-bar">
        <div className="container cat-bar-inner">

          {/* All Categories — toggle dropdown */}
          <button
            className={`cat-bar-item all-cat ${openMenu === 'allcat' ? 'active' : ''}`}
            onClick={() => toggleMenu('allcat')}
          >
          <Menu size={16} /> All categories {openMenu === 'allcat' ? <ChevronDown style={{transform: 'rotate(180deg)'}} size={14}/> : <ChevronDown size={14}/>}
          </button>
    {/* fashion */}
         <button className="cat-bar-item" onClick={() => {
         navigate('/products?category=Baby Fashion');
        toggleMenu('fashion');
         }}>
         Baby Fashion <ChevronDown size={14} />
       </button>

          {/* Toys — direct link */}
          <Link
            to="/products?category=Toys"
            className="cat-bar-item"
            onClick={() => setOpenMenu(null)}
          >
            Toys
          </Link>

          {/* Footwear & Accessories */}
         
         <button className="cat-bar-item" onClick={() => {
           navigate('/products?category=Footwear');
           toggleMenu('footwear');
     }}>
        Footwear & Accessories <ChevronDown size={14} />
        </button>

          {/* Moms & Baby care */}
         <button className="cat-bar-item" onClick={() => {
              navigate('/products?category=Moms');
               toggleMenu('moms');
             }}>
            Moms & Baby care <ChevronDown size={14} />
            </button>

          {/* Furniture & Bedding */}
         
          <button className="cat-bar-item has-arrow" onClick={() => {
              navigate('/products?category=Beds');
             toggleMenu('furniture');
             }}>
              Furniture & Bedding <ChevronDown size={14} />
           </button>
          {/* Rental Services — direct link */}
          <Link
            to="/products?category=Rider"
            className="cat-bar-item"
            onClick={() => setOpenMenu(null)}
          >
            Rental Services
          </Link>

          {/* Offers — direct link */}
          <Link
            to="/products?category=Offers"
            className="cat-bar-item"
            onClick={() => setOpenMenu(null)}
          >
            Offers
          </Link>
        </div>

        {/* ── All Categories Dropdown ── */}
       
           {openMenu === 'allcat' && (
  <div className="mega-drop">
    <div className="mega-inner container">
      {/* Baby Fashion columns */}
      {[...BABY_FASHION_MENU, ...FOOTWEAR_MENU, ...MOMS_MENU, ...FURNITURE_MENU].map((col, i) => (
        <div key={i} className="mega-col">
          <h4 className="mega-heading">{col.heading}</h4>
          {col.items.map((item, j) => (
            <Link
              key={j}
              to={`/products?search=${encodeURIComponent(item)}`}
              className="mega-item"
              onClick={() => setOpenMenu(null)}
            >
              {item}
            </Link>
          ))}
        </div>
      ))}
    </div>
  </div>
)}
        {/* ── Baby Fashion Mega Menu ── */}
        {openMenu === 'fashion' && (
          <MegaMenu columns={BABY_FASHION_MENU} onClose={() => setOpenMenu(null)} category="Clothing" />
        )}

        {/* ── Footwear Mega Menu ── */}
        {openMenu === 'footwear' && (
          <MegaMenu columns={FOOTWEAR_MENU} onClose={() => setOpenMenu(null)} category="Gear" />
        )}

        {/* ── Moms & Baby care Mega Menu ── */}
        {openMenu === 'moms' && (
          <MegaMenu columns={MOMS_MENU} onClose={() => setOpenMenu(null)} category="Feeding" />
        )}

        {/* ── Furniture Mega Menu ── */}
        {openMenu === 'furniture' && (
          <MegaMenu columns={FURNITURE_MENU} onClose={() => setOpenMenu(null)} category="Safety" />
        )}
      </div>
    </nav>
  );
}

// ── Reusable Mega Menu ─────────────────────────────────────────
function MegaMenu({ columns, onClose, category }) {
  return (
    <div className="mega-drop">
      <div className="mega-inner container">
        {columns.map((col, i) => (
          <div key={i} className="mega-col">
            <h4 className="mega-heading">{col.heading}</h4>
            {col.items.map((item, j) => (
              <Link
                key={j}
                to={`/products?category=${category}&search=${encodeURIComponent(item)}`}
                className="mega-item"
                onClick={onClose}
              >
                {item}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}



