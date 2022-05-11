package com.example.helpame.service;

import com.example.helpame.entity.User;
import com.example.helpame.entity.Worker;
import com.example.helpame.entity.WorkerInfo;
import com.example.helpame.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<Worker> getAllWorkers(){
        return workerRepository.findAll();
    }
    public Worker getCurrentWorker(){
        User currentUser = userService.getCurrentUser();
        return workerRepository.findByPersonalInfo(currentUser.getUserInfo());
    }
}
