package com.example.helpame.entity;

import lombok.Data;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.Date;
@Data
@Getter
public class Review {
    public Review(String message, Double rating) {
        this.message = message;
        this.rating = rating;
    }

    @Id
    ObjectId id = ObjectId.get();

    private ShortUserInfo personalInfo;
    private String message;
    private Double rating;
    private String date = new Date().toLocaleString();
}
