package com.example.helpame.controller;

import com.example.helpame.entity.Task;
import com.example.helpame.entity.User;
import com.example.helpame.service.TaskService;
import com.example.helpame.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private TaskService taskService;

    @GetMapping("/user/info")
    public User getUserInfo(){
        return userService.getCurrentUser();
    }
    @GetMapping("/user/tasks")
    public List<Task> getUserTask(){
        return taskService.getCurrentTasks();
    }
}
