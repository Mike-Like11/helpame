package com.example.helpame.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskInfo {
    private String name;
    private String description;
    private String dateOfPerformance;
    private  String timeOfPerformance;
    private String phone;
    private Coordinates coordinates;
}
