// // pages/Home.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Home() {
//   const navigate = useNavigate();
  
//   return (
//     <div className="page home-page">
//       <section className="hero">
//         <div className="hero-content">
//           <h1>Welcome to Prolance!</h1>
//           <p>Where talent meets opportunity. Build your career or grow your business with our platform.</p>
//           <div className="hero-buttons">
//             <button className="btn-primary" onClick={() => navigate('/register?type=freelancer')}>
//               I'm a Freelancer
//             </button>
//             <button className="btn-secondary" onClick={() => navigate('/register?type=client')}>
//               I'm a Client
//             </button>
//           </div>
//         </div>
//       </section>
      
//       <section className="features">
//         <h2>Why Choose Prolance?</h2>
//         <div className="feature-cards">
//           <div className="feature-card">
//             <h3>For Freelancers</h3>
//             <p>Find projects that match your skills, set your own rates, and build your portfolio.</p>
//           </div>
//           <div className="feature-card">
//             <h3>For Clients</h3>
//             <p>Hire skilled professionals, manage projects, and get quality work delivered on time.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Secure Payments</h3>
//             <p>Our escrow system ensures you only pay for work you're satisfied with.</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


// // src/pages/Home.js - Remove CSS import and use inline styles if needed
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="page home-page">
//       <section className="hero">
//         <div className="hero-content">
//           <div className="hero-text">
//             <h1>Find Top Freelancers for Your Projects</h1>
//             <p>Connect with skilled professionals from around the world. Get your projects done faster and better with Prolance.</p>
//             <div className="hero-buttons">
//               <Link to="/portfolio" className="btn btn-primary">Hire Talent</Link>
//               <Link to="/register" className="btn btn-secondary">Become a Freelancer</Link>
//             </div>
//           </div>
//           <div className="hero-image">
//             <img 
//               src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
//               alt="Freelancer working on design"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "https://via.placeholder.com/600x500?text=Creative+Professionals";
//               }}
//             />
//           </div>
//         </div>
//       </section>

//       <section className="features">
//         <div className="container">
//           <h2>Why Choose Prolance?</h2>
//           <div className="feature-grid">
//             <div className="feature-card">
//               <div className="feature-icon">💼</div>
//               <h3>For Clients</h3>

//               <p>Find skilled freelancers for your projects with our easy-to-use platform.</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">🚀</div>
//               <h3>For Freelancers</h3>
//               <p>Showcase your work and connect with clients looking for your skills.</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">🔒</div>
//               <h3>Secure Payments</h3>
//               <p>Our escrow system ensures you only pay for work you're satisfied with.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="stats">
//         <div className="container">
//           <div className="stats-grid">
//             <div className="stat-item">
//               <h3>10,000+</h3>
//               <p>Registered Freelancers</p>
//             </div>
//             <div className="stat-item">
//               <h3>5,000+</h3>
//               <p>Completed Projects</p>
//             </div>
//             <div className="stat-item">
//               <h3>$2M+</h3>
//               <p>Paid to Freelancers</p>
//             </div>
//             <div className="stat-item">
//               <h3>95%</h3>
//               <p>Client Satisfaction</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


// // src/pages/Home.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   return (
//     <div className="page home-page">
//       <section className="hero">
//         <div className="hero-content">
//           <div className="hero-text">
//             <h1>Find Top Freelancers for Your Projects</h1>
//             <p>Connect with skilled professionals from around the world. Get your projects done faster and better with Prolance.</p>
//             <div className="hero-buttons">
//               <Link to="/portfolio" className="btn btn-primary">Hire Talent</Link>
//               <Link to="/register" className="btn btn-secondary">Become a Freelancer</Link>
//             </div>
//           </div>
//           <div className="hero-image">
//             <img 
//               src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
//               alt="Freelancer working on design"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "https://via.placeholder.com/600x500?text=Creative+Professionals";
//               }}
//             />
//           </div>
//         </div>
//       </section>

//       <section className="features">
//         <div className="container">
//           <h2>Why Choose Prolance?</h2>
//           <div className="feature-grid">
//             <div className="feature-card">
//               <div className="feature-icon">💼</div>
//               <h3>For Clients</h3>
//               <p>Find skilled freelancers for your projects with our easy-to-use platform.</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">🚀</div>
//               <h3>For Freelancers</h3>
//               <p>Showcase your work and connect with clients looking for your skills.</p>
         
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">🔒</div>
//               <h3>Secure Payments</h3>
//               <p>Our escrow system ensures you only pay for work you're satisfied with.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="stats">
//         <div className="container">
//           <div className="stats-grid">
//             <div className="stat-item">
//               <h3>10,000+</h3>
//               <p>Registered Freelancers</p>
//             </div>
//             <div className="stat-item">
//               <h3>5,000+</h3>
//               <p>Completed Projects</p>
//             </div>
//             <div className="stat-item">
//               <h3>$2M+</h3>
//               <p>Paid to Freelancers</p>
//             </div>
//             <div className="stat-item">
//               <h3>95%</h3>
//               <p>Client Satisfaction</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
// //demo
// //

// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Find Top Freelancers for Your Projects</h1>
            <p>Connect with skilled professionals from around the world. Get your projects done faster and better with Prolance.</p>
            <div className="hero-buttons">
              <Link to="/register?type=client" className="btn btn-primary">Hire Talent</Link>
              <Link to="/register?type=freelancer" className="btn btn-secondary">Become a Freelancer</Link>
              <Link to="/portfolio" className="btn btn-outline">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

     
      <section className="features">
        <div className="container">
          <h2>Why Choose Prolance?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>For Clients</h3>
              <p>Find skilled freelancers for your projects with our easy-to-use platform.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>For Freelancers</h3>
              <p>Showcase your work and connect with clients looking for your skills.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>Our escrow system ensures you only pay for work you're satisfied with.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Registered Freelancers</p>
            </div>
            <div className="stat-item">
              <h3>5,000+</h3>
              <p>Completed Projects</p>
            </div>
            <div className="stat-item">
              <h3>$2M+</h3>
              <p>Paid to Freelancers</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of clients and freelancers who are already benefiting from our platform.</p>
          <div className="cta-buttons">
            <Link to="/portfolio" className="btn btn-primary">Explore Portfolio</Link>
            <Link to="/register" className="btn btn-secondary">Create Account</Link>
          </div>
        </div>
      </section>  
    </div>
  );
}
