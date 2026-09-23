// pages/Packages.js
import React, { useState } from 'react';

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState('basic');
  
  const packages = {
    basic: {
      name: 'Basic',
      price: 49,
      features: [
        '1 Project Posting',
        '30 Days Visibility',
        'Basic Support',
        '5 Proposals'
      ],
      recommended: false
    },
    standard: {
      name: 'Standard',
      price: 99,
      features: [
        '5 Project Postings',
        '60 Days Visibility',
        'Priority Support',
        '20 Proposals',
        'Basic Analytics'
      ],
      recommended: true
    },

    premium: {
      name: 'Premium',
      price: 199,
      features: [
        'Unlimited Project Postings',
        '90 Days Visibility',
        '24/7 Support',
        'Unlimited Proposals',
        'Advanced Analytics',
        'Featured Listings'
      ],
      recommended: false
    }
  };
  
  return (
    <div className="page packages-page">
      <div className="container">
        <h1>Packages & Pricing</h1>
        <p className="page-intro">Choose the plan that works best for your needs</p>
        
        <div className="package-tabs">
          <button 
            className={selectedPackage === 'basic' ? 'active' : ''}
            onClick={() => setSelectedPackage('basic')}
          >
            Basic
          </button>
          <button 
            className={selectedPackage === 'standard' ? 'active' : ''}
            onClick={() => setSelectedPackage('standard')}
          >
          
            Standard
          </button>
          <button 
            className={selectedPackage === 'premium' ? 'active' : ''}
            onClick={() => setSelectedPackage('premium')}
          >
            Premium
          </button>
        </div>
        
        <div className="package-content">
          <div className={`package-card ${packages[selectedPackage].recommended ? 'recommended' : ''}`}>
            {packages[selectedPackage].recommended && <div className="recommended-badge">Most Popular</div>}
            <h3>{packages[selectedPackage].name} Package</h3>
            <div className="package-price">${packages[selectedPackage].price}<span>/month</span></div>
            <ul className="package-features">
              {packages[selectedPackage].features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
        
        <div className="package-comparison">
          <h2>Compare Packages</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Basic</th>
                <th>Standard</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Project Postings</td>
                <td>1</td>
                <td>5</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Visibility Duration</td>
                <td>30 days</td>
                <td>60 days</td>
                <td>90 days</td>
              </tr>
              <tr>
                <td>Support</td>
             
                <td>Basic</td>
                <td>Priority</td>
                <td>24/7</td>
              </tr>
              <tr>
                <td>Proposals</td>
                <td>5</td>
                <td>20</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Analytics</td>
                <td>-</td>
                <td>Basic</td>
                <td>Advanced</td>
              </tr>
              <tr>
                <td>Featured Listings</td>
                <td>-</td>
                <td>-</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
//demo
//