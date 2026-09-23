// // pages/About.js
// import React from 'react';

// export default function About() {
//   return (
//     <div className="page about-page">
//       <div className="container">
//         <h1>About Prolance</h1>
        
//         <section className="about-hero">
//           <div className="about-content">
//             <h2>Connecting Talent with Opportunity</h2>
//             <p>
//               Prolance is a leading freelance platform that brings together skilled professionals 

//               and clients from around the world. Our mission is to create a seamless experience 
//               for freelancers to showcase their talents and for clients to find the perfect match 
//               for their projects.
//             </p>
//             <p>
//               Founded in 2023, we've already helped thousands of businesses and freelancers 
//               collaborate on projects ranging from web development and design to marketing 
//               and content creation.
//             </p>
//           </div>
//           <div className="about-image">
//             <img src="https://via.placeholder.com/500x300?text=Prolance+Team" alt="Prolance Team" />
//           </div>
//         </section>
  
        
//         <section className="stats-section">
//           <h2>Our Impact</h2>
//           <div className="stats-grid">
//             <div className="stat-item">
//               <div className="stat-number">10,000+</div>
//               <div className="stat-label">Registered Freelancers</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-number">5,000+</div>
//               <div className="stat-label">Completed Projects</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-number">$2M+</div>
//               <div className="stat-label">Earned by Freelancers</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-number">95%</div>
//               <div className="stat-label">Client Satisfaction Rate</div>
//             </div>
//           </div>
//         </section>
        
//         <section className="values-section">
//           <h2>Our Values</h2>
//           <div className="values-grid">
//             <div className="value-item">
//               <h3>Quality</h3>
//               <p>We maintain high standards for both freelancers and projects to ensure exceptional results.</p>
//             </div>
//             <div className="value-item">
//               <h3>Transparency</h3>
//               <p>Clear communication and honest relationships between clients and freelancers.</p>
//             </div>
//             <div className="value-item">
//               <h3>Innovation</h3>
//               <p>Continuously improving our platform to better serve our community.</p>
//             </div>
//             <div className="value-item">
//               <h3>Community</h3>
//               <p>Building a supportive network where freelancers and clients can thrive together.</p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }      
     
// src/pages/About.js
import React from 'react';

export default function About() {
  return (
    <div className="page about-page">
      <div className="container">
        <h1>About Prolance</h1>
        
        <section className="about-hero">
          <div className="about-content">
            <h2>Connecting Talent with Opportunity</h2>
            <p>
              Prolance is a leading freelance platform that brings together skilled professionals 
              and clients from around the world. Our mission is to create a seamless experience 
              for freelancers to showcase their talents and for clients to find the perfect match 
              for their projects.
            </p>
            <p>
              Founded in 2023, we've already helped thousands of businesses and freelancers 
              collaborate on projects ranging from web development and design to marketing 
              and content creation.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80" 
              alt="Team collaboration" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/600x400?text=Team+Collaboration";
              }}
            />
          </div>
        </section>
     
        
        <section className="stats-section">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Registered Freelancers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Completed Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">$2M+</div>
              <div className="stat-label">Earned by Freelancers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Client Satisfaction Rate</div>
            </div>
          </div>
        </section>
        
        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Quality</h3>
              <p>We maintain high standards for both freelancers and projects to ensure exceptional results.</p>
            </div>
            <div className="value-item">
              <h3>Transparency</h3>
              <p>Clear communication and honest relationships between clients and freelancers.</p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>Continuously improving our platform to better serve our community.</p>
            </div>
            <div className="value-item">
              <h3>Community</h3>
              <p>Building a supportive network where freelancers and clients can thrive together.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}   
//demo
//
       