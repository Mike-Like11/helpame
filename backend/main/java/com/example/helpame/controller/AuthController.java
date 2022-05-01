package com.example.helpame.controller;

import com.example.helpame.entity.User;
import com.example.helpame.model.LoginInput;
import com.example.helpame.model.RegistrationInput;
import com.example.helpame.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    User signUp(@RequestBody RegistrationInput user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    ResponseEntity<String> login(@RequestBody LoginInput loginInput) {
        return authService.login(loginInput);
    }
}