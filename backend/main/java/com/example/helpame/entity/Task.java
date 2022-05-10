package com.example.helpame.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.StopWatch;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Document("task")
public class Task {
    public Task(UserInfo userInfo, TaskInfo taskInfo) {
        this.userInfo = userInfo;
        this.taskInfo = taskInfo;
    }

    @Id
    ObjectId id = ObjectId.get();
    private UserInfo userInfo;
    private TaskInfo taskInfo;
    private List<UserInfo> workerInfoList = new ArrayList<>();
    private String dateOfCreation = new Date().toLocaleString();
}
