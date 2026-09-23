package com.examly.springapp.controller;

import com.examly.springapp.model.Contract;
import com.examly.springapp.repository.ContractRepository;
import com.examly.springapp.repository.ProposalRepository;
import com.examly.springapp.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private ProposalRepository proposalRepository;

    @PostMapping
    public Contract createContract(@Valid @RequestBody Contract contract) {
        // Verify proposal exists
        proposalRepository.findById(contract.getProposalId())
                .orElseThrow(() -> new ResourceNotFoundException("Proposal not found: " + contract.getProposalId()));

        return contractRepository.save(contract);
    }

    @GetMapping
    public java.util.List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    @GetMapping("/{id}")
    public Contract getContractById(@PathVariable Long id) {
        return contractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id: " + id));
    }

    @GetMapping("/proposals")
    public java.util.List<Contract> getContractsByProposals(@RequestParam java.util.List<Long> ids) {
        return contractRepository.findByProposalIdIn(ids);
    }

    @PutMapping("/{id}")
    public Contract updateContract(@PathVariable Long id, @RequestBody Contract contractDetails) {
        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id: " + id));

        if (contractDetails.getStatus() != null) contract.setStatus(contractDetails.getStatus());
        if (contractDetails.getProgressPercentage() != null) contract.setProgressPercentage(contractDetails.getProgressPercentage());
        if (contractDetails.getClientApproval() != null) contract.setClientApproval(contractDetails.getClientApproval());
        if (contractDetails.getFreelancerApproval() != null) contract.setFreelancerApproval(contractDetails.getFreelancerApproval());
        if (contractDetails.getPaymentStatus() != null) contract.setPaymentStatus(contractDetails.getPaymentStatus());
        if (contractDetails.getAmount() != null) contract.setAmount(contractDetails.getAmount());
        if (contractDetails.getProjectTitle() != null) contract.setProjectTitle(contractDetails.getProjectTitle());
        if (contractDetails.getClientId() != null) contract.setClientId(contractDetails.getClientId());
        if (contractDetails.getFreelancerId() != null) contract.setFreelancerId(contractDetails.getFreelancerId());
        if (contractDetails.getLastUpdated() != null) contract.setLastUpdated(contractDetails.getLastUpdated());

        if (Boolean.TRUE.equals(contract.getClientApproval()) && Boolean.TRUE.equals(contract.getFreelancerApproval())) {
            contract.setStatus("ACTIVE");
            contract.setProgressPercentage(Math.max(contract.getProgressPercentage(), 25));
        }

        return contractRepository.save(contract);
    }
}
