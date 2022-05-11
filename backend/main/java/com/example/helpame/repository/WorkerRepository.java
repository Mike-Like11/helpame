package com.example.helpame.repository;

import com.example.helpame.entity.Task;
import com.example.helpame.entity.UserInfo;
import com.example.helpame.entity.Worker;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkerRepository extends MongoRepository<Worker, ObjectId> {
    Worker findByPersonalInfo(UserInfo personalInfo);
}
