package com.elementopia.database.controller;

import com.elementopia.database.entity.TeacherEntity;
import com.elementopia.database.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    // Get all teachers
    @GetMapping("/getAll")
    public List<TeacherEntity> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    // Get teacher by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTeacherById(@PathVariable Long id) {
        Optional<TeacherEntity> teacher = teacherService.getTeacherById(id);
        return teacher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Assign a user to teacher role
    @PostMapping("/assign/{userId}")
    public ResponseEntity<?> assignTeacher(@PathVariable Long userId) {
        try {
            TeacherEntity teacher = teacherService.assignTeacherRole(userId);
            return ResponseEntity.ok(teacher);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Delete teacher
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable Long id) {
        try {
            teacherService.deleteTeacher(id);
            return ResponseEntity.ok("Teacher deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
