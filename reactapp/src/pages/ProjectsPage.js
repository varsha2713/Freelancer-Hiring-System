import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProjects } from '../utils/api';
import { Search, Briefcase, DollarSign, Calendar, Clock, ChevronRight } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const handleViewDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  if (loading) return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
        <Clock size={32} color="var(--primary-color)" />
      </motion.div>
    </div>
  );

  return (
    <motion.div 
      className="page projects-page container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-color)' }}>Explore Work</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Find your next great opportunity.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary" 
          onClick={() => navigate('/post-project')}
        >
          <Briefcase size={18} /> Post a Project
        </motion.button>
      </div>
      
      <div style={{ marginBottom: '2rem', position: 'relative' }}>
        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} size={20} />
        <input 
          type="text" 
          placeholder="Search by title or description..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', fontSize: '1rem', boxShadow: 'var(--shadow-sm)' }}
        />
      </div>

      <motion.div 
        className="projects-list" 
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--surface-color)', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>No projects match your search.</p>
          </div>
        ) : (
          filteredProjects.map(project => (
            <motion.div 
              key={project.id} 
              className="project-card" 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleViewDetails(project.id)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'var(--primary-light)', color: 'white', borderRadius: '12px', fontWeight: 600 }}>{project.status || 'OPEN'}</span>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Posted recently</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1rem', maxWidth: '800px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
                
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--text-color)', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                    <DollarSign size={16} color="var(--success)" /> 
                    {project.budget ? `$${project.budget}` : (project.minBudget ? `$${project.minBudget} - $${project.maxBudget}` : 'Negotiable')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={16} color="var(--primary-color)" /> Deadline: {project.deadline}
                  </div>
                </div>
                
                {project.skillsRequired && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    {typeof project.skillsRequired === 'string' 
                      ? project.skillsRequired.split(',').map(s => s.trim()).map(skill => (
                        <span key={skill} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'var(--secondary-color)', borderRadius: '20px', color: 'var(--text-color)' }}>{skill}</span>
                      ))
                      : project.skillsRequired.map(skill => (
                        <span key={skill} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'var(--secondary-color)', borderRadius: '20px', color: 'var(--text-color)' }}>{skill}</span>
                      ))
                    }
                  </div>
                )}
              </div>
              
              <div style={{ marginLeft: '1.5rem', display: 'flex', alignItems: 'center', color: 'var(--primary-color)' }}>
                <ChevronRight size={32} />
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
