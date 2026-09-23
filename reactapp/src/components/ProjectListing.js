



// import React, { useEffect, useState } from "react";

// export default function ProjectListing({ onViewDetails }) {
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     fetch("/api/projects")
//       .then((res) => {
//         if (!res.ok) {
//           return res.json().then((d) => {
//             throw new Error(d?.message || "Failed to retrieve projects");
//           });
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setProjects(data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading projects...</div>;

//   if (error)
//     return (
//       <div data-testid="project-listing-error">{error.message}</div>
//     );

//   if (projects.length === 0) return <div>No projects available</div>;

//   return (
//     <div>
//       {projects.map((p) => (
//         <div key={p.id}>
//           <h3>{p.title}</h3>
//           <p>{p.description}</p>
//           <p>Budget: ${p.minBudget} - ${p.maxBudget}</p>
//           <p>Deadline: {p.deadline}</p>
//           <button onClick={() => onViewDetails?.(p.id)}>View Details</button>
//         </div>
//       ))}
//     </div>
//   );
// }
//

import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants";

const ProjectListing = ({ onViewDetails }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/projects`);
                if (!res.ok) {
                    throw new Error("Failed to retrieve projects");
                }
                const data = await res.json();
                setProjects(data);
            } catch (err) {
                setError(err.message || "Failed to retrieve projects");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return <div>Loading projects...</div>;
    }

    if (error) {
        return (
            <div data-testid="project-listing-error">
                {error}
            </div>
        );
    }

    if (projects.length === 0) {
        return <div>No projects available</div>;
    }
    return (
        <div>
            {projects.map((project) => (
                <div key={project.id} className="project-card" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>

                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>Budget: ${project.budget || project.minBudget}</p>
                    <p>Deadline: {project.deadline}</p>
                    <p>Skills: {(project.requiredSkills || project.skills || []).join(", ")}</p>
                    <button
                        onClick={() => onViewDetails && onViewDetails(project.id)}
                    >
                        View & Apply
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProjectListing;




