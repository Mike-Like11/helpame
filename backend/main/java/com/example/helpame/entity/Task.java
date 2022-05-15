package com.example.helpame.entity;

import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonIgnore;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Document("task")
public class Task {
    public Task(ShortUserInfo shortUserInfo, TaskInfo taskInfo) {
        this.shortUserInfo = shortUserInfo;
        this.taskInfo = taskInfo;
        id = ObjectId.get();
        strId =  id.toString();
    }

    @Id
    ObjectId id;
    @Field("taskId")
    @BsonIgnore
    String strId;
    private ShortUserInfo shortUserInfo;
    private TaskInfo taskInfo;
    private List<Worker> workerInfoList = new ArrayList<>();
    private Worker worker;
    private String dateOfCreation = new Date().toLocaleString();
}
