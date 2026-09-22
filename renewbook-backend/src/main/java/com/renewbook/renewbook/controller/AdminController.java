package com.renewbook.renewbook.controller;

import com.renewbook.renewbook.entity.Admin;
import com.renewbook.renewbook.entity.User;
import com.renewbook.renewbook.repository.UserRepository;
import com.renewbook.renewbook.entity.Resource;
import com.renewbook.renewbook.repository.AdminRepository;
import com.renewbook.renewbook.repository.ResourceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminRepository adminRepository;
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;

    public AdminController(
            AdminRepository adminRepository,
            ResourceRepository resourceRepository,
            UserRepository userRepository) {

        this.adminRepository = adminRepository;
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
    }


    // =========================
    // ADMIN LOGIN
    // =========================

    @PostMapping("/login")
    public Admin loginAdmin(@RequestBody Admin loginAdmin) {

        return adminRepository.findAll()
                .stream()
                .filter(admin ->
                        admin.getEmail().equals(loginAdmin.getEmail())
                        && admin.getPassword().equals(loginAdmin.getPassword())
                )
                .findFirst()
                .orElse(null);
    }


    // =========================
    // GET ALL RESOURCES
    // =========================

    @GetMapping("/resources")
    public List<Resource> getAllResources() {

        return resourceRepository.findAll();
    }


    // =========================
    // DELETE RESOURCE
    // =========================

    @DeleteMapping("/resources/{id}")
    public String deleteResource(@PathVariable Long id) {

        if (!resourceRepository.existsById(id)) {
            return "Resource not found";
        }

        resourceRepository.deleteById(id);

        return "Resource deleted successfully";
    }
    // =========================
// VERIFY RESOURCE
// =========================

@PutMapping("/resources/{id}/verify")
public Resource verifyResource(@PathVariable Long id) {

    Resource resource = resourceRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Resource not found"));

    resource.setVerificationStatus("Approved");

    return resourceRepository.save(resource);
}
    // =========================
// GET ALL USERS
// =========================

@GetMapping("/users")
public List<User> getAllUsers() {

    return userRepository.findAll();
}
}