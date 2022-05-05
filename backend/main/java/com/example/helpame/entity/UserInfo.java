package com.example.helpame.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
@Data
@AllArgsConstructor
public class UserInfo {
    private String firstName;
    private String middleName;
    private String lastName;
    private int age;
    private String phone;
    private String city;
    private boolean telegram;
    private boolean whatsApp;
    private boolean viber;
    private String avatarUrl;
}
