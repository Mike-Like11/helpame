package com.example.helpame.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonIgnore;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@Data
@Document("worker")
public class Worker {
    @Id
    ObjectId id = ObjectId.get();

    @Field("workerId")
    @BsonIgnore
    String strId = id.toHexString();
    private WorkerInfo workerInfo;

    public Worker(WorkerInfo workerInfo, UserInfo personalInfo) {
        this.workerInfo = workerInfo;
        this.personalInfo = personalInfo;
    }

    private Double rating = 0.0;
    private UserInfo personalInfo;
    private ArrayList<Review> reviews;
}
