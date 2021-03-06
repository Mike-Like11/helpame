package com.example.helpame.service;

import com.example.helpame.entity.FullUserInfo;
import com.example.helpame.entity.ShortUserInfo;
import com.example.helpame.entity.User;
import com.example.helpame.model.RegistrationInput;
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

    @Autowired
    private CloudinaryService cloudinaryService;

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public String saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "";
    }
    public FullUserInfo findByShortUserInfo(ShortUserInfo shortUserInfo) {
        System.out.println(shortUserInfo);
        return userRepository.findByShortUserInfo(shortUserInfo).getFullUserInfo();
    }
    public User updateUser(User user){
        Optional<User> updatedUser = userRepository.findById(user.getId());
        if(updatedUser.isPresent()){
            updatedUser.get().setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            return userRepository.save(updatedUser.get());
        }
        return userRepository.save(user);
    }
    public User updateUser(RegistrationInput user){
        User user2 = getCurrentUser();
        System.out.println(user);
        FullUserInfo fullUserInfo = new FullUserInfo(user.getMiddleName(),user.getAge(), user.getCity(), user.isViber(),user.isTelegram(),user.isWhatsApp());
        if(user.getAvatar()!= null){
            ShortUserInfo shortUserInfo = new ShortUserInfo(user.getFirstName(),user.getLastName(),user.getPhone(),cloudinaryService.uploadFile(user.getAvatar()));
            user2.setShortUserInfo(shortUserInfo);
        }
        else{
            ShortUserInfo shortUserInfo = new ShortUserInfo(user.getFirstName(),user.getLastName(),user.getPhone(),user2.getShortUserInfo().getAvatarUrl());
            user2.setShortUserInfo(shortUserInfo);
        }
        String cryptedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user2.setFullUserInfo(fullUserInfo);
        user2.setPassword(cryptedPassword);
        return userRepository.save(user2);
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
        System.out.println(email);
        return userRepository.findByEmail(email).get();
    }
}
