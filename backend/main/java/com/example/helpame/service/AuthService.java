package com.example.helpame.service;


import com.example.helpame.config.JWTUtil;
import com.example.helpame.entity.ShortUserInfo;
import com.example.helpame.entity.User;
import com.example.helpame.entity.FullUserInfo;
import com.example.helpame.model.LoginInput;
import com.example.helpame.model.RegistrationInput;
import com.example.helpame.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.util.Optional;

@Service
@Transactional
public class AuthService implements UserDetailsService {
    @Autowired
    public UserRepository userRepository;
    @Autowired private JWTUtil jwtUtil;

    @Autowired
    private CloudinaryService cloudinaryService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(MessageFormat.format("com.example.demo.User.User with email {0} cannot be found.", username)));
    }

    public User register(RegistrationInput user){
        FullUserInfo fullUserInfo = new FullUserInfo(user.getMiddleName(),user.getAge(), user.getCity(), user.isViber(),user.isTelegram(),user.isWhatsApp());
        ShortUserInfo shortUserInfo = new ShortUserInfo(user.getFirstName(),user.getLastName(),user.getPhone(),cloudinaryService.uploadFile(user.getAvatar()));
        User user2 = new User(fullUserInfo,shortUserInfo, user.getEmail(), user.getPassword());
        String cryptedPassword = bCryptPasswordEncoder.encode(user2.getPassword());
        user2.setPassword(cryptedPassword);
        return userRepository.save(user2);
    }
    public ResponseEntity<String> login (LoginInput loginInput){
        Optional<User> user = userRepository.findByEmail(loginInput.getEmail());
        if(user.isPresent()){
            if (bCryptPasswordEncoder.matches(loginInput.getPassword(), user.get().getPassword())) {
                String token = jwtUtil.generateToken(loginInput.getEmail());
                return new ResponseEntity(token, HttpStatus.OK);
            }
            else{
                return new ResponseEntity("Неправильный ввод данных", HttpStatus.NOT_FOUND);
            }
        }
        else{
            return new ResponseEntity("Неправильный ввод данных", HttpStatus.NOT_FOUND);
        }
    }
}