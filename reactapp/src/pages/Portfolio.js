import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser') || localStorage.getItem('user') || 'null');
  const isFreelancer = user && (user.userType === 'freelancer' || user.role === 'FREELANCER');
  const portfolioItems = JSON.parse(localStorage.getItem('portfolios') || '[]');
  const categories = ['all', 'web', 'design', 'marketing', 'data'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'title', label: 'Title (A-Z)' }
  ];

  const filteredItems = portfolioItems.filter((item) => activeCategory === 'all' || item.category === activeCategory);
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
    const firstDate = new Date(a.date || 0);
    const secondDate = new Date(b.date || 0);
    return sortBy === 'oldest' ? firstDate - secondDate : secondDate - firstDate;
  });

  return (
    <div className="page portfolio-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Portfolio Gallery</h1>
            <p>Browse completed work shared by freelancers.</p>
          </div>
          {isFreelancer && <button className="btn-primary" onClick={() => alert('Portfolio editor coming soon.')}>Add Portfolio Work</button>}
        </div>
        <div className="portfolio-controls">
          <div className="portfolio-filters">
            {categories.map((category) => (
              <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="portfolio-sorting">
            <label htmlFor="portfolio-sort">Sort by:</label>
            <select id="portfolio-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
        </div>
        {sortedItems.length === 0 ? (
          <div className="no-results"><h3>No portfolio work available yet</h3><p>Completed work shared by freelancers will appear here.</p></div>
        ) : (
          <div className="portfolio-grid">
            {sortedItems.map((item) => (
              <article key={item.id} className="portfolio-item">
                {item.image && <div className="portfolio-image"><img src={item.image} alt={item.title} /></div>}
                <div className="portfolio-content">
                  <h3>{item.title}</h3>
                  <p className="portfolio-description">{item.description}</p>
                  <p className="portfolio-freelancer">By: {item.freelancer || 'Freelancer'}</p>
                  <div className="portfolio-skills">{(item.skills || []).map((skill) => <span key={skill} className="skill-tag">{skill}</span>)}</div>
                  {item.date && <p className="portfolio-date">Completed: {new Date(item.date).toLocaleDateString()}</p>}
                  {item.projectId && <button className="btn-outline" onClick={() => navigate(`/projects/${item.projectId}`)}>View Project</button>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
