import React, { useState, useEffect } from 'react';
import { useSearchParams, Link} from 'react-router-dom';
import { ChevronDown, ChevronUp, Heart, ShoppingCart } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './Products.css';

const BRANDS = ['BabyHug', 'Babyhug', 'Kiowa Kids', 'Carter\'s', 'Diaper Dudes'];
const COLORS = ['Blue', 'White', 'Red', 'Multicolor', 'Yellow'];
const DISCOUNTS = ['Upto 10%', '10%-20%', '20%-30%', '30%-40%'];
const PRICE_RANGES = ['1-250', '250-1000', '1000-3000', '3000-5000'];
const AGE_GROUPS = ['0-6 months', '7-12 months', 'Kids', 'Adults'];



const SORT_OPTIONS = [
  { value: '-created_at', label: 'New Arrivals' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-rating', label: 'Top Rated' },
];

const NAV_CATEGORIES = [
  { label: 'Baby Fashion', key: 'Clothing', hasArrow: true,
    sub: ['New born onesies & rompers','New born nightwear','Baby boys t-shirts','Baby boys shirts','Baby girls dresses & frocks','Baby girls leggings'] },
  { label: 'Toys', key: 'Toys', hasArrow: false },
  { label: 'Footwear & Accessories', key: 'Gear', hasArrow: true,
    sub: ['Baby Booties','Kids casual shoes','Kids sneakers','Kids bags','Kids hair accessories'] },
  { label: 'Moms & Baby care', key: 'Feeding', hasArrow: true,
    sub: ['Electric breast pump','Manual breast pump','Feeding bottles','Baby shampoo','Baby lotion','Diaper bags'] },
  { label: 'Furniture & Bedding', key: 'Safety', hasArrow: true,
    sub: ['Baby cots & cribs','Baby mattress','Baby bedding sets','Baby blankets','Swaddles'] },
  { label: 'Rental Services', key: 'Rental', hasArrow: false },
  { label: 'Offers', key: 'Offers', hasArrow: false },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [openCat, setOpenCat] = useState(null);

  // Filter states
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedAge, setSelectedAge] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [premiumOnly, setPremiumOnly] = useState(false);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const ordering = searchParams.get('ordering') || '-created_at';

  const { addToCart } = useAuth();
 

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (ordering) params.set('ordering', ordering);
    // Price filter
    if (selectedPrice.length === 1) {
      const [min, max] = selectedPrice[0].split('-');
      params.set('min_price', min);
      params.set('max_price', max);
    }
    api.get(`/products/?${params}`)
      .then(r => {
        setProducts(r.data.results || r.data);
        setTotal(r.data.count || (r.data.results || r.data).length);
      })
      .finally(() => setLoading(false));
  }, [category, search, ordering, selectedPrice]);

  const setSort = (val) => {
    const p = new URLSearchParams(searchParams);
    p.set('ordering', val);
    setSearchParams(p);
  };

  const setCategory = (cat) => {
    const p = new URLSearchParams(searchParams);
    p.set('category', cat);
    setSearchParams(p);
  };

  const toggleCheck = (val, arr, setArr) => {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  const currentLabel = NAV_CATEGORIES.find(c => c.key === category)?.label || search || 'All Products';


   
return (
  <div className="products-page">
 
 

  
      <div className="container products-layout">
        {/* ── Left Sidebar ── */}
        <aside className="filters-sidebar">
          <h3 className="filter-title">Filters</h3>

          {/* Breadcrumb */}
          <p className="filter-breadcrumb">Home / {currentLabel}</p>

          {/* Gender */}
          <div className="filter-group">
            <h4>Gender</h4>
            {['Boy', 'Girl'].map(g => (
              <label key={g} className="filter-check">
                <input type="checkbox" checked={selectedGender.includes(g)}
                  onChange={() => toggleCheck(g, selectedGender, setSelectedGender)} />
                {g}
              </label>
            ))}
          </div>

          {/* Age group */}
          <div className="filter-group">
            <h4>Age group</h4>
            {AGE_GROUPS.map(a => (
              <label key={a} className="filter-check">
                <input type="checkbox" checked={selectedAge.includes(a)}
                  onChange={() => toggleCheck(a, selectedAge, setSelectedAge)} />
                {a}
              </label>
            ))}
          </div>

          {/* Brands */}
          <div className="filter-group">
            <h4>Brands</h4>
            {BRANDS.map(b => (
              <label key={b} className="filter-check">
                <input type="checkbox" checked={selectedBrands.includes(b)}
                  onChange={() => toggleCheck(b, selectedBrands, setSelectedBrands)} />
                {b}
              </label>
            ))}
          </div>

          {/* Color */}
          <div className="filter-group">
            <h4>Color</h4>
            {COLORS.map(c => (
              <label key={c} className="filter-check">
                <input type="checkbox" checked={selectedColors.includes(c)}
                  onChange={() => toggleCheck(c, selectedColors, setSelectedColors)} />
                {c}
              </label>
            ))}
          </div>

          {/* Discount */}
          <div className="filter-group">
            <h4>Discount</h4>
            {DISCOUNTS.map(d => (
              <label key={d} className="filter-check">
                <input type="checkbox" checked={selectedDiscounts.includes(d)}
                  onChange={() => toggleCheck(d, selectedDiscounts, setSelectedDiscounts)} />
                {d}
              </label>
            ))}
          </div>

          {/* Price */}
          <div className="filter-group">
            <h4>Price</h4>
            {PRICE_RANGES.map(p => (
              <label key={p} className="filter-check">
                <input type="checkbox" checked={selectedPrice.includes(p)}
                  onChange={() => toggleCheck(p, selectedPrice, setSelectedPrice)} />
                ₹ {p.replace('-', ' - ')}
              </label>
            ))}
          </div>

          {/* Curated */}
          <div className="filter-group">
            <h4>Curated collection</h4>
            {['Trending now', 'Fast moving', 'Instagram'].map(c => (
              <label key={c} className="filter-check">
                <input type="checkbox" /> {c}
              </label>
            ))}
          </div>

          {/* Premium */}
          <div className="filter-group">
            <h4>Premium</h4>
            <label className="filter-check">
              <input type="checkbox" checked={premiumOnly} onChange={e => setPremiumOnly(e.target.checked)} />
              Show premium products
            </label>
          </div>

          <button className="clear-filters-btn" onClick={() => {
            setSelectedGender([]); setSelectedAge([]); setSelectedBrands([]);
            setSelectedColors([]); setSelectedDiscounts([]); setSelectedPrice([]);
            setPremiumOnly(false); setSearchParams({});
          }}>Clear All Filters</button>
        </aside>

        {/* ── Main Content ── */}
        <div className="products-main">
          {/* Header */}
          <div className="products-main-header">
            <h2 className="products-heading">{currentLabel}</h2>
            <div className="sort-wrap">
              <span>Sort by</span>
              <select value={ordering} onChange={e => setSort(e.target.value)} className="sort-select">
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="prod-grid">
              {Array(9).fill(0).map((_, i) => <div key={i} className="skeleton-card" />)}
            </div>
          ) : products.length ? (
            <div className="prod-grid">
              {products.map(p => (
                <ProductItemCard key={p.id} product={p} addToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>🔍 No products found. Try different filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductItemCard({ product, addToCart }) {
 const imgSrc = product.image
  ? `https://karthiga.pythonanywhere.com${product.image}`
  : `https://via.placeholder.com/300x300/FFB6C1/5C3D2E?text=${encodeURIComponent(product.name)}`;


  return (
    <div className="prod-item-card">
      <div className="prod-item-img">
       
       <img src={`https://karthiga.pythonanywhere.com${product.image}`} alt={product.name} />
        <button className="wish-btn"><Heart size={15} /></button>
        {product.discount_percent > 0 && (
          <span className="disc-badge">-{product.discount_percent}%</span>
        )}
      </div>
      <div className="prod-item-info">
        <p className="prod-item-name">{product.name}</p>
        <p className="prod-item-price">Price: ₹{product.price}</p>
        <p className="prod-item-meta">Age: 0-12m, 1-4y</p>
        <div className="prod-item-btns">
          <Link to={`/products/${product.id}`} className="buy-now-btn">Buy Now</Link>
          <button className="add-cart-btn2" onClick={() => {
            addToCart(product);
            toast.success('Added to cart!');
          }}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
