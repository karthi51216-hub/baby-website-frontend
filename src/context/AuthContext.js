import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/users/me/')
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/users/login/', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

const register = async (data) => {
  try {
    const res = await api.post('/users/register/', data);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data;
  } catch (err) {
    console.log('Register error:', err.response?.data);
    throw err;
  }
};

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      const updated = exists
        ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
        : [...prev, { ...product, quantity }];
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const updated = prev.filter(i => i.id !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart(prev => {
      const updated = quantity < 1
        ? prev.filter(i => i.id !== id)
        : prev.map(i => i.id === id ? { ...i, quantity } : i);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <AuthContext.Provider value={{
      user, cart, loading, cartCount, cartTotal,
      login, logout, register, addToCart, removeFromCart, updateQuantity, clearCart
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
