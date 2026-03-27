import React from 'react';
import { Link } from 'react-router-dom';
import './AllCategories.css';

const ALL_CATEGORIES = [
  {
    section: 'Baby Fashion',
    color: '#fce4ec',
    icon: '👶',
    items: {
      'New Baby clothing': ['New born onesies & rompers','New born nightwear & sleepsuits','New born baby sets & suits','New born baby dresses & frocks','New born baby leggings & shorts','New born baby t-shirts','New born baby caps, gloves & mittens','New born inner wear','New born baby jackets','New born baby sweaters'],
      'Baby boys clothing': ['Baby boys t-shirts','Baby boys shirts','Baby boys jeans & trousers','Baby boys shorts','Baby boys innerwear & thermals','Baby boys socks','Baby boys sweat shirts & jackets','Baby boys sweaters','Baby boys swim wear','Baby boys sets & suits'],
      'Baby girls clothing': ['Baby girls tops & t-shirts','Baby girls dresses & frocks','Baby girls jeans & trousers','Baby girls leggings','Baby girls shorts & skirts','Baby girls sets & suits','Baby girls socks','Baby girls swim wear','Baby girls sweat shirts & jackets','Baby girls sweaters'],
    },
  },
  {
    section: 'Footwear & Accessories',
    color: '#e8f5e9',
    icon: '👟',
    items: {
      'Baby Footwear': ['Baby Booties'],
      'Kids Footwear': ['Kids casual shoes','Kids sneakers & sports shoes','Kids bellies','Kids sandals','Kids flip flops'],
      'Fashion Accessories': ['Kids bags','Kids hair accessories','Kids caps & gloves','Kids scarfs'],
    },
  },
  {
    section: 'Moms & Baby care',
    color: '#e3f2fd',
    icon: '🍼',
    items: {
      'Breast Feeding': ['Electric breast pump','Manual breast pump','Feeding shawls','Breast pads & nipple shields'],
      'Maternity Pillows': ['Feeding Pillows','Pregnancy Pillows'],
      'Maternity clothing': ['Maternity lingerie','Maternity bottom wear','Maternity sleep wear','Maternity tops','Maternity dresses'],
      'Diaper bags': ['Diaper bags'],
      'Baby feeding & Nursery essentials': ['Bibs & burp cloths','Feeding bottles','Muslins','Soothers & pacifiers','Teethers & nibblers','Baby food storage & milk storages','Baby sippers & cups','Weaning plates & bowls','Kids water bottles & lunch box','Bottle warmer & sterilizer'],
      'Bath accessories': ['Baby bath tub','Baby bather & chair','Baby bath sponge & bath caps','Bath stands & box','Baby quick dry sheet & changing mats'],
      'Baby hair care': ['Baby shampoo','Baby conditioner','Baby hair oil'],
      'Baby grooming': ['Baby toothbrush & baby toothpaste','Baby brush & comb','Baby nail cutter & scissors','Cotton buds & pleats'],
      'Diaper and toilet training': ['Diaper pants','Diaper & nappy accessories','Baby potty seat & chair'],
      'Baby skincare': ['Baby body oil & baby massage Oil','Baby body wash','Baby cream & baby lotion','Baby diaper rash cream','Baby powder','Baby wipes & tissues'],
      'Health & Safety': ['Baby care equipments','Detergent & cleansers','Humidifiers & air purifiers','Mosquito repellants','Sanitisers & hand cleansing gels','Thermometer'],
    },
  },
  {
    section: 'Furniture & Bedding',
    color: '#fff8e1',
    icon: '🛏️',
    items: {
      'Baby Bedding': ['Baby bedding sets','Baby cot sheets & crib sheets','Baby mattress','Baby mosquito nets','Baby pillows'],
      'Baby furniture & storage': ['Baby cots & cribs','Travel baby bed','Baby storage cabinets'],
      'Blankets, quilts & wraps': ['Baby blankets','Swaddles','Baby quilts & comforters','Sleeping bags'],
    },
  },
  {
    section: 'Toys & Games',
    color: '#f3e5f5',
    icon: '🧸',
    items: {
      'Soft Toys': ['Stuffed animals','Rag dolls','Plush toys','Baby rattles'],
      'Learning Toys': ['Shape sorters','Stacking toys','Activity gyms','Musical toys'],
      'Outdoor Toys': ['Tricycles','Ride-on toys','Sandpit toys','Water toys'],
    },
  },
];

export default function AllCategories() {
  return (
    <div className="all-cat-page">
      {/* Pink banner */}
      <div className="all-cat-banner">
        <div className="container">
          <h1>All Categories</h1>
          <p>Find everything your baby needs in one place</p>
        </div>
      </div>

      <div className="container all-cat-content">
        {ALL_CATEGORIES.map(group => (
          <div key={group.section} className="cat-section" style={{ borderLeftColor: '#FF69B4' }}>
            <div className="cat-section-header" style={{ background: group.color }}>
              <span className="cat-icon">{group.icon}</span>
              <h2>{group.section}</h2>
            </div>
            <div className="cat-section-body">
              {Object.entries(group.items).map(([sub, items]) => (
                <div key={sub} className="sub-cat-col">
                  <h3>{sub}</h3>
                  {items.map(item => (
                    <Link
                      key={item}
                      to={`/products?search=${encodeURIComponent(item)}`}
                      className="sub-cat-item"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
