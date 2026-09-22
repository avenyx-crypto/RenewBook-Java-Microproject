package com.renewbook.renewbook.controller;

import com.renewbook.renewbook.entity.Login;
import com.renewbook.renewbook.repository.LoginRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final LoginRepository loginRepository;

    public LoginController(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    @PostMapping
    public Login login(@RequestBody Login login) {

        return loginRepository.findAll()
                .stream()
                .filter(user ->
                        user.getEmail().equals(login.getEmail())
                        && user.getPassword().equals(login.getPassword())
                )
                .findFirst()
                .orElse(null);
    }
}