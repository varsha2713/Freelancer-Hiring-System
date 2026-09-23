import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const userString = localStorage.getItem('currentUser');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload(); // Refresh to update header state
  };

  const isFreelancer = user && user.role === 'FREELANCER';
  const isAdmin = user && user.role === 'CLIENT';

  return (
    <motion.header 
      className={`header ${scrolled ? 'header-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container header-container">
        <Link to={user ? (isFreelancer ? '/freelancer-dashboard' : '/company-dashboard') : '/'} className="logo">
          <span>Prolance</span>
          <motion.div className="logo-dot" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
        </Link>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/home" className={location.pathname === '/home' ? 'active-link' : ''}>Home</Link>
          <Link to="/projects" className={location.pathname === '/projects' ? 'active-link' : ''}>Projects</Link>
          <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active-link' : ''}>Portfolio</Link>
          <Link to="/services" className={location.pathname === '/services' ? 'active-link' : ''}>Services</Link>
          <Link to="/packages" className={location.pathname === '/packages' ? 'active-link' : ''}>Packages</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active-link' : ''}>About</Link>
          
          {user && (
            <>
              {isFreelancer ? (
                <>
                  <Link to="/freelancer-dashboard" className={location.pathname === '/freelancer-dashboard' ? 'active-link' : ''}>Dashboard</Link>
                  <Link to="/contracts" className={location.pathname === '/contracts' ? 'active-link' : ''}>My Contracts</Link>
                  <Link to="/payment" className={location.pathname === '/payment' ? 'active-link' : ''}>Payments</Link>
                </>
              ) : isAdmin ? (
                <>
                  <Link to="/company-dashboard" className={location.pathname === '/company-dashboard' ? 'active-link' : ''}>Dashboard</Link>
                  <Link to="/post-project" className={location.pathname === '/post-project' ? 'active-link' : ''}>Post Project</Link>
                  <Link to="/contracts" className={location.pathname === '/contracts' ? 'active-link' : ''}>Contracts</Link>
                  <Link to="/payment" className={location.pathname === '/payment' ? 'active-link' : ''}>Payments</Link>
                </>
              ) : null}
            </>
          )}
        </nav>
        
        <div className="auth-buttons">
          {!user ? (
            <>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline" 
                onClick={() => navigate('/login')}
              >
                Login
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary" 
                onClick={() => navigate('/register')}
              >
                Register
              </motion.button>
            </>
          ) : (
            <div className="user-profile-menu">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="profile-icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                title="Profile Menu"
              >
                {user.username ? user.username.charAt(0).toUpperCase() : <User size={20} />}
              </motion.div>
              
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="dropdown-menu"
                  >
                    <div className="dropdown-header">
                      <strong>{user.username || user.email}</strong>
                      <span className="badge">{user.role}</span>
                    </div>
                    <Link to={isFreelancer ? '/freelancer-dashboard' : '/company-dashboard'} onClick={() => setIsMenuOpen(false)}>My Dashboard</Link>
                    {isFreelancer && <Link to="/portfolio" onClick={() => setIsMenuOpen(false)}>My Portfolio</Link>}
                    <button className="dropdown-logout" onClick={handleLogout}>Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <button className="menu-toggle mobile-only" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </motion.header>
  );
}