import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProposalsByUser, fetchPaymentsByFreelancer, fetchContractsByProposals, fetchProjects } from '../utils/api';
import { Wallet, Briefcase, CheckCircle, TrendingUp, AlertCircle, MessageSquare, CreditCard, Bell } from 'lucide-react';
import '../App.css';

export default function FreelancerDashboard() {
  const [user] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});
  const [payments, setPayments] = useState([]);
  const [activeContracts, setActiveContracts] = useState([]);
  const [completedContracts, setCompletedContracts] = useState([]);
  const [allProposals, setAllProposals] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [upiId, setUpiId] = useState(localStorage.getItem(`upi_details_${user.id}`) || '');
  const [cardNumber, setCardNumber] = useState(localStorage.getItem(`card_details_${user.id}`) || '');
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [privateMessages, setPrivateMessages] = useState(JSON.parse(localStorage.getItem(`messages_${user.id}`)) || []);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const proposalData = await fetchProposalsByUser(user.id);
      setAllProposals(proposalData || []);
      
      const paymentData = await fetchPaymentsByFreelancer(user.id);
      setPayments(paymentData || []);

      const acceptedProposalIds = proposalData
        .filter(p => p.status === 'ACCEPTED')
        .map(p => p.id);

      const projectsList = await fetchProjects();
      setAllProjects(projectsList || []);

      if (acceptedProposalIds.length > 0) {
        const contractData = await fetchContractsByProposals(acceptedProposalIds);
        
        const enrichedContracts = contractData.map(contract => {
          const prop = proposalData.find(p => p.id === contract.proposalId);
          const proj = projectsList.find(project => project.id === prop?.projectId);
          return {
            ...contract,
            projectTitle: proj?.title || 'Unknown Project',
            deadline: proj?.deadline,
            clientId: proj?.clientId,
            freelancerId: user.id
          };
        });

        setActiveContracts(enrichedContracts.filter(c => c.progressPercentage !== 100));
        setCompletedContracts(enrichedContracts.filter(c => c.progressPercentage === 100));
      } else {
        setActiveContracts([]);
        setCompletedContracts([]);
      }
      setPrivateMessages(JSON.parse(localStorage.getItem(`messages_${user.id}`)) || []);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    if (!user.id || user.role !== 'FREELANCER') {
      navigate('/login');
      return;
    }
    fetchData();
    const interval = window.setInterval(() => {
      fetchData();
    }, 8000);
    return () => window.clearInterval(interval);
  }, [fetchData, user, navigate]);

  const handleSavePaymentDetails = (e) => {
    e.preventDefault();
    localStorage.setItem(`upi_details_${user.id}`, upiId);
    localStorage.setItem(`card_details_${user.id}`, cardNumber);
    setDetailsSaved(true);
    setTimeout(() => setDetailsSaved(false), 3000);
  };

  const totalEarnings = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const avgProgress = activeContracts.length > 0
    ? Math.round(activeContracts.reduce((sum, contract) => sum + (contract.progressPercentage || 0), 0) / activeContracts.length)
    : 0;

  const getRecommendedProjects = () => {
    if (!user.skills || allProjects.length === 0) return [];
    const fSkills = user.skills.split(',').map(s => s.trim().toLowerCase());
    return allProjects.map(proj => {
      let pSkillsRaw = proj.requiredSkills || proj.skills || '';
      let pSkills = [];
      if (typeof pSkillsRaw === 'string') {
          pSkills = pSkillsRaw.split(',').map(s => s.trim().toLowerCase());
      } else if (Array.isArray(pSkillsRaw)) {
          pSkills = pSkillsRaw.map(s => s.trim().toLowerCase());
      }
      if (pSkills.length === 0) return { ...proj, matchPercentage: 0 };
      
      const matched = pSkills.filter(s => fSkills.includes(s));
      const percentage = Math.round((matched.length / pSkills.length) * 100);
      
      return { ...proj, matchPercentage: percentage };
    })
    .filter(p => p.matchPercentage > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const recommendedProjects = getRecommendedProjects();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  if (loading) return <div className="page" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>Loading...</div>;

  return (
    <motion.div 
      className="page dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <motion.header 
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Welcome back, <span style={{ color: 'var(--primary-color)' }}>{user.username}</span></h1>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Here is what's happening with your projects today.</p>
          </div>
          
          <div className="dashboard-grid">
            <motion.div variants={itemVariants} initial="hidden" animate="show" className="card stat-card">
              <div className="stat-icon"><Wallet /></div>
              <div className="stat-details">
                <h4>Total Earnings</h4>
                <p>${totalEarnings.toLocaleString()}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} initial="hidden" animate="show" transition={{delay: 0.1}} className="card stat-card">
              <div className="stat-icon"><Briefcase /></div>
              <div className="stat-details">
                <h4>Active Projects</h4>
                <p>{activeContracts.length}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} initial="hidden" animate="show" transition={{delay: 0.2}} className="card stat-card">
              <div className="stat-icon"><CheckCircle /></div>
              <div className="stat-details">
                <h4>Completed Projects</h4>
                <p>{completedContracts.length}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} initial="hidden" animate="show" transition={{delay: 0.3}} className="card stat-card">
              <div className="stat-icon"><TrendingUp /></div>
              <div className="stat-details">
                <h4>Avg Progress</h4>
                <p>{avgProgress}%</p>
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.div 
          className="dashboard-main"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {allProposals.some(p => p.status === 'ACCEPTED') && (
            <motion.div variants={itemVariants} className="card" style={{ background: 'var(--primary-light)', color: 'white', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <AlertCircle size={24} />
              <div>
                <strong>🎉 Bid Approved!</strong> The client has approved your bid! Please make sure your payment details are saved below.
              </div>
            </motion.div>
          )}

          {privateMessages.length > 0 && (
            <motion.div variants={itemVariants} className="card" style={{ background: '#e0f2fe', color: '#0369a1', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', fontWeight: 600 }}>
                <MessageSquare size={20} /> <span>Private Messages Received:</span>
              </div>
              <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                {privateMessages.map((msg, idx) => (
                  <li key={idx} style={{ padding: '0.75rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    "{msg.text}" — Sent by client.
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            
            <motion.section variants={itemVariants} className="card">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                <CreditCard color="var(--primary-color)" size={24}/> Payment Preferences
              </h2>
              <form onSubmit={handleSavePaymentDetails} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label>UPI ID</label>
                  <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="e.g. yourname@upi" />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="e.g. 1234 5678 9012 3456" />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Save Preferences
                </motion.button>
              </form>
              {detailsSaved && <motion.p initial={{opacity:0}} animate={{opacity:1}} style={{ color: 'var(--success)', marginTop: '1rem', fontSize: '0.9rem' }}>✓ Payment preferences saved successfully!</motion.p>}
            </motion.section>

            <motion.section variants={itemVariants} className="card">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                <Bell color="var(--warning)" size={24}/> Recommended for You
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recommendedProjects.length > 0 ? (
                  recommendedProjects.map(proj => (
                    <motion.div whileHover={{ scale: 1.02 }} key={proj.id} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', cursor: 'pointer' }} onClick={() => navigate(`/projects/${proj.id}`)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <h4 style={{ color: 'var(--primary-dark)' }}>{proj.title}</h4>
                        <span style={{ fontSize: '0.8rem', background: 'var(--warning)', color: 'white', padding: '0.1rem 0.5rem', borderRadius: '12px' }}>{proj.matchPercentage}% Match</span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>{proj.description}</p>
                      <strong style={{ fontSize: '0.9rem' }}>Budget: ${proj.budget || proj.minBudget}</strong>
                    </motion.div>
                  ))
                ) : (
                  <p style={{ color: 'var(--text-light)' }}>No matching projects right now. Keep your skills updated!</p>
                )}
              </div>
            </motion.section>
            
          </div>
          
        </motion.div>
      </div>
    </motion.div>
  );
}
