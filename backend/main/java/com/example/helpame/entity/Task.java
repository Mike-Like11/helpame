package com.example.helpame.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonIgnore;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
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
        id = ObjectId.get();
        strId =  id.toString();
    }

    @Id
    ObjectId id;
    @Field("taskId")
    @BsonIgnore
    String strId;
    private UserInfo userInfo;
    private TaskInfo taskInfo;
    private List<Worker> workerInfoList = new ArrayList<>();
    private Worker worker;
    private String dateOfCreation = new Date().toLocaleString();
}
