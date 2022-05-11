package com.example.helpame.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Data
public class Review {
    public Review(String message, Double rating) {
        this.message = message;
        this.rating = rating;
    }

    @Id
    ObjectId id = ObjectId.get();

    private UserInfo personalInfo;
    private String message;
    private Double rating;
    private String date = new Date().toLocaleString();
}
