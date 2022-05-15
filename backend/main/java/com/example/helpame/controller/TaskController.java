package com.example.helpame.controller;

import com.example.helpame.entity.Task;
import com.example.helpame.entity.TaskInfo;
import com.example.helpame.service.TaskService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    public List<Task> getTask(){
        return taskService.getAll();
    }

    @GetMapping("/tasks/{taskId}")
    public Task getTaskById(@PathVariable ObjectId taskId){
        return taskService.findById(taskId);
    }
    @DeleteMapping("/tasks/{taskId}")
    public void deleteTaskById(@PathVariable ObjectId taskId){
        taskService.deleteById(taskId);
    }
    @GetMapping("/tasks/{taskId}/respond")
    public Task getRespond(@PathVariable ObjectId taskId){
        return taskService.addWorker(taskId);
    }
    @PostMapping("/user/tasks")
    public Task addTask(@RequestBody TaskInfo taskInput){
        return taskService.addTask(taskInput);
    }

//    @PostMapping("/user/tasks")
//    public Task updateTask(@RequestBody Task task){
//        return taskService.updateTask(task);
//    }

}
