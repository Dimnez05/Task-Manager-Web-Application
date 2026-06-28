package com.hari.taskmanager.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hari.taskmanager.entity.User;
import com.hari.taskmanager.repository.UserRepository;


@CrossOrigin(origins="http://localhost:5173")
@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user){
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginUser){
        Optional<User> user= userRepository.findByEmail(loginUser.getEmail());

        if(user.isPresent() && user.get().getPassword().equals(loginUser.getPassword())){
            return user.get();
        }

        throw new RuntimeException("Invalid Email or Password");
    }
}
