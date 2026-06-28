package com.hari.taskmanager.controller;

import org.springframework.web.bind.annotation.RestController;
import com.hari.taskmanager.repository.TaskRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import com.hari.taskmanager.entity.Task;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.hari.taskmanager.repository.UserRepository;
import com.hari.taskmanager.entity.User;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskController(TaskRepository taskRepository, UserRepository userRepository){
        this.taskRepository=taskRepository;
        this.userRepository=userRepository;
    }

    @GetMapping("/tasks/user/{userId}")
    public List<Task> getTasksByUser(@PathVariable Long userId){
        return taskRepository.findByUserId(userId);
    }

    @GetMapping("/tasks")
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @PostMapping("/tasks/{userId}")
    public Task createTask(@PathVariable Long userId, @RequestBody Task task){
        User user =userRepository.findById(userId).orElseThrow();
        task.setUser(user);
        return taskRepository.save(task);
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable Long id){
        taskRepository.deleteById(id);
    }

    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task task=taskRepository.findById(id).orElseThrow();

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDuedate(updatedTask.getDuedate());
        task.setStatus(updatedTask.getStatus());
        
        return taskRepository.save(task);
    }
}
