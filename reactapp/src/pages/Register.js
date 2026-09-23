import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { registerUser } from '../utils/api';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'FREELANCER';
  const [userType, setUserType] = useState(initialType.toUpperCase() === 'CLIENT' ? 'CLIENT' : 'FREELANCER');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: '',
    company: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const userData = { ...formData, role: userType };
      await registerUser(userData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div 
      className="page auth-page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="auth-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
      >
        <h2>Create an Account</h2>
        
        <div className="user-type-toggle" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', padding: '0.25rem', background: 'var(--background-color)', borderRadius: 'var(--radius-md)' }}>
          <button 
            type="button"
            className={userType === 'FREELANCER' ? 'active' : ''}
            onClick={() => setUserType('FREELANCER')}
            style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: 'var(--radius-md)', background: userType === 'FREELANCER' ? 'var(--primary-color)' : 'transparent', color: userType === 'FREELANCER' ? 'white' : 'var(--text-color)', cursor: 'pointer', fontWeight: 500, transition: 'all 0.3s' }}
          >
            Freelancer
          </button>
          <button 
            type="button"
            className={userType === 'CLIENT' ? 'active' : ''}
            onClick={() => setUserType('CLIENT')}
            style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: 'var(--radius-md)', background: userType === 'CLIENT' ? 'var(--primary-color)' : 'transparent', color: userType === 'CLIENT' ? 'white' : 'var(--text-color)', cursor: 'pointer', fontWeight: 500, transition: 'all 0.3s' }}
          >
            Client
          </button>
        </div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
              placeholder="John Doe"
            />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              placeholder="john@example.com"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              placeholder="Create a password"
            />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
              placeholder="Confirm your password"
            />
          </div>
          
          <AnimatePresence mode="wait">
            {userType === 'FREELANCER' && (
              <motion.div 
                key="freelancer-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="form-group"
              >
                <label>Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  placeholder="React, Node.js, UI/UX Design"
                />
              </motion.div>
            )}
            
            {userType === 'CLIENT' && (
              <motion.div 
                key="client-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="form-group"
              >
                <label>Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Acme Corp"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : <><UserPlus size={18} /> Register</>}
          </motion.button>
        </form>
        
        <p className="auth-link">
          Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
        </p>
      </motion.div>
    </motion.div>
  );
}