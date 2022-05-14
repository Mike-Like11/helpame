package com.example.helpame.service;

import com.example.helpame.entity.Task;
import com.example.helpame.entity.User;
import com.example.helpame.entity.Worker;
import com.example.helpame.entity.WorkerInfo;
import com.example.helpame.repository.WorkerRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkerService {
    @Autowired
    private WorkerRepository workerRepository;
    @Autowired
    private UserService userService;
    public Worker createCv(WorkerInfo workerInfo){
        User currentUser = userService.getCurrentUser();
        Worker worker = new Worker(workerInfo,currentUser.getUserInfo());
        return workerRepository.save(worker);
    }
    public Worker findById(ObjectId id){
        Optional<Worker> worker = workerRepository.findById(id);
        return worker.get();
    }
    public List<Worker> getAllWorkers(){
        return workerRepository.findAll();
    }
    public Worker getCurrentWorker(){
        User currentUser = userService.getCurrentUser();
        return workerRepository.findByPersonalInfo(currentUser.getUserInfo());
    }
}
