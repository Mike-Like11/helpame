package com.example.helpame.repository;

import com.example.helpame.entity.Task;
import com.example.helpame.entity.UserInfo;
import com.example.helpame.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Repository
public interface TaskRepository extends MongoRepository<Task, ObjectId> {
    List<Task> findAllByUserInfo(UserInfo userInfo);
}
