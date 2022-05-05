package com.example.helpame.controller;

import com.example.helpame.entity.User;
import com.example.helpame.model.LoginInput;
import com.example.helpame.model.RegistrationInput;
import com.example.helpame.service.AuthService;
import com.example.helpame.service.UserService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;
    @SneakyThrows
    @PostMapping("/register")
    User signUp(  @ModelAttribute RegistrationInput userInfo, HttpServletRequest httpServletRequest) {
        System.out.println(userInfo.toString());
        System.out.println(httpServletRequest.getParts().size());
        return authService.register(userInfo);
    }
    @GetMapping("/user/info")
    public User getUserInfo(){
        System.out.println(userService.findByEmail(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal())));
        return userService.findByEmail(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }
    @PostMapping("/login")
    ResponseEntity<String> login(@RequestBody LoginInput loginInput) {
        return authService.login(loginInput);
    }
}