// // pages/Payment.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Payment() {
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [cardDetails, setCardDetails] = useState({
//     number: '',
//     name: '',
//     expiry: '',
//     cvv: ''
//   });
//   const navigate = useNavigate();
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Payment processing logic here
//     alert('Payment processed successfully!');
//     navigate('/projects');
//   };
  
//   return (
//     <div className="page payment-page">
//       <div className="container">
//         <h1>Payment</h1>
        
//         <div className="payment-container">
//           <div className="payment-methods">
//             <h3>Select Payment Method</h3>
//             <div className="method-options">
//               <div 
//                 className={`method-option ${paymentMethod === 'card' ? 'active' : ''}`}
//                 onClick={() => setPaymentMethod('card')}
//               >
//                 Credit/Debit Card
//               </div>
//               <div 

//                 className={`method-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
//                 onClick={() => setPaymentMethod('paypal')}
//               >
//                 PayPal
//               </div>
//               <div 
//                 className={`method-option ${paymentMethod === 'bank' ? 'active' : ''}`}
//                 onClick={() => setPaymentMethod('bank')}
//               >
//                 Bank Transfer
//               </div>
//             </div>
//           </div>
          
//           <div className="payment-form">
//             {paymentMethod === 'card' && (
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Card Number</label>
//                   <input
//                     type="text"
//                     value={cardDetails.number}
//                     onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
//                     placeholder="1234 5678 9012 3456"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Cardholder Name</label>
//                   <input
//                     type="text"
//                     value={cardDetails.name}
//                     onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Expiry Date</label>
//                     <input
//                       type="text"
//                       value={cardDetails.expiry}
//                       onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
//                       placeholder="MM/YY"
//                       required
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>CVV</label>
//                     <input
//                       type="text"
//                       value={cardDetails.cvv}
//                       onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
            
//                       placeholder="123"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 <button type="submit" className="btn-primary">Pay Now</button>
//               </form>
//             )}
            
//             {paymentMethod === 'paypal' && (
//               <div className="paypal-info">
//                 <p>You will be redirected to PayPal to complete your payment.</p>
//                 <button className="btn-primary">Continue to PayPal</button>
//               </div>
//             )}
            
//             {paymentMethod === 'bank' && (
//               <div className="bank-info">
//                 <p>Please transfer the payment to the following bank account:</p>
//                 <div className="bank-details">
//                   <p><strong>Bank Name:</strong> Prolance Bank</p>
//                   <p><strong>Account Number:</strong> 1234567890</p>
//                   <p><strong>Routing Number:</strong> 021000021</p>
//                   <p><strong>SWIFT/BIC:</strong> PRLANCEX</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/pages/Payment.js - Remove unused projectId
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// export default function Payment() {
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [cardDetails, setCardDetails] = useState({
//     number: '',
//     name: '',
//     expiry: '',
//     cvv: ''
//   });
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { projectTitle, bidAmount } = location.state || {}; // Removed projectId
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Payment processing logic here
//     alert('Payment processed successfully!');
    
//     // Navigate back to home page after payment completion
//     navigate('/');
//   };
  
//   return (
//     <div className="page payment-page">
//       <div className="container">
//         <h1>Payment</h1>
        
//         {projectTitle && (
//           <div className="payment-summary">
//             <h3>Project: {projectTitle}</h3>
//             {bidAmount && <p>Amount: ${bidAmount}</p>}
//           </div>
//         )}
        
//         <div className="payment-container">
//           <div className="payment-methods">
//             <h3>Select Payment Method</h3>
//             <div className="method-options">
//               <div 
//                 className={`method-option ${paymentMethod === 'card' ? 'active' : ''}`}
//                 onClick={() => setPaymentMethod('card')}
//               >
//                 Credit/Debit Card
//               </div>
//               <div 
//                 className={`method-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
//                 onClick={() => setPaymentMethod('paypal')}
//               >
//                 PayPal
//               </div>
//               <div 
//                 className={`method-option ${paymentMethod === 'bank' ? 'active' : ''}`}
//                 onClick={() => setPaymentMethod('bank')}
//               >
//                 Bank Transfer
//               </div>
//             </div>
//           </div>
          
        
          
//           <div className="payment-form">
//             {paymentMethod === 'card' && (
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Card Number</label>
//                   <input
//                     type="text"
//                     value={cardDetails.number}
//                     onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
//                     placeholder="1234 5678 9012 3456"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Cardholder Name</label>
//                   <input
//                     type="text"
//                     value={cardDetails.name}
//                     onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Expiry Date</label>
//                     <input
//                       type="text"
//                       value={cardDetails.expiry}
//                       onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
//                       placeholder="MM/YY"
//                       required
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>CVV</label>
//                     <input
//                       type="text"
//                       value={cardDetails.cvv}
//                       onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
//                       placeholder="123"
//                       required
//                     />
//                   </div>
//                 </div>
             
                
//                 <button type="submit" className="btn-primary">Pay Now</button>
//               </form>
//             )}
            
//             {paymentMethod === 'paypal' && (
//               <div className="paypal-info">
//                 <p>You will be redirected to PayPal to complete your payment.</p>
//                 <button className="btn-primary" onClick={handleSubmit}>Continue to PayPal</button>
//               </div>
//             )}
            
//             {paymentMethod === 'bank' && (
//               <div className="bank-info">
//                 <p>Please transfer the payment to the following bank account:</p>
//                 <div className="bank-details">
//                   <p><strong>Bank Name:</strong> Prolance Bank</p>
//                   <p><strong>Account Number:</strong> 1234567890</p>
//                   <p><strong>Routing Number:</strong> 021000021</p>
//                   <p><strong>SWIFT/BIC:</strong> PRLANCEX</p>
//                 </div>
//                 <button className="btn-primary" onClick={handleSubmit}>Confirm Bank Transfer</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }   
               
// src/pages/Payment.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { submitPayment } from '../utils/api';

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { projectTitle, bidAmount } = location.state || {};
  
  const freelancerId = location.state?.freelancerId;
  const contractId = location.state?.contractId;
  const clientId = location.state?.clientId || user.id;
  const savedUpi = freelancerId ? localStorage.getItem(`upi_details_${freelancerId}`) : null;
  const savedCard = freelancerId ? localStorage.getItem(`card_details_${freelancerId}`) : null;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentData = {
        projectId: location.state?.projectId || 1,
        projectTitle: projectTitle,
        amount: Number(bidAmount || 0),
        freelancerId: freelancerId,
        clientId: clientId,
        contractId: contractId,
        paymentMethod: paymentMethod,
        cardName: cardDetails.name,
        cardNumber: cardDetails.number
      };
      await submitPayment(paymentData);
      alert('Payment processed successfully!');
      navigate('/contracts');
    } catch (err) {
      alert('Payment failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };
  
  return (
    <div className="page payment-page">
      <div className="container">
        <h1>Payment</h1>
        
        {projectTitle && (
          <div className="payment-summary">
            <h3>Project: {projectTitle}</h3>
            {bidAmount && <p>Amount: ${bidAmount}</p>}
            {(savedUpi || savedCard) && (
              <div style={{ marginTop: '15px', padding: '10px', background: '#e9ecef', borderRadius: '4px', textAlign: 'left' }}>
                <strong style={{ color: '#333' }}>👤 Freelancer Payment Preferences:</strong>
                {savedUpi && <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>UPI ID: <span style={{ color: '#007bff', fontWeight: 'bold' }}>{savedUpi}</span></p>}
                {savedCard && <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>Card Details: <span style={{ color: '#007bff', fontWeight: 'bold' }}>{savedCard}</span></p>}
              </div>
            )}
          </div>
        )}
        
        <div className="payment-container">
          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            <div className="method-options">
              <div 
                className={`method-option ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                Credit/Debit Card
              </div>
              <div 
                className={`method-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('paypal')}
              >
                PayPal
              </div>
              <div 
                className={`method-option ${paymentMethod === 'bank' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('bank')}
              >
                Bank Transfer
              </div>
            </div>
          </div>
        
          
          <div className="payment-form">
            {paymentMethod === 'card' && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
       
                
                <button type="submit" className="btn-primary">Pay Now</button>
              </form>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="paypal-info">
                <p>You will be redirected to PayPal to complete your payment.</p>
                <button className="btn-primary" onClick={handleSubmit}>Continue to PayPal</button>
              </div>
            )}
            
            {paymentMethod === 'bank' && (
              <div className="bank-info">
                <p>Please transfer the payment to the following bank account:</p>
                <div className="bank-details">
                  <p><strong>Bank Name:</strong> Prolance Bank</p>
                  <p><strong>Account Number:</strong> 1234567890</p>
                  <p><strong>Routing Number:</strong> 021000021</p>
                  <p><strong>SWIFT/BIC:</strong> PRLANCEX</p>
                </div>
                <button className="btn-primary" onClick={handleSubmit}>Confirm Bank Transfer</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}         
     //demo
     
     //
          
