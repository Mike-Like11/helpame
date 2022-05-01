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
    private Date dateOfBirth;
    private String country;
    private String town;
    private String phone;
    private boolean telegram;
    private boolean whatsApp;
    private boolean viber;
}
