

// // // pages/Contracts.js - Updated with navigation
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // export default function Contracts() {
// //   const [contracts, setContracts] = useState([]);
// //   const [activeTab, setActiveTab] = useState('active');
// //   const navigate = useNavigate();
  
// //   useEffect(() => {
// //     // Simulate fetching contracts
// //     const mockContracts = [
// //       {
// //         id: 1,
// //         title: 'E-commerce Website Development',
// //         client: 'ABC Company',
// //         freelancer: 'John Doe',
// //         value: 2500,
// //         status: 'active',
// //         startDate: '2023-06-01',
// //         endDate: '2023-08-15'
// //       },
// //       {
// //         id: 2,
// //         title: 'Mobile App Design',
// //         client: 'XYZ Inc',
// //         freelancer: 'Jane Smith',
// //         value: 1800,
// //         status: 'completed',
// //         startDate: '2023-05-10',
// //         endDate: '2023-07-20'
// //       },
// //       {
// //         id: 3,
// //         title: 'SEO Optimization',
// //         client: '123 Business',
// //         freelancer: 'Mike Johnson',
// //         value: 1200,
// //         status: 'active',
// //         startDate: '2023-07-01',
// //         endDate: '2023-09-30'
// //       }
// //     ];
    
// //     setContracts(mockContracts);
// //   }, []);
  
// //   const handleCompleteContract = (contractId) => {
// //     // Navigate to proposal page first, then to payment
// //     navigate('/projects'); // This would typically go to a proposal page
// //     // After proposal is submitted, navigate to payment
// //     setTimeout(() => {
// //       navigate('/payment');
// //     }, 1000);
// //   };
  
  
// //   const filteredContracts = contracts.filter(contract => contract.status === activeTab);
  
// //   return (
// //     <div className="page contracts-page">
// //       <div className="container">
// //         <h1>Contracts</h1>
        
// //         <div className="tabs">
// //           <button 
// //             className={activeTab === 'active' ? 'active' : ''}
// //             onClick={() => setActiveTab('active')}
// //           >
// //             Active Contracts
// //           </button>
// //           <button 
// //             className={activeTab === 'completed' ? 'active' : ''}
// //             onClick={() => setActiveTab('completed')}
// //           >
// //             Completed Contracts
// //           </button>
// //         </div>
        
// //         <div className="contracts-list">
// //           {filteredContracts.length > 0 ? (
// //             filteredContracts.map(contract => (
// //               <div key={contract.id} className="contract-card">
// //                 <h3>{contract.title}</h3>
// //                 <div className="contract-details">
// //                   <p><strong>Client:</strong> {contract.client}</p>
// //                   <p><strong>Freelancer:</strong> {contract.freelancer}</p>
// //                   <p><strong>Value:</strong> ${contract.value}</p>
// //                   <p><strong>Duration:</strong> {contract.startDate} to {contract.endDate}</p>
// //                   <p><strong>Status:</strong> <span className={`status ${contract.status}`}>{contract.status}</span></p>
// //                 </div>
// //                 <div className="contract-actions">
// //                   <button className="btn-outline">View Details</button>
// //                   {contract.status === 'active' && (
// //                     <button 
// //                       className="btn-primary"
// //                       onClick={() => handleCompleteContract(contract.id)}
// //                     >
// //                       Complete Contract
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <p>No {activeTab} contracts found.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// Update Contracts.js to navigate to proposal page
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchContracts, fetchProjects, fetchProposals, fetchPayments } from '../utils/api';
import { downloadContractPdf } from '../utils/contractPdf';

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ACTIVE');
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [cData, pData, prData, payData] = await Promise.all([
          fetchContracts(),
          fetchProposals(),
          fetchProjects(),
          fetchPayments()
        ]);
        setContracts(cData);
        setProposals(pData);
        setProjects(prData);
        setPayments(payData);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);
  
  const getContractDetails = (contract) => {
    const proposal = proposals.find(p => p.id === contract.proposalId);
    if (!proposal) return { title: 'Unknown Project', value: 0, projectId: null };
    
    const project = projects.find(pr => pr.id === proposal.projectId);
    const hasPayment = payments.some(pay => pay.projectId === proposal.projectId);
    
    return {
      title: project ? project.title : 'Deleted Project',
      value: proposal.bidAmount,
      projectId: proposal.projectId,
      isPaid: hasPayment
    };
  };
  
  const handleCompleteContract = (contract, details) => {
    navigate('/payment', {
      state: {
        projectId: details.projectId,
        projectTitle: details.title,
        bidAmount: details.value
      }
    });
  };

  const handleDownloadProposal = (contract, details) => {
    const proposal = proposals.find((item) => item.id === contract.proposalId);
    const project = projects.find((item) => item.id === proposal?.projectId);
    downloadContractPdf({
      contract,
      project,
      proposal,
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || {}
    });
  };
  
  if (loading) return <div className="page loader">Loading contracts...</div>;
  
  const filteredContracts = contracts.filter(c => c.status === activeTab);
  
  return (
    <div className="page contracts-page">
      <div className="container">
        <h1>Member Contracts & Payments</h1>
        
        <div className="tabs">
          <button 
            className={activeTab === 'ACTIVE' ? 'active' : ''}
            onClick={() => setActiveTab('ACTIVE')}
          >
            Active
          </button>
          <button 
            className={activeTab === 'COMPLETED' ? 'active' : ''}
            onClick={() => setActiveTab('COMPLETED')}
          >
            Completed
          </button>
        </div>
        
        <div className="contracts-list">
          {filteredContracts.length > 0 ? (
            filteredContracts.map(contract => {
              const details = getContractDetails(contract);
              return (
                <div key={contract.id} className="contract-card card">
                  <div className="contract-header">
                    <h3>{details.title}</h3>
                    <span className={`payment-badge ${details.isPaid ? 'paid' : 'unpaid'}`}>
                      {details.isPaid ? '✓ PAID' : 'UNPAID'}
                    </span>
                  </div>
                  
                  <div className="contract-details">
                    <p><strong>Value:</strong> ${details.value}</p>
                    <p><strong>Terms:</strong> {contract.paymentTerms}</p>
                    <p><strong>Started:</strong> {contract.startDate}</p>
                    <p><strong>Status:</strong> <span className={`status-pill ${contract.status}`}>{contract.status}</span></p>
                  </div>
                  
                  <div className="contract-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => handleDownloadProposal(contract, details)}
                    >
                      Download Contract PDF
                    </button>
                    <button className="btn btn-outline" onClick={() => navigate(`/contracts/${contract.id}`)}>
                      Open Contract Workspace
                    </button>

                    {!details.isPaid && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleCompleteContract(contract, details)}
                      >
                        Proceed to Payment
                      </button>
                    )}
                    {details.isPaid && <button className="btn btn-secondary disabled" disabled>Payment Complete</button>}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="empty-msg">No {activeTab.toLowerCase()} contracts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

