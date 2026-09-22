package com.renewbook.renewbook.controller;

import com.renewbook.renewbook.entity.Request;
import com.renewbook.renewbook.entity.Resource;
import com.renewbook.renewbook.repository.RequestRepository;
import com.renewbook.renewbook.repository.ResourceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {

    private final RequestRepository requestRepository;
    private final ResourceRepository resourceRepository;

    public RequestController(
            RequestRepository requestRepository,
            ResourceRepository resourceRepository) {

        this.requestRepository = requestRepository;
        this.resourceRepository = resourceRepository;
    }

    // =========================
    // GET ALL REQUESTS
    // =========================

    @GetMapping
    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    // =========================
    // CREATE A NEW REQUEST
    // =========================

    @PostMapping
    public Request createRequest(@RequestBody Request request) {

        // Find the requested resource
        Resource resource = resourceRepository.findById(request.getResourceId())
                .orElseThrow(() ->
                        new RuntimeException("Resource not found"));

        // Do not allow requests for borrowed resources
        if ("Borrowed".equals(resource.getAvailabilityStatus())) {
            throw new RuntimeException("Resource is currently borrowed");
        }

        // New request starts as Pending
        request.setStatus("Pending");

        return requestRepository.save(request);
    }

    // =========================
    // GET REQUESTS OF A STUDENT
    // =========================

    @GetMapping("/student/{studentName}")
    public List<Request> getStudentRequests(
            @PathVariable String studentName) {

        return requestRepository.findAll()
                .stream()
                .filter(request ->
                        request.getStudentName().equals(studentName)
                )
                .toList();
    }

    // =========================
    // GET INCOMING REQUESTS
    // =========================

    @GetMapping("/owner/{ownerName}")
    public List<Request> getIncomingRequests(
            @PathVariable String ownerName) {

        List<Resource> ownerResources = resourceRepository.findAll()
                .stream()
                .filter(resource ->
                        ownerName.equals(resource.getOwnerName())
                )
                .toList();

        return requestRepository.findAll()
                .stream()
                .filter(request ->
                        ownerResources.stream()
                                .anyMatch(resource ->
                                        resource.getId()
                                                .equals(request.getResourceId())
                                )
                )
                .toList();
    }

    // =========================
    // ACCEPT REQUEST
    // =========================

    @PutMapping("/{id}/approve")
    public Request approveRequest(@PathVariable Long id) {

        // Find request
        Request request = requestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found"));

        // Find resource
        Resource resource = resourceRepository.findById(request.getResourceId())
                .orElseThrow(() ->
                        new RuntimeException("Resource not found"));

        // Mark request as approved
        request.setStatus("Approved");

        // Mark resource as borrowed
        resource.setAvailabilityStatus("Borrowed");

        // Save resource
        resourceRepository.save(resource);

        // Save request
        return requestRepository.save(request);
    }

    // =========================
    // REJECT REQUEST
    // =========================

    @PutMapping("/{id}/reject")
    public Request rejectRequest(@PathVariable Long id) {

        // Find request
        Request request = requestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found"));

        // Find resource
        Resource resource = resourceRepository.findById(request.getResourceId())
                .orElseThrow(() ->
                        new RuntimeException("Resource not found"));

        // Mark request as rejected
        request.setStatus("Rejected");

        // Make resource available again
        resource.setAvailabilityStatus("Available");

        // Save resource
        resourceRepository.save(resource);

        // Save request
        return requestRepository.save(request);
    }
}