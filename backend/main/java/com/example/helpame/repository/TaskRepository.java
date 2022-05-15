package com.example.helpame.repository;

import com.example.helpame.entity.FullUserInfo;
import com.example.helpame.entity.ShortUserInfo;
import com.example.helpame.entity.Task;
import com.example.helpame.entity.Worker;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, ObjectId> {
    List<Task> findAllByShortUserInfo(ShortUserInfo shortUserInfo);
    @Query(value = "{'workerInfoList':?0}")
    List<Task> findAllWorkerTasks(Worker worker);
    @Query(value = "{'worker': null}")
    List<Task> findAllFree();
}
