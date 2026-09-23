import React, { useState } from "react";
import { submitProposal } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

export const validateProposalForm = ({ bid, proposal, days }) => {
    const bidNum = Number(bid);
    const daysNum = Number(days);
    return (
        !isNaN(bidNum) &&
        bidNum > 0 &&
        proposal.trim().length >= 50 &&
        proposal.trim().length <= 300 &&
        !isNaN(daysNum) &&
        daysNum > 0
    );
};

const ProposalForm = ({ projectId }) => {
    const [bid, setBid] = useState("");
    const [proposal, setProposal] = useState("");
    const [days, setDays] = useState("");
    const [resumeLink, setResumeLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const isValid = () => validateProposalForm({ bid, proposal, days });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid()) return;

        const loggedInUser = JSON.parse(
            localStorage.getItem('currentUser') || localStorage.getItem('user') || '{}'
        );
        const isFreelancer = loggedInUser.role === 'FREELANCER' || loggedInUser.userType === 'freelancer';
        if (!loggedInUser.id || !isFreelancer) {
            setErrorMsg('Please login as a freelancer to apply for this project.');
            return;
        }

        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");

        try {
            await submitProposal({
                projectId: Number(projectId),
                freelancerId: loggedInUser.id,
                bidAmount: Number(bid),
                proposalText: proposal.trim(),
                estimatedDays: Number(days),
                resumeLink: resumeLink.trim() || null,
            });
            setSuccessMsg("Your proposal has been submitted successfully!");
            setBid("");
            setProposal("");
            setDays("");
            setResumeLink("");
            setTimeout(() => navigate('/freelancer-dashboard'), 2000);
        } catch (err) {
            setErrorMsg(err.message || "Failed to submit proposal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="proposal-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="bid-input">Bid Amount</label>
                <input
                    id="bid-input"
                    type="number"
                    data-testid="bid-input"
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="proposal-textarea">Proposal (50-300 chars)</label>
                <textarea
                    id="proposal-textarea"
                    data-testid="proposal-textarea"
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="days-input">Days to Deliver</label>
                <input
                    id="days-input"
                    type="number"
                    data-testid="days-input"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="resume-link-input">Resume / Portfolio Link (optional)</label>
                <input
                    id="resume-link-input"
                    type="text"
                    placeholder="Paste a resume or portfolio URL"
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                />
            </div>
            <div className="form-actions">
                <button
                    type="submit"
                    data-testid="submit-btn"
                    disabled={!isValid() || loading}
                >
                    {loading ? "Submitting..." : "Submit Proposal"}
                </button>
                {projectId && (
                    <button
                        type="button"
                        style={{ marginLeft: "10px" }}
                        onClick={() => navigate(`/projects/${projectId}`)}
                    >
                        Back to Project
                    </button>
                )}
            </div>

            {successMsg && <div className="success" data-testid="submit-success" style={{ color: "green" }}>{successMsg}</div>}
            {errorMsg && (
                <div className="error" data-testid="submit-error" style={{ color: "red" }}>
                    {errorMsg}
                </div>
            )}
        </form>
    );
};

export default ProposalForm;
