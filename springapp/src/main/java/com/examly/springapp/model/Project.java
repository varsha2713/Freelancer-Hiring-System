package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 100, message = "Title must be between 5 and 100 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    private String category; // e.g., web-development, design

    private String budgetType; // fixed, hourly

    private Double minBudget;

    private Double maxBudget;

    private Double budget;

    private LocalDate deadline;

    @ElementCollection
    @CollectionTable(name = "project_skills", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "skill")
    private List<String> requiredSkills;

    private Long clientId;

    // Constructors
    public Project() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getBudgetType() { return budgetType; }
    public void setBudgetType(String budgetType) { this.budgetType = budgetType; }

    public Double getMinBudget() { return minBudget != null ? minBudget : budget; }
    public void setMinBudget(Double minBudget) { 
        this.minBudget = minBudget; 
        if (this.budget == null) this.budget = minBudget;
    }

    public Double getMaxBudget() { return maxBudget != null ? maxBudget : budget; }
    public void setMaxBudget(Double maxBudget) { 
        this.maxBudget = maxBudget; 
        if (this.budget == null) this.budget = maxBudget;
    }

    public Double getBudget() { return budget != null ? budget : minBudget; }
    public void setBudget(Double budget) { 
        this.budget = budget; 
        this.minBudget = budget;
        this.maxBudget = budget;
    }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }

    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }

    public Long getClientId() { return clientId; }
    public void setClientId(Long clientId) { this.clientId = clientId; }
}
