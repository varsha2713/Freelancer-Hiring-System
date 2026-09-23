import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page hero-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to Prolance</h1>
            <p>The premier platform connecting elite freelancers with visionary companies.</p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Get Started Today</h2>
          <div className="feature-cards" style={{ maxWidth: '800px', margin: '0 auto', gap: '2rem', display: 'flex' }}>
            
            <div className="feature-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3>Are you a Freelancer?</h3>
              <p style={{ marginBottom: '1.5rem', flex: 1 }}>Find exciting projects that match your skills.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1 }} 
                  onClick={() => navigate('/login?type=freelancer')}
                >
                  Login
                </button>
                <button 
                  className="btn-outline" 
                  style={{ flex: 1 }} 
                  onClick={() => navigate('/register?type=freelancer')}
                >
                  Register
                </button>
              </div>
            </div>

            <div className="feature-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3>Are you a Company?</h3>
              <p style={{ marginBottom: '1.5rem', flex: 1 }}>Hire the perfect talent to grow your business.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1 }} 
                  onClick={() => navigate('/login?type=client')}
                >
                  Login
                </button>
                <button 
                  className="btn-outline" 
                  style={{ flex: 1 }} 
                  onClick={() => navigate('/register?type=client')}
                >
                  Register
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
