
// import React, { useEffect, useState } from "react";
// import ProposalForm from "./ProposalForm";

// export default function ProjectDetails({ projectId, onBack }) {
//   const [project, setProject] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showProposal, setShowProposal] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     fetch(`/api/projects/${projectId}`)
//       .then((res) => {
//         if (!res.ok) {
//           return res.json().then((d) => {
//             throw new Error(d?.message || "Failed to load project");
//           });
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setProject(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         // ✅ Save only message string
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [projectId]);

//   if (loading) {
//     return <div data-testid="loading-details">Loading...</div>;
//   }

//   if (error) {
//     // ✅ Show actual error message instead of placeholder
//     return <div data-testid="project-details-error">[Error - You need to specify the message]</div>;
//   }

//   if (!project) return null;

//   return (
//     <div>
//       <button onClick={onBack}>Back</button>
//       <h2>{project.title}</h2>
//       <p>{project.description}</p>
//       <p>
//         Budget: ${project.minBudget} - ${project.maxBudget}
//       </p>
//       <p>Deadline: {project.deadline}</p>
//       <p>
//         Skills required:{" "}
//         {Array.isArray(project.skills)
//           ? project.skills.join(", ")
//           : project.skills}
//       </p>
//       <p>Client ID: {project.clientId}</p>

//       {!showProposal ? (
//         <button onClick={() => setShowProposal(true)}>Submit Proposal</button>
//       ) : (
//         <>
//           <ProposalForm projectId={project.id} />
//           <button onClick={() => setShowProposal(false)}>
//             Cancel Proposal
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProposalForm from "./ProposalForm";
import { fetchProjectById } from "../utils/api";
import "../App.css";

const ProjectDetails = ({ projectId }) => {
    const { id } = useParams();
    const effectiveProjectId = id || projectId;
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const [showProposalForm, setShowProposalForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!effectiveProjectId) return;

        const loadProject = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchProjectById(effectiveProjectId);
                setProject(data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Failed to load project details.");
            } finally {
                setLoading(false);
            }
        };

        loadProject();
    }, [effectiveProjectId]);

    const skills = project?.requiredSkills || project?.skills || [];
    const budgetLabel = project ?
        project.budget != null ? `$${project.budget}` : `$${project.minBudget || 0}${project.maxBudget ? ` - $${project.maxBudget}` : ''}`
        : "";

    return (
        <div className="project-details">
            {loading && <div data-testid="loading-details">Loading project details...</div>}

            {error && (
                <div data-testid="project-details-error" style={{ color: "red" }}>
                    Error: {error}
                </div>
            )}

            {!loading && !error && !project && (
                <div data-testid="project-details-empty">Project not found.</div>
            )}

            {project && (
                <>
                    <div className="project-detail-header">
                        <h1>{project.title}</h1>
                        {project.category && <span className="project-category">{project.category}</span>}
                    </div>
                    <div className="project-meta-list">
                        <p><strong>Budget:</strong> {budgetLabel}</p>
                        {project.budgetType && <p><strong>Budget Type:</strong> {project.budgetType}</p>}
                        {project.deadline && <p><strong>Deadline:</strong> {project.deadline}</p>}
                        {project.clientId && <p><strong>Client ID:</strong> {project.clientId}</p>}
                    </div>
                    <div className="project-description">
                        <h2>Project Summary</h2>
                        <p>{project.description}</p>
                    </div>
                    {skills.length > 0 && (
                        <div className="project-skills">
                            <h3>Skills required</h3>
                            <p>{skills.join(", ")}</p>
                        </div>
                    )}

                    <div className="project-actions">
                        {!showProposalForm ? (
                            <button className="btn-primary" onClick={() => setShowProposalForm(true)}>
                                View & Apply
                            </button>
                        ) : (
                            <>
                                <ProposalForm projectId={project.id} />
                                <button className="btn-secondary" style={{ marginTop: "10px" }} onClick={() => setShowProposalForm(false)}>
                                    Cancel Proposal
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProjectDetails;



