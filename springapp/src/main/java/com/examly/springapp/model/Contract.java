package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "contracts")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Proposal ID is required")
    private Long proposalId;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date must be current or future")
    private LocalDate startDate;

    @NotBlank(message = "Payment terms are required")
    private String paymentTerms;

    private String status = "ACTIVE"; // ACTIVE, COMPLETED, TERMINATED

    @Min(0) @Max(100)
    private Integer progressPercentage = 0;

    private Boolean clientApproval = false;
    private Boolean freelancerApproval = false;
    private String paymentStatus = "PENDING";
    private Double amount;
    private String projectTitle;
    private Long clientId;
    private Long freelancerId;

    private LocalDate lastUpdated = LocalDate.now();

    // Constructors
    public Contract() {}

    public Contract(Long proposalId, LocalDate startDate, String paymentTerms) {
        this.proposalId = proposalId;
        this.startDate = startDate;
        this.paymentTerms = paymentTerms;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProposalId() { return proposalId; }
    public void setProposalId(Long proposalId) { this.proposalId = proposalId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public String getPaymentTerms() { return paymentTerms; }
    public void setPaymentTerms(String paymentTerms) { this.paymentTerms = paymentTerms; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Integer progressPercentage) { this.progressPercentage = progressPercentage; }

    public Boolean getClientApproval() { return clientApproval; }
    public void setClientApproval(Boolean clientApproval) { this.clientApproval = clientApproval; }

    public Boolean getFreelancerApproval() { return freelancerApproval; }
    public void setFreelancerApproval(Boolean freelancerApproval) { this.freelancerApproval = freelancerApproval; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getProjectTitle() { return projectTitle; }
    public void setProjectTitle(String projectTitle) { this.projectTitle = projectTitle; }

    public Long getClientId() { return clientId; }
    public void setClientId(Long clientId) { this.clientId = clientId; }

    public Long getFreelancerId() { return freelancerId; }
    public void setFreelancerId(Long freelancerId) { this.freelancerId = freelancerId; }

    public LocalDate getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDate lastUpdated) { this.lastUpdated = lastUpdated; }
}
