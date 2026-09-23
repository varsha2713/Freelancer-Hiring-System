package com.examly.springapp.controller;

import com.examly.springapp.model.Proposal;
import com.examly.springapp.repository.ProposalRepository;
import com.examly.springapp.repository.ProjectRepository;
import com.examly.springapp.exception.ConflictException;
import com.examly.springapp.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProposalController {

    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/proposals")
    public Proposal submitProposal(@Valid @RequestBody Proposal proposal) {
        // Verify project exists
        projectRepository.findById(proposal.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + proposal.getProjectId()));

        // Check for existing proposal from this freelancer for this project
        proposalRepository.findByProjectIdAndFreelancerId(proposal.getProjectId(), proposal.getFreelancerId())
                .ifPresent(p -> { throw new ConflictException("Freelancer has already submitted a proposal for this project"); });

        return proposalRepository.save(proposal);
    }

    @GetMapping("/proposals")
    public List<Proposal> getAllProposals() {
        return proposalRepository.findAll();
    }

    @GetMapping("/projects/{projectId}/proposals")
    public List<Proposal> getProposalsByProject(@PathVariable Long projectId) {
        projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + projectId));

        return proposalRepository.findByProjectId(projectId);
    }

    @GetMapping("/proposals/user/{userId}")
    public List<Proposal> getProposalsByUser(@PathVariable Long userId) {
        return proposalRepository.findByFreelancerId(userId);
    }

    @PutMapping("/proposals/{id}")
    public Proposal updateProposal(@PathVariable Long id, @RequestBody Proposal proposalDetails) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal not found: " + id));
        proposal.setStatus(proposalDetails.getStatus());
        return proposalRepository.save(proposal);
    }
}
