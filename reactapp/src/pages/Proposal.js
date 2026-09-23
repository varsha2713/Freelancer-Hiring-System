// // pages/Proposal.js
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// export default function Proposal() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { projectId, projectTitle, client } = location.state || {};
  
//   const [proposalData, setProposalData] = useState({
//     coverLetter: '',
//     bidAmount: '',
//     timeframe: '',
//     milestones: ''
//   });
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Proposal submission logic here
//     console.log('Proposal submitted:', proposalData);
    
//     // Navigate to payment page after submitting proposal
//     navigate('/payment', {
//       state: {
//         projectId,
//         projectTitle,
//         bidAmount: proposalData.bidAmount
//       }
//     });
//   };
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProposalData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   return (
//     <div className="page proposal-page">
//       <div className="container">
//         <div className="page-header">
//           <h1>Submit Proposal</h1>
//           <button className="btn-outline" onClick={() => navigate(-1)}>
//             Back
//           </button>
//         </div>
        
//         {projectTitle && (
//           <div className="project-info">
//             <h2>Project: {projectTitle}</h2>
//             {client && <p>Client: {client}</p>}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="proposal-form">
//           <div className="form-group">
//             <label>Cover Letter</label>
//             <textarea
//               name="coverLetter"
//               value={proposalData.coverLetter}
//               onChange={handleChange}
//               placeholder="Explain why you're the best fit for this project..."
//               rows="6"
//               required
//             />
//           </div>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label>Bid Amount ($)</label>
//               <input
             
//                 type="number"
//                 name="bidAmount"
//                 value={proposalData.bidAmount}
//                 onChange={handleChange}
//                 placeholder="Enter your proposed amount"
//                 min="1"
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Timeframe (days)</label>
//               <input
//                 type="number"
//                 name="timeframe"
//                 value={proposalData.timeframe}
//                 onChange={handleChange}
//                 placeholder="Estimated days to complete"
//                 min="1"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label>Milestones</label>
//             <textarea
//               name="milestones"
//               value={proposalData.milestones}
//               onChange={handleChange}
//               placeholder="Describe key milestones and deliverables..."
//               rows="4"
//               required
//             />
//           </div>
          
//           <div className="form-actions">
//             <button type="button" className="btn-outline" onClick={() => navigate(-1)}>
//               Cancel
//             </button>
//             <button type="submit" className="btn-primary">
//               Submit Proposal
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// //demo
// //demo

// pages/Proposal.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Proposal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, projectTitle, client } = location.state || {};
  
  const [proposalData, setProposalData] = useState({
    coverLetter: '',
    bidAmount: '',
    timeframe: '',
    milestones: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Proposal submission logic here
    console.log('Proposal submitted:', proposalData);
    
    // Navigate to payment page after submitting proposal
    navigate('/payment', {
      state: {
        projectId,
        projectTitle,
        bidAmount: proposalData.bidAmount
      }
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProposalData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="page proposal-page">
      <div className="container">
        <div className="page-header">
          <h1>Submit Proposal</h1>
          <button className="btn-outline" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        
        {projectTitle && (
          <div className="project-info">
            <h2>Project: {projectTitle}</h2>
            {client && <p>Client: {client}</p>}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="proposal-form">
          <div className="form-group">
            <label>Cover Letter</label>
            <textarea
              name="coverLetter"
              value={proposalData.coverLetter}
              onChange={handleChange}
              placeholder="Explain why you're the best fit for this project..."
              rows="6"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Bid Amount ($)</label>
              <input
             
                type="number"
                name="bidAmount"
                value={proposalData.bidAmount}
                onChange={handleChange}
                placeholder="Enter your proposed amount"
                min="1"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Timeframe (days)</label>
              <input
                type="number"
                name="timeframe"
                value={proposalData.timeframe}
                onChange={handleChange}
                placeholder="Estimated days to complete"
                min="1"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Milestones</label>
            <textarea
              name="milestones"
              value={proposalData.milestones}
              onChange={handleChange}
              placeholder="Describe key milestones and deliverables..."
              rows="4"
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
//demo
