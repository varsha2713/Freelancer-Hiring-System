import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  fetchProjectsByUser, 
  fetchProposals, 
  fetchContractsByProposals, 
  fetchPaymentsByClient,
  updateProposal,
  submitContract
} from '../utils/api';
import { Briefcase, CreditCard, CheckCircle, TrendingUp, Inbox, FileText } from 'lucide-react';
import ProposalList from '../components/dashboard/ProposalList';
import ContractList from '../components/dashboard/ContractList';
import '../App.css';

export default function CompanyDashboard() {
  const [user] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});
  const [projects, setProjects] = useState([]);
  const [pendingProposals, setPendingProposals] = useState([]);
  const [activeContracts, setActiveContracts] = useState([]);
  const [completedContracts, setCompletedContracts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const projectData = await fetchProjectsByUser(user.id);
      setProjects(projectData || []);
      
      const projectIds = projectData.map(p => p.id);
      const allProposals = await fetchProposals();
      
      const pPending = allProposals.filter(p => 
        projectIds.includes(p.projectId) && p.status === 'PENDING'
      );
      setPendingProposals(pPending);

      const clientProposals = allProposals.filter(p => 
        projectIds.includes(p.projectId) && p.status === 'ACCEPTED'
      );

      if (clientProposals.length > 0) {
        const contractIds = clientProposals.map(p => p.id);
        const contractData = await fetchContractsByProposals(contractIds);
        
        const enrichedContracts = contractData.map(contract => {
          const prop = clientProposals.find(p => p.id === contract.proposalId);
          const proj = projectData.find(project => project.id === prop?.projectId);
          return {
            ...contract,
            projectTitle: proj?.title || 'Unknown Project',
            deadline: proj?.deadline,
            bidAmount: prop?.bidAmount || 1500,
            freelancerId: prop?.freelancerId,
            clientId: proj?.clientId
          };
        });

        setActiveContracts(enrichedContracts.filter(c => c.progressPercentage !== 100));
        setCompletedContracts(enrichedContracts.filter(c => c.progressPercentage === 100));
      } else {
        setActiveContracts([]);
        setCompletedContracts([]);
      }

      const paymentData = await fetchPaymentsByClient(user.id);
      setPayments(paymentData || []);

    } catch (err) {
      console.error("Error fetching company dashboard data", err);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    if (!user.id || user.role !== 'CLIENT') {
      navigate('/login');
      return;
    }
    fetchData();
    const interval = window.setInterval(() => {
      fetchData();
    }, 8000);
    return () => window.clearInterval(interval);
  }, [fetchData, user, navigate]);

  const handleApproveProposal = async (proposal) => {
    try {
      await updateProposal(proposal.id, { ...proposal, status: 'ACCEPTED' });
      const relatedProject = projects.find((p) => p.id === proposal.projectId);
      const contractData = {
        proposalId: proposal.id,
        startDate: new Date().toISOString().split('T')[0],
        paymentTerms: 'Fixed',
        status: 'ACTIVE',
        progressPercentage: 0,
        amount: proposal.bidAmount,
        projectTitle: relatedProject?.title || 'Project',
        clientId: user.id,
        freelancerId: proposal.freelancerId,
        clientApproval: true,
        freelancerApproval: false,
        paymentStatus: 'PENDING'
      };
      const createdContract = await submitContract(contractData);
      navigate(`/contracts/${createdContract.id}`);
    } catch (err) {
      alert('Failed to approve proposal: ' + err.message);
    }
  };

  const handleDeclineProposal = async (proposal) => {
    try {
      await updateProposal(proposal.id, { ...proposal, status: 'DECLINED' });
      alert('Proposal declined.');
      fetchData();
    } catch (err) {
      alert('Failed to decline proposal: ' + err.message);
    }
  };

  const handlePayFreelancer = (contract) => {
    navigate('/payment', { 
      state: { 
        projectId: contract.proposalId,
        projectTitle: contract.projectTitle,
        bidAmount: contract.bidAmount,
        freelancerId: contract.freelancerId,
        contractId: contract.id,
        clientId: user.id
      } 
    });
  };

  const totalSpent = payments.reduce((sum, p) => sum + (p.amount || 0), 0) || (activeContracts.length * 1500);
  const avgProgress = activeContracts.length > 0
    ? Math.round(activeContracts.reduce((sum, contract) => sum + (contract.progressPercentage || 0), 0) / activeContracts.length)
    : 0;

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
      className="page dashboard company-dashboard"
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
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Business Hub: <span style={{ color: 'var(--primary-color)' }}>{user.company || 'Admin'}</span></h1>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Managing your projects, talent network, and payments.</p>
          </div>
          
          <div className="dashboard-grid">
            <motion.div variants={itemVariants} initial="hidden" animate="show" className="card stat-card">
              <div className="stat-icon"><Briefcase /></div>
              <div className="stat-details">
                <h4>Active Projects</h4>
                <p>{activeContracts.length}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} initial="hidden" animate="show" transition={{delay: 0.1}} className="card stat-card">
              <div className="stat-icon"><CreditCard /></div>
              <div className="stat-details">
                <h4>Total Spent</h4>
                <p>${totalSpent.toLocaleString()}</p>
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
          <motion.section variants={itemVariants} className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', margin: 0 }}>
                <Briefcase color="var(--primary-color)" size={24}/> Ongoing Projects
              </h2>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" onClick={() => navigate('/post-project')}>
                Post New Project
              </motion.button>
            </div>
            {activeContracts.length > 0 ? (
              <ContractList 
                contracts={activeContracts}
                user={user}
                isActive={true}
                onPay={handlePayFreelancer}
                navigate={navigate}
              />
            ) : (
              <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '2rem' }}>No active talent hired yet. Review your proposals to get started!</p>
            )}
          </motion.section>

          <motion.section variants={itemVariants} className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
              <Inbox color="var(--warning)" size={24}/> Bids Received (Pending Approval)
            </h2>
            <ProposalList 
              pendingProposals={pendingProposals}
              projects={projects}
              onApprove={handleApproveProposal}
              onDecline={handleDeclineProposal}
            />
          </motion.section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <motion.section variants={itemVariants} className="card">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                <FileText color="var(--text-color)" size={24}/> Project History
              </h2>
              {completedContracts.length > 0 ? (
                <ContractList 
                  contracts={completedContracts}
                  user={user}
                  isActive={false}
                  navigate={navigate}
                />
              ) : (
                <p style={{ color: 'var(--text-light)' }}>No completed projects yet.</p>
              )}
            </motion.section>

            <motion.section variants={itemVariants} className="card">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                <CreditCard color="var(--success)" size={24}/> Money Transactions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {payments.slice(0, 5).map(p => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--background-color)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <strong>Payment #{p.id}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Contract ID: {p.contractId}</div>
                    </div>
                    <strong style={{ color: 'var(--success)' }}>${p.amount}</strong>
                  </div>
                ))}
                {payments.length === 0 && <p style={{ color: 'var(--text-light)' }}>No payment history found.</p>}
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
