package com.example.helpame.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShortUserInfo {
    private String firstName;
    private String lastName;
    private String phone;
    private String avatarUrl;
}