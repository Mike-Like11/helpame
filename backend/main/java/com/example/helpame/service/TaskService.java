package com.example.helpame.service;

import com.example.helpame.entity.Task;
import com.example.helpame.entity.TaskInfo;
import com.example.helpame.entity.User;
import com.example.helpame.repository.TaskRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private WorkerService workerService;

    public List<Task> getAll(){
        return taskRepository.findAll();
    }

    public Task findById(ObjectId id){
        Optional<Task> task = taskRepository.findById(id);
        return task.get();
    }
    public Task addWorker(ObjectId id){
        System.out.println(id);
        Optional<Task> task = taskRepository.findById(id);
        if(task.isPresent()){
            task.get().getWorkerInfoList().add(workerService.getCurrentWorker());
            return taskRepository.save(task.get());
        }
        return null;
    }
    public Task chooseWorker(ObjectId id,ObjectId workerId){
        System.out.println(workerId);
        Optional<Task> task = taskRepository.findById(id);
        if(task.isPresent()){
            task.get().setWorker(workerService.findById(workerId));
            return taskRepository.save(task.get());
        }
        return null;
    }
    public List<Task> getCurrentTasks(){
        User currentUser = userService.getCurrentUser();
        return taskRepository.findAllByUserInfo(currentUser.getUserInfo());
    }

    public Task addTask(TaskInfo taskInfo){
        User currentUser = userService.getCurrentUser();
        Task task = new Task(currentUser.getUserInfo(),taskInfo);
        return taskRepository.save(task);
    }

    public Task updateTask(Task task){

        Task task1 = taskRepository.findById(task.getId()).orElse(null);
        if(task1==null) return null;
        return taskRepository.save(task);
    }
}
