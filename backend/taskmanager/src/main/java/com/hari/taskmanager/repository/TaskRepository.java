package com.hari.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hari.taskmanager.entity.Task;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long>{
    List<Task> findByUserId(Long userId);

}
