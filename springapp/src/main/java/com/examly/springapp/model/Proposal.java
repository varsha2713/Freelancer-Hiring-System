package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "proposals")
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Project ID is required")
    private Long projectId;

    @NotNull(message = "Freelancer ID is required")
    private Long freelancerId;

    @DecimalMin(value = "0.01", message = "Bid amount must be greater than zero")
    private Double bidAmount;

    @NotBlank(message = "Proposal text is required")
    @Size(min = 50, max = 300, message = "Proposal text must be between 50 and 300 characters")
    private String proposalText;

    @Min(value = 1, message = "Estimated days must be at least 1")
    private Integer estimatedDays;

    private String resumeLink;

    private String status = "PENDING"; // PENDING, ACCEPTED, REJECTED

    // Constructors
    public Proposal() {}

    public Proposal(Long projectId, Long freelancerId, Double bidAmount, String proposalText, Integer estimatedDays) {
        this.projectId = projectId;
        this.freelancerId = freelancerId;
        this.bidAmount = bidAmount;
        this.proposalText = proposalText;
        this.estimatedDays = estimatedDays;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public Long getFreelancerId() { return freelancerId; }
    public void setFreelancerId(Long freelancerId) { this.freelancerId = freelancerId; }

    public Double getBidAmount() { return bidAmount; }
    public void setBidAmount(Double bidAmount) { this.bidAmount = bidAmount; }

    public String getProposalText() { return proposalText; }
    public void setProposalText(String proposalText) { this.proposalText = proposalText; }

    public Integer getEstimatedDays() { return estimatedDays; }
    public void setEstimatedDays(Integer estimatedDays) { this.estimatedDays = estimatedDays; }

    public String getResumeLink() { return resumeLink; }
    public void setResumeLink(String resumeLink) { this.resumeLink = resumeLink; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
