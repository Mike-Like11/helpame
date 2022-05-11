package com.example.helpame.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@AllArgsConstructor
public class WorkerInfo {
    private String experience;
    private String preferences;
    private ArrayList<String> favoriteAnimals;
}
