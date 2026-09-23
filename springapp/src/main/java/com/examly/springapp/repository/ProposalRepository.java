package com.examly.springapp.repository;

import com.examly.springapp.model.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {
    List<Proposal> findByProjectId(Long projectId);
    Optional<Proposal> findByProjectIdAndFreelancerId(Long projectId, Long freelancerId);
    List<Proposal> findByFreelancerId(Long freelancerId);
}
