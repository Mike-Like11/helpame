package com.example.helpame.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
@Data
@Document("user")
public class User implements UserDetails {
    @Id
    ObjectId id = ObjectId.get();
    private String email;
    private String password;
    private List<String> roles;
    private UserInfo userInfo;
    public User() {
    }

    public User(String firstName,
                String middleName,
                String lastName,
                Date dateOfBirth,
                String country,
                String town,
                String phone,
                boolean telegram,
                boolean whatsApp,
                boolean viber,
                String email,
                String password) {
        this.userInfo = new UserInfo(
                firstName,
                middleName,
                lastName,
                dateOfBirth,
                country,
                town,
                phone,
                telegram,
                whatsApp,
                viber
        );
        this.email = email;
        this.password = password;
        roles = new ArrayList<>();
        roles.add("ROLE_USER");
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> authorities
                = new ArrayList<>();
        for (String role: roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }
    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
