package com.examly.springapp.repository;

import com.examly.springapp.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findByProposalIdIn(List<Long> proposalIds);
}
