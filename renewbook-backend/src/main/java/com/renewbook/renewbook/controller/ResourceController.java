package com.renewbook.renewbook.controller;

import com.renewbook.renewbook.entity.Resource;
import com.renewbook.renewbook.repository.ResourceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "http://localhost:5173")
public class ResourceController {

    private final ResourceRepository resourceRepository;

    public ResourceController(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    // Get all resources
    @GetMapping
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    // Add a new resource
    @PostMapping
    public Resource addResource(@RequestBody Resource resource) {

        // New resources need admin verification
        resource.setVerificationStatus("Pending");

        // New resources are available by default
        resource.setAvailabilityStatus("Available");

        return resourceRepository.save(resource);
    }
}