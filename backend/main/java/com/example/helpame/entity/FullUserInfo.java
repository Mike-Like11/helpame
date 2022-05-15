package com.example.helpame.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FullUserInfo {
    private String middleName;
    private int age;
    private String city;
    private boolean telegram;
    private boolean whatsApp;
    private boolean viber;
}
