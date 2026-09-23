import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchContractById, fetchProjects, fetchProposals, updateContract } from '../utils/api';
import { downloadContractPdf } from '../utils/contractPdf';

export default function ContractDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [project, setProject] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  const loadContract = useCallback(async () => {
    try {
      const [contractData, projectsData, proposalData] = await Promise.all([
        fetchContractById(id),
        fetchProjects(),
        fetchProposals()
      ]);

      setContract(contractData);
      const matchedProject = projectsData.find((item) => item.id === proposalData.find((p) => p.id === contractData?.proposalId)?.projectId);
      const matchedProposal = proposalData.find((item) => item.id === contractData?.proposalId);
      setProject(matchedProject || null);
      setProposal(matchedProposal || null);
      setMessage('');
    } catch (err) {
      console.error('Failed to load contract', err);
      setMessage('Unable to load contract details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    loadContract();
    const interval = setInterval(() => loadContract(), 6000);
    return () => clearInterval(interval);
  }, [id, loadContract]);

  const handleApproval = async (role) => {
    if (!contract) return;
    setBusy(true);
    try {
      const payload = {
        clientApproval: role === 'client' ? true : contract.clientApproval,
        freelancerApproval: role === 'freelancer' ? true : contract.freelancerApproval,
        progressPercentage: Math.max(contract.progressPercentage || 0, 25),
        status: 'ACTIVE'
      };
      const updated = await updateContract(contract.id, payload);
      setContract(updated);
      setMessage(`${role === 'client' ? 'Client' : 'Freelancer'} approval recorded.`);
    } catch (err) {
      setMessage('Approval could not be saved.');
    } finally {
      setBusy(false);
    }
  };

  const handleProgressUpdate = async (delta) => {
    if (!contract) return;
    setBusy(true);
    try {
      const nextProgress = Math.min(100, (contract.progressPercentage || 0) + delta);
      const updated = await updateContract(contract.id, {
        progressPercentage: nextProgress,
        status: nextProgress >= 100 ? 'COMPLETED' : 'ACTIVE'
      });
      setContract(updated);
      setMessage(`Progress updated to ${nextProgress}%.`);
    } catch (err) {
      setMessage('Progress update failed.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <div className="page"><div className="container"><p>Loading contract workspace...</p></div></div>;
  }

  if (!contract) {
    return <div className="page"><div className="container"><p>Contract not found.</p></div></div>;
  }

  const isClient = user.userType === 'client';
  const isFreelancer = user.userType === 'freelancer';
  const approvalsComplete = Boolean(contract.clientApproval) && Boolean(contract.freelancerApproval);
  const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const clientProfile = storedUsers.find((item) => Number(item.id) === Number(contract.clientId || project?.clientId)) || {};
  const freelancerProfile = storedUsers.find((item) => Number(item.id) === Number(contract.freelancerId || proposal?.freelancerId)) || {};
  const clientName = clientProfile.companyName || clientProfile.fullName || clientProfile.username || clientProfile.email || 'Not provided';
  const freelancerName = freelancerProfile.fullName || freelancerProfile.username || freelancerProfile.email || 'Not provided';

  const handleDownloadContract = () => {
    downloadContractPdf({
      contract,
      project,
      proposal,
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || user
    });
  };

  return (
    <div className="page contract-detail-page">
      <div className="container" style={{ maxWidth: '900px' }}>
        <button className="btn-secondary-small" onClick={() => navigate('/contracts')} style={{ marginBottom: '20px' }}>
          ← Back to Contracts
        </button>

        <div className="dashboard-card-premium" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ marginBottom: '6px' }}>{project?.title || contract.projectTitle || 'Project Contract'}</h1>
              <p style={{ margin: 0, color: '#6c757d' }}>Contract #{contract.id} • Live workspace</p>
            </div>
            <span style={{ background: '#e8f5e9', color: '#2e7d32', borderRadius: '999px', padding: '6px 12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              {approvalsComplete ? 'Approval Ready' : 'Awaiting Approvals'}
            </span>
          </div>

          <div className="contract-parties">
            <div>
              <span>Company / Client</span>
              <strong>{clientName}</strong>
              <small>Authentication: {clientProfile.email || 'Account identity recorded'}</small>
            </div>
            <div>
              <span>Freelancer / Worker</span>
              <strong>{freelancerName}</strong>
              <small>Age: {freelancerProfile.age || 'Not provided'} | Domain: {project?.category || freelancerProfile.domain || 'Not provided'}</small>
            </div>
          </div>

          <div className="progress-container" style={{ marginTop: '20px' }}>
            <div className="progress-label">
              <span>Work Progress</span>
              <span>{contract.progressPercentage || 0}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${contract.progressPercentage || 0}%` }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '20px' }}>
            <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '12px' }}>
              <strong>Budget</strong>
              <p style={{ margin: '6px 0 0' }}>${contract.amount || proposal?.bidAmount || 0}</p>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '12px' }}>
              <strong>Status</strong>
              <p style={{ margin: '6px 0 0' }}>{contract.status || 'ACTIVE'}</p>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '12px' }}>
              <strong>Payment</strong>
              <p style={{ margin: '6px 0 0' }}>{contract.paymentStatus || 'PENDING'}</p>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '12px' }}>
              <strong>Started</strong>
              <p style={{ margin: '6px 0 0' }}>{contract.startDate || '—'}</p>
            </div>
          </div>

          {message && <p style={{ marginTop: '16px', color: '#0b5fff' }}>{message}</p>}

          <div style={{ marginTop: '24px', display: 'grid', gap: '16px' }}>
            <div style={{ border: '1px solid #e9ecef', borderRadius: '10px', padding: '16px' }}>
              <h3 style={{ marginTop: 0 }}>Approvals</h3>
              <p style={{ color: '#666' }}>Both sides must approve before the project is fully active.</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {(isClient || isFreelancer) && (
                  <button className="btn-primary-small" disabled={busy} onClick={() => handleApproval('client')}>
                    {isClient ? 'Approve as Client' : 'Client Approval'}
                  </button>
                )}
                {(isFreelancer || isClient) && (
                  <button className="btn-secondary-small" disabled={busy} onClick={() => handleApproval('freelancer')}>
                    {isFreelancer ? 'Approve as Freelancer' : 'Freelancer Approval'}
                  </button>
                )}
              </div>
              <div style={{ marginTop: '10px', fontSize: '0.95rem', color: '#495057' }}>
                <p>Client approval: <strong>{contract.clientApproval ? 'Approved' : 'Pending'}</strong></p>
                <p>Freelancer approval: <strong>{contract.freelancerApproval ? 'Approved' : 'Pending'}</strong></p>
              </div>
            </div>

            <div style={{ border: '1px solid #e9ecef', borderRadius: '10px', padding: '16px' }}>
              <h3 style={{ marginTop: 0 }}>Live Project Tracking</h3>
              <p style={{ color: '#666' }}>Bring the contract forward with milestone updates so both dashboards stay in sync.</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn-primary-small" disabled={busy} onClick={() => handleProgressUpdate(10)}>Advance +10%</button>
                <button className="btn-secondary-small" disabled={busy} onClick={() => handleProgressUpdate(25)}>Advance +25%</button>
                <button className="btn-secondary-small" disabled={busy} onClick={() => handleProgressUpdate(100 - (contract.progressPercentage || 0))}>Mark Complete</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn-outline" onClick={handleDownloadContract}>
              Download Contract PDF
            </button>
            <button className="btn-primary" onClick={() => navigate('/payment', { state: { projectId: project?.id || proposal?.projectId, projectTitle: project?.title || contract.projectTitle, bidAmount: contract.amount || proposal?.bidAmount, freelancerId: contract.freelancerId || proposal?.freelancerId, contractId: contract.id, clientId: contract.clientId || user.id } })}>
              Pay Freelancer
            </button>
            <button className="btn-outline" onClick={() => navigate(user.userType === 'client' ? '/company-dashboard' : '/freelancer-dashboard')}>Open Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
}
