import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AllCategories from './pages/AllCategories';
import About from './pages/About';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import Forum from './pages/Forum';
import ForumChat from './pages/ForumChat';
import ParentingClasses from './pages/ParentingClasses';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/chat" element={<ForumChat />} />
        <Route path="/parenting-classes" element={<ParentingClasses />} />

        <Route
          path="/checkout"
          element={<PrivateRoute><Checkout /></PrivateRoute>}
        />

        <Route
          path="/profile"
          element={<PrivateRoute><Profile /></PrivateRoute>}
        />
      </Routes>

      
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

