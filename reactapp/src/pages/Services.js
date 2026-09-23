// // pages/Services.js
// import React from 'react';

// export default function Services() {
//   const services = [
//     {
//       title: 'Web Development',
//       description: 'Custom website development from simple landing pages to complex web applications',
//       icon: '💻',
//       features: ['Responsive Design', 'Frontend & Backend', 'E-commerce Solutions']
//     },
//     {
//       title: 'Mobile App Development',
//       description: 'Native and cross-platform mobile applications for iOS and Android',
//       icon: '📱',
//       features: ['iOS & Android', 'React Native', 'UI/UX Design']
//     },
//     {
//       title: 'UI/UX Design',
//       description: 'User-centered design solutions that enhance user experience and engagement',
//       icon: '🎨',
//       features: ['Wireframing', 'Prototyping', 'User Testing']
//     },
//     {
//       title: 'Digital Marketing',
//       description: 'Comprehensive digital marketing strategies to grow your online presence',
//       icon: '📈',
//       features: ['SEO', 'Social Media', 'Content Marketing']
//     },
//     {
//       title: 'Content Writing',
//       description: 'High-quality content creation for websites, blogs, and marketing materials',
//       icon: '✏️',
//       features: ['SEO Optimization', 'Blog Posts', 'Copywriting']
//     },
//     {
//       title: 'Data Analysis',
//       description: 'Data-driven insights and visualization to help make informed business decisions',
//       icon: '📊',
//       features: ['Data Visualization', 'Statistical Analysis', 'Reports']
//     }
//   ];
  
//   return (
//     <div className="page services-page">
//       <div className="container">
//         <h1>Our Services</h1>
//         <p className="page-intro">Explore the wide range of services offered by our talented freelancers</p>
     
        
//         <div className="services-grid">
//           {services.map(service => (
//             <div key={service.title} className="service-card">
//               <div className="service-icon">{service.icon}</div>
//               <h3>{service.title}</h3>
//               <p>{service.description}</p>
//               <ul className="service-features">
//                 {service.features.map(feature => (
//                   <li key={feature}>{feature}</li>
//                 ))}
//               </ul>
//               <button className="btn-outline">Find Experts</button>
//             </div>
//           ))}
//         </div>
        
//         <div className="cta-section">
//           <h2>Ready to get started?</h2>
//           <p>Post a project today and receive proposals from skilled freelancers</p>
//           <button className="btn-primary">Post a Project</button>
//         </div>
//       </div>
//     </div>
//   );
// }   
     
// pages/Services.js - Updated with navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Services() {
  const navigate = useNavigate();
  
  const services = [
    {
      title: 'Web Development',
      description: 'Custom website development from simple landing pages to complex web applications',
      icon: '💻',
      features: ['Responsive Design', 'Frontend & Backend', 'E-commerce Solutions']
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      icon: '📱',
      features: ['iOS & Android', 'React Native', 'UI/UX Design']
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience and engagement',
      icon: '🎨',
      features: ['Wireframing', 'Prototyping', 'User Testing']
    },
    {
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence',
      icon: '📈',
      features: ['SEO', 'Social Media', 'Content Marketing']
    },
    {
      title: 'Content Writing',
      description: 'High-quality content creation for websites, blogs, and marketing materials',
      icon: '✏️',
      features: ['SEO Optimization', 'Blog Posts', 'Copywriting']
    },
    {
      title: 'Data Analysis',
      description: 'Data-driven insights and visualization to help make informed business decisions',
      icon: '📊',
      features: ['Data Visualization', 'Statistical Analysis', 'Reports']
    }
  ];
  
  const handleFindExperts = () => {
    navigate('/portfolio');
  };
 
  
  return (
    <div className="page services-page">
      <div className="container">
        <h1>Our Services</h1>
        <p className="page-intro">Explore the wide range of services offered by our talented freelancers</p>
        
        <div className="services-grid">
          {services.map(service => (
            <div key={service.title} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button className="btn-outline" onClick={handleFindExperts}>
                Find Experts
              </button>
            </div>
          ))}
        </div>
        
        <div className="cta-section">
          <h2>Ready to get started?</h2>
          <p>Post a project today and receive proposals from skilled freelancers</p>
          <button className="btn-primary">Post a Project</button>
        </div>
      </div>
    </div>
  );
}
//demo

//demo

