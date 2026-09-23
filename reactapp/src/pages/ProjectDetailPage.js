// // pages/ProjectDetailPage.js
// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ProjectDetails from '../components/ProjectDetails';

// export default function ProjectDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const handleBack = () => {
//     navigate('/projects');
//   };
  
//   return (
//     <div className="page project-detail-page">
//       <ProjectDetails projectId={id} onBack={handleBack} />
//     </div>
//   );
// }
// //demo

// //

// pages/ProjectDetailPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetails from '../components/ProjectDetails';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/projects');
  };
  
  return (
    <div className="page project-detail-page">
      <ProjectDetails projectId={id} onBack={handleBack} />
    </div>
  );
}
//demo
