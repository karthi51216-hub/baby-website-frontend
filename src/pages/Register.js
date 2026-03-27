import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password, confirm_password: confirmPassword });
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.email?.[0] || err.response?.data?.error || 'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
      

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <div className="auth-banner">
        <img
          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop"
          alt="baby"
        />
        <div className="auth-banner-text">
          <h3>Join BabyBliss Family</h3>
          <p>Get exclusive deals and expert tips.</p>
        </div>
      </div>
    </div>
  );
}
