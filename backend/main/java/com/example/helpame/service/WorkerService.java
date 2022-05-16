package com.example.helpame.service;

import com.example.helpame.entity.*;
import com.example.helpame.repository.TaskRepository;
import com.example.helpame.repository.WorkerRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class WorkerService {
    @Autowired
    private WorkerRepository workerRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private TaskRepository taskRepository;
    public Worker createCv(WorkerInfo workerInfo){
        User currentUser = userService.getCurrentUser();
        Worker worker = new Worker(workerInfo,currentUser.getShortUserInfo());
        return workerRepository.save(worker);
    }
    public Worker findById(ObjectId id){
        Optional<Worker> worker = workerRepository.findById(id);
        return worker.get();
    }
    public Worker addReview(Review review, ObjectId id){
        Optional<Worker> worker = workerRepository.findById(id);
        if(worker.isPresent()){
            review.setPersonalInfo(userService.getCurrentUser().getShortUserInfo());
            worker.get().getReviews().add(review);
            final double[] sum = {0.0};
            worker.get().getReviews().forEach(review1 -> sum[0] +=review1.getRating());
            worker.get().setRating(sum[0] /worker.get().getReviews().size());
            workerRepository.save(worker.get());
        }
        return worker.get();
    }
    public List<Task> getCurrentWorkerTasks(){
        System.out.println(taskRepository.findAllWorkerTasks(getCurrentWorker()));
        return taskRepository.findAllWorkerTasks(getCurrentWorker());
    }
    public List<Worker> getAllWorkers(){
        return workerRepository.findAll();
    }
    public Worker getCurrentWorker(){
        User currentUser = userService.getCurrentUser();
        return workerRepository.findByShortUserInfo(currentUser.getShortUserInfo());
    }
    public Worker updateWorker(Worker worker){
        return workerRepository.save(worker);
    }
    public void deleteWorker(ObjectId id){
        workerRepository.deleteById(id);
    }
}
