package com.hari.taskmanager.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate duedate;
    private String status;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }


    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }


    public LocalDate getDuedate() {
        return duedate;
    }
    public void setDuedate(LocalDate duedate) {
        this.duedate = duedate;
    }

    
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    
}
