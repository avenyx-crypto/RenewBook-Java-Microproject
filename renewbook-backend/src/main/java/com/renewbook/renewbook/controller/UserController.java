package com.renewbook.renewbook.controller;

import com.renewbook.renewbook.entity.User;
import com.renewbook.renewbook.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    @PostMapping("/login")
public User loginUser(@RequestBody User loginUser) {

    return userRepository.findAll()
            .stream()
            .filter(user ->
                    user.getEmail().equals(loginUser.getEmail())
                    && user.getPassword().equals(loginUser.getPassword())
            )
            .findFirst()
            .orElse(null);
}
}