package com.examly.springapp.controller;

import com.examly.springapp.model.Payment;
import com.examly.springapp.repository.PaymentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping
    public Payment processPayment(@Valid @RequestBody Payment payment) {
        // Logic for payment simulation could go here
        return paymentRepository.save(payment);
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping("/freelancer/{freelancerId}")
    public List<Payment> getPaymentsByFreelancer(@PathVariable Long freelancerId) {
        return paymentRepository.findByFreelancerId(freelancerId);
    }

    @GetMapping("/client/{clientId}")
    public List<Payment> getPaymentsByClient(@PathVariable Long clientId) {
        return paymentRepository.findByClientId(clientId);
    }
}
