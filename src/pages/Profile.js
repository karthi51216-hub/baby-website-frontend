import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Package, MapPin, LogOut } from 'lucide-react';
import api from '../services/api';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    api.get('/orders/my_orders/').then(r => setOrders(r.data)).catch(() => {});
  }, []);

  const STATUS_COLORS = {
    pending: '#FF9800', confirmed: '#2196F3', shipped: '#9C27B0',
    delivered: '#4CAF50', cancelled: '#F44336',
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-avatar">
              <div className="avatar-circle">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
              <div>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </div>
            </div>
            <nav className="profile-nav">
              {[
                { key: 'orders', label: 'My Orders', icon: <Package size={18} /> },
                { key: 'profile', label: 'Profile Info', icon: <User size={18} /> },
                { key: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
              ].map(tab => (
                <button
                  key={tab.key}
                  className={`profile-nav-item ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
              <button className="profile-nav-item logout" onClick={logout}>
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="profile-content">
            {activeTab === 'orders' && (
              <div>
                <h2 className="page-title">My Orders</h2>
                {orders.length ? orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div>
                        <span className="order-id">Order #{order.id}</span>
                        <span className="order-date">{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                      <span className="order-status" style={{ background: STATUS_COLORS[order.status] + '22', color: STATUS_COLORS[order.status] }}>
                        {order.status?.toUpperCase()}
                      </span>
                    </div>
                    <div className="order-items">
                      {order.items?.slice(0, 3).map(item => (
                        <div key={item.id} className="order-item-row">
                          <span>{item.product_name}</span>
                          <span>x{item.quantity}</span>
                          <span>₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <span className="order-total">Total: ₹{order.total}</span>
                      <Link to={`/orders/${order.id}`} className="btn-outline">View Details</Link>
                    </div>
                  </div>
                )) : (
                  <div className="empty-orders">
                    <Package size={48} color="#FFB6C1" />
                    <p>No orders yet. <Link to="/products">Start Shopping →</Link></p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="page-title">Profile Info</h2>
                <div className="info-card">
                  {[
                    { label: 'Full Name', value: user?.name },
                    { label: 'Email', value: user?.email },
                    { label: 'Phone', value: user?.phone || 'Not added' },
                    { label: 'Member Since', value: user?.date_joined ? new Date(user.date_joined).toLocaleDateString() : '-' },
                  ].map(({ label, value }) => (
                    <div key={label} className="info-row">
                      <span className="info-label">{label}</span>
                      <span className="info-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="page-title">Saved Addresses</h2>
                <p style={{ color: '#888' }}>No saved addresses yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
