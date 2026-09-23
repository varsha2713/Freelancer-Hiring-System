package com.examly.springapp.controller;

import com.examly.springapp.model.Review;
import com.examly.springapp.repository.ReviewRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping
    public Review submitReview(@Valid @RequestBody Review review) {
        return reviewRepository.save(review);
    }

    @GetMapping("/user/{userId}")
    public List<Review> getReviewsForUser(@PathVariable Long userId) {
        return reviewRepository.findByRevieweeId(userId);
    }

    @GetMapping("/contract/{contractId}")
    public List<Review> getReviewsByContract(@PathVariable Long contractId) {
        return reviewRepository.findByContractId(contractId);
    }
}
