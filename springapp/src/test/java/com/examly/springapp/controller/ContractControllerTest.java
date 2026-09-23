package com.examly.springapp.controller;

import com.examly.springapp.model.Contract;
import com.examly.springapp.repository.ContractRepository;
import com.examly.springapp.repository.ProposalRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ContractController.class)
class ContractControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ContractRepository contractRepository;

    @MockBean
    private ProposalRepository proposalRepository;

    @Test
    void updateContractShouldPersistApprovalAndProgress() throws Exception {
        Contract existing = new Contract();
        existing.setId(7L);
        existing.setProposalId(11L);
        existing.setStartDate(LocalDate.now());
        existing.setPaymentTerms("Fixed");
        existing.setProgressPercentage(20);
        existing.setClientApproval(false);
        existing.setFreelancerApproval(false);

        Contract updated = new Contract();
        updated.setId(7L);
        updated.setProposalId(11L);
        updated.setStartDate(LocalDate.now());
        updated.setPaymentTerms("Fixed");
        updated.setProgressPercentage(45);
        updated.setClientApproval(true);
        updated.setFreelancerApproval(true);
        updated.setStatus("ACTIVE");

        when(contractRepository.findById(7L)).thenReturn(Optional.of(existing));
        when(contractRepository.save(any(Contract.class))).thenReturn(updated);

        Contract request = new Contract();
        request.setProgressPercentage(45);
        request.setClientApproval(true);
        request.setFreelancerApproval(true);
        request.setStatus("ACTIVE");

        mockMvc.perform(put("/api/contracts/7")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.progressPercentage").value(45))
                .andExpect(jsonPath("$.clientApproval").value(true))
                .andExpect(jsonPath("$.freelancerApproval").value(true));
    }
}
