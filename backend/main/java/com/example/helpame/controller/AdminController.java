package com.example.helpame.controller;

import com.example.helpame.entity.Task;
import com.example.helpame.entity.User;
import com.example.helpame.entity.Worker;
import com.example.helpame.service.TaskService;
import com.example.helpame.service.UserService;
import com.example.helpame.service.WorkerService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private TaskService taskService;
    @Autowired
    WorkerService workerService;
    @Autowired
    UserService userService;

    @GetMapping("/tasks")
    public List<Task> getTasks(){
        return taskService.getAllAdmin();
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable ObjectId id){
        taskService.deleteById(id);
    }
    @PostMapping("/tasks/{id}")
    public void updateTask(@PathVariable ObjectId id,@RequestBody Task task){
        taskService.updateTask(task);
    }
    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.allUsers();
    }
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable ObjectId id){
        userService.deleteUser(id);
    }
    @PostMapping("/users/{id}")
    public void updateUser(@PathVariable ObjectId id,@RequestBody User user){
        userService.updateUser(user);
    }
    @GetMapping("/workers")
    public List<Worker> getWorkers(){
        return workerService.getAllWorkers();
    }
    @DeleteMapping("/workers/{id}")
    public void deleteWorker(@PathVariable ObjectId id){
        workerService.deleteWorker(id);
    }
    @PostMapping("/workers/{id}")
    public Worker updateWorker(@PathVariable ObjectId id,@RequestBody Worker worker){
       return workerService.updateWorker(worker);
    }
}
