import React from 'react';

export default function ProposalList({ pendingProposals, projects, onApprove, onDecline }) {
  return (
    <div>
      {pendingProposals.length > 0 ? (
        <div className="proposals-tracking" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {pendingProposals.map(proposal => {
            const proj = projects.find(p => p.id === proposal.projectId);
            return (
              <div key={proposal.id} className="contract-status-card" style={{ borderLeft: '4px solid #007bff' }}>
                <div className="contract-info-top">
                  <h4>Project: {proj?.title || 'Unknown Project'}</h4>
                  <span className="days-badge" style={{ background: '#007bff', color: '#fff' }}>Bid: ${proposal.bidAmount}</span>
                </div>
                <p style={{ margin: '10px 0', fontSize: '0.95rem', color: '#555' }}>
                  <strong>Message from Freelancer #{proposal.freelancerId}:</strong> "{proposal.proposalText}"
                </p>
                {proposal.resumeLink && (
                  <p style={{ margin: '6px 0', fontSize: '0.9rem', color: '#333' }}>
                    <strong>Resume / Portfolio:</strong>{' '}
                    <a href={proposal.resumeLink} target="_blank" rel="noreferrer">
                      View resume
                    </a>
                  </p>
                )}
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: '#777', margin: '5px 0' }}>
                  <span>Timeframe: {proposal.estimatedDays} Days</span>
                </div>
                <div className="proposal-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button className="btn-primary-small" onClick={() => onApprove(proposal)}>Approve Bid</button>
                  <button 
                    className="btn-secondary-small" 
                    style={{ background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }} 
                    onClick={() => onDecline(proposal)}
                  >
                    Decline Bid
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state-dashboard">
          <p>No new bids received yet.</p>
        </div>
      )}
    </div>
  );
}
