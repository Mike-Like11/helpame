package com.example.helpame.repository;

import com.example.helpame.entity.FullUserInfo;
import com.example.helpame.entity.ShortUserInfo;
import com.example.helpame.entity.Worker;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkerRepository extends MongoRepository<Worker, ObjectId> {
    Worker findByShortUserInfo(ShortUserInfo shortUserInfo);
}
