package com.example.helpame.controller;

import com.example.helpame.entity.FullUserInfo;
import com.example.helpame.entity.ShortUserInfo;
import com.example.helpame.entity.Task;
import com.example.helpame.entity.User;
import com.example.helpame.model.RegistrationInput;
import com.example.helpame.service.TaskService;
import com.example.helpame.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/user_full_info")
    public FullUserInfo getUserInfo(@RequestBody ShortUserInfo shortUserInfo){
        return userService.findByShortUserInfo(shortUserInfo);
    }
    @PostMapping("/user/info")
    public User updateUserInfo(@ModelAttribute RegistrationInput userInfo){
        return userService.updateUser(userInfo);
    }
    @GetMapping("/user/tasks")
    public List<Task> getUserTask(){
        return taskService.getCurrentTasks();
    }
    @PostMapping("/user/tasks/{id}")
    public Task chooseWorker(@PathVariable ObjectId id,@RequestBody String workerId){
        System.out.println(id);
        return taskService.chooseWorker(id,new ObjectId(workerId.substring(0, workerId.length() - 1)));
    }
}
