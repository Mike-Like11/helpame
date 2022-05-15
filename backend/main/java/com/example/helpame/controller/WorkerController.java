package com.example.helpame.controller;

import com.example.helpame.entity.Review;
import com.example.helpame.entity.Task;
import com.example.helpame.entity.Worker;
import com.example.helpame.entity.WorkerInfo;
import com.example.helpame.service.WorkerService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WorkerController {
    @Autowired
    WorkerService workerService;

    @GetMapping("/user/worker")
    public Worker getCurrentWorker(){
        return workerService.getCurrentWorker();
    }
    @GetMapping("/user/worker/tasks")
    public List<Task> getCurrentWorkerTasks(){
        return workerService.getCurrentWorkerTasks();
    }
    @PostMapping("/user/worker")
    public Worker createWorker(@RequestBody WorkerInfo workerInfo){
        return workerService.createCv(workerInfo);
    }

    @GetMapping("/workers")
    public List<Worker> getAllWorkers(){
        return workerService.getAllWorkers();
    }
    @PostMapping("/workers/{id}")
    public Worker addReview(@RequestBody Review review, @PathVariable ObjectId id){
        return workerService.addReview(review,id);
    }
}
