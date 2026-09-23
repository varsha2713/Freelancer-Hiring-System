import React, { useState, useEffect } from 'react';
import { submitReview, fetchReviewsByContract, updateContract } from '../../utils/api';

export default function ContractList({ 
  contracts, 
  user, 
  isActive, 
  onPay, 
  navigate,
  calculateDaysInProject,
  calculateDaysPending 
}) {
  const [reviewForms, setReviewForms] = useState({});
  const [existingReviews, setExistingReviews] = useState({});
  const [submitStates, setSubmitStates] = useState({});
  const [updatingContractId, setUpdatingContractId] = useState(null);

  useEffect(() => {
    // If it's completed contracts, load existing reviews
    if (!isActive && contracts.length > 0) {
      contracts.forEach(async (c) => {
        try {
          const reviews = await fetchReviewsByContract(c.id);
          if (reviews && reviews.length > 0) {
            setExistingReviews(prev => ({
              ...prev,
              [c.id]: reviews
            }));
          }
        } catch (err) {
          console.error("Error fetching reviews for contract " + c.id, err);
        }
      });
    }
  }, [contracts, isActive]);

  const handleReviewChange = (contractId, field, value) => {
    setReviewForms(prev => ({
      ...prev,
      [contractId]: {
        ...prev[contractId],
        [field]: value
      }
    }));
  };

  const handleProgressUpdate = async (contract, delta) => {
    try {
      setUpdatingContractId(contract.id);
      const nextProgress = Math.min(100, (contract.progressPercentage || 0) + delta);
      await updateContract(contract.id, {
        progressPercentage: nextProgress,
        status: nextProgress >= 100 ? 'COMPLETED' : 'ACTIVE'
      });
      alert(`Progress updated to ${nextProgress}%.`);
      window.location.reload();
    } catch (err) {
      alert('Failed to update progress.');
    } finally {
      setUpdatingContractId(null);
    }
  };

  const handleReviewSubmit = async (e, contractId, contract) => {
    e.preventDefault();
    const formData = reviewForms[contractId] || { rating: 5, feedback: "" };
    
    // Determine reviewer and reviewee
    const reviewerId = user.id;
    // For client reviewer, reviewee is freelancer. For freelancer reviewer, reviewee is client.
    // In enriched contracts, we have freelancerId or client details.
    let revieweeId = contract.freelancerId;
    if (user.userType === 'freelancer') {
      // Find client id of the project
      revieweeId = contract.clientId || 101; // fallback
    }

    const reviewData = {
      contractId: contract.id,
      reviewerId: reviewerId,
      revieweeId: revieweeId,
      rating: parseInt(formData.rating || 5),
      feedback: formData.feedback || "Great working together!",
      reviewerType: user.userType
    };

    try {
      setSubmitStates(prev => ({ ...prev, [contractId]: 'submitting' }));
      const newReview = await submitReview(reviewData);
      setExistingReviews(prev => ({
        ...prev,
        [contractId]: [...(prev[contractId] || []), newReview]
      }));
      setSubmitStates(prev => ({ ...prev, [contractId]: 'success' }));
      alert("Review submitted successfully!");
    } catch (err) {
      alert("Failed to submit review: " + err.message);
      setSubmitStates(prev => ({ ...prev, [contractId]: 'error' }));
    }
  };

  return (
    <div className="contracts-tracking">
      {contracts.map(contract => {
        const hasReviewed = existingReviews[contract.id]?.some(r => r.reviewerId === user.id);
        const reviewsForThis = existingReviews[contract.id] || [];

        return (
          <div key={contract.id} className={`contract-status-card ${user.userType === 'client' ? 'company-card' : ''}`}>
            <div className="contract-info-top">
              <h4>{contract.projectTitle} (ID: #{contract.id})</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span className="days-badge">Completed: {calculateDaysInProject(contract.startDate)} Days</span>
                {isActive && (
                  <span className="days-badge" style={{ background: '#ffa500', color: '#fff' }}>
                    Pending: {calculateDaysPending(contract.deadline)} Days
                  </span>
                )}
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-label">
                <span>{isActive ? "Overall Project Health" : "Status"}</span>
                <span>{contract.progressPercentage || 0}% Complete</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${contract.progressPercentage || 0}%` }}
                ></div>
              </div>
            </div>

            {/* Actions for Active Contracts */}
            {isActive && (
              <div className="contract-actions" style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn-secondary-small" onClick={() => navigate(`/contracts/${contract.id}`)}>
                  Open Contract Workspace
                </button>
                <button className="btn-primary-small" disabled={updatingContractId === contract.id} onClick={() => handleProgressUpdate(contract, 10)}>
                  {updatingContractId === contract.id ? 'Updating...' : 'Advance +10%'}
                </button>
                {user.userType === 'client' && onPay && (
                  <button className="btn-primary-small" onClick={() => onPay(contract)}>
                    Pay Freelancer (${contract.bidAmount || 1500})
                  </button>
                )}
              </div>
            )}

            {/* Reviews / Feedback area for Completed Contracts */}
            {!isActive && (
              <div className="reviews-section" style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <h5>Ratings & Reviews</h5>
                
                {/* Existing reviews for this contract */}
                {reviewsForThis.length > 0 && (
                  <div className="existing-reviews" style={{ marginBottom: '15px' }}>
                    {reviewsForThis.map(r => (
                      <div key={r.id} style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px', marginBottom: '8px', borderLeft: '3px solid #28a745' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                          <strong>{r.reviewerType === 'client' ? 'Client Feedback' : 'Freelancer Feedback'}</strong>
                          <span style={{ color: '#ffc107' }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                        </div>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#555' }}>"{r.feedback}"</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submission Form */}
                {!hasReviewed ? (
                  <form onSubmit={(e) => handleReviewSubmit(e, contract.id, contract)} style={{ background: '#f1f3f5', padding: '15px', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', fontWeight: 'bold' }}>Leave a Rating & Review:</p>
                    
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '10px', alignItems: 'center' }}>
                      <label style={{ fontSize: '0.85rem' }}>Rating:</label>
                      <select 
                        value={reviewForms[contract.id]?.rating || 5}
                        onChange={(e) => handleReviewChange(contract.id, 'rating', e.target.value)}
                        style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                      >
                        <option value="5">5 Stars (Excellent)</option>
                        <option value="4">4 Stars (Good)</option>
                        <option value="3">3 Stars (Average)</option>
                        <option value="2">2 Stars (Poor)</option>
                        <option value="1">1 Star (Very Poor)</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <textarea 
                        value={reviewForms[contract.id]?.feedback || ""}
                        onChange={(e) => handleReviewChange(contract.id, 'feedback', e.target.value)}
                        placeholder="Write feedback about your experience..."
                        required
                        style={{ width: '100%', minHeight: '60px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-primary-small"
                      disabled={submitStates[contract.id] === 'submitting'}
                    >
                      {submitStates[contract.id] === 'submitting' ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                ) : (
                  <p style={{ color: 'green', fontSize: '0.85rem', margin: '5px 0 0 0' }}>✓ You have already reviewed this contract.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
