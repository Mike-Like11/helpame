package com.example.helpame.service;

import com.example.helpame.entity.User;
import com.example.helpame.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public String saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "";
    }

    public User updateUser(User user){
        Optional<User> updatedUser = userRepository.findById(user.getId());
        if(updatedUser.isPresent()){
            updatedUser.get().setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            return userRepository.save(updatedUser.get());
        }
        return userRepository.save(user);
    }
    public boolean deleteUser(ObjectId userId) {
        if (userRepository.findById(userId).isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
    public User getCurrentUser(){
        return findByEmail(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }
    public User findByEmail(String email){
        return userRepository.findByEmail(email).get();
    }
}
