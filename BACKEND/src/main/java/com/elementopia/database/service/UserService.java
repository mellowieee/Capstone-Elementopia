package com.elementopia.database.service;


import com.elementopia.database.dto.UserDTO;
import com.elementopia.database.entity.StudentEntity;
import com.elementopia.database.entity.TeacherEntity;
import com.elementopia.database.entity.UserEntity;
import com.elementopia.database.repository.StudentRepository;
import com.elementopia.database.repository.TeacherRepository;
import com.elementopia.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {

    @Autowired
    private UserRepository uRepo;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserDTO toDTO(UserEntity user) {
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setRole(user.getRole());
        return dto;
    }

    // Get User By Username
    public UserEntity findByUsername(String username) {
        return uRepo.findByUsername(username).orElse(null);
    }

    // Create User
    public UserEntity createUser(UserEntity user) {
        return uRepo.save(user);
    }

    // Get All Users
    public List<UserEntity> getAllUsers() {
        return uRepo.findAll();
    }

    // Get User By ID
    public UserEntity getUser(Long id) {
        return uRepo.findById(id).orElse(null);
    }

    // Update User By ID
    public UserEntity updateUser(Long id, UserEntity newUserDetails) {
        UserEntity user = uRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User with ID " + id + " not found!"));

        if (newUserDetails.getUsername() != null) {
            user.setUsername(newUserDetails.getUsername());
        }
        if (newUserDetails.getEmail() != null) {
            user.setEmail(newUserDetails.getEmail());
        }
        if (newUserDetails.getFirstName() != null) {
            user.setFirstName(newUserDetails.getFirstName());
        }
        if (newUserDetails.getLastName() != null) {
            user.setLastName(newUserDetails.getLastName());
        }
        if (newUserDetails.getPassword() != null && !newUserDetails.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(newUserDetails.getPassword()));
        }
        return uRepo.save(user);
    }

    // Update Profile
    public UserEntity updateProfile(Long id, UserEntity newUserDetails) {
        UserEntity user = uRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User with ID " + id + " not found!"));

        if (newUserDetails.getUsername() != null) {
            user.setUsername(newUserDetails.getUsername());
        }
        if (newUserDetails.getFirstName() != null) {
            user.setFirstName(newUserDetails.getFirstName());
        }
        if (newUserDetails.getLastName() != null) {
            user.setLastName(newUserDetails.getLastName());
        }
        if (newUserDetails.getEmail() != null) {
            user.setEmail(newUserDetails.getEmail());
        }
        return uRepo.save(user);
    }

    // Delete User By ID
    public String deleteUser(Long id) {
        if (uRepo.existsById(id)) {
            uRepo.deleteById(id);
            return "User with ID " + id + " deleted successfully!";
        } else {
            return "User with ID " + id + " not found!";
        }
    }

    // Register User (JWT-compatible)
    public UserEntity registerUser(UserEntity user) {
        if (user.getFirstName() == null || user.getFirstName().trim().isEmpty() ||
                user.getLastName() == null || user.getLastName().trim().isEmpty() ||
                user.getEmail() == null || user.getEmail().trim().isEmpty() ||
                user.getUsername() == null || user.getUsername().trim().isEmpty() ||
                user.getPassword() == null || user.getPassword().trim().isEmpty() ||
                user.getRole() == null || user.getRole().trim().isEmpty()) {
            throw new RuntimeException("All fields are required!");
        }
        if (uRepo.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already taken!");
        }
        if (uRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already taken!");
        }

        // Hash password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user first to get generated ID
        UserEntity savedUser = uRepo.save(user);

        // Create role-specific entity
        if ("STUDENT".equalsIgnoreCase(user.getRole())) {
            StudentEntity student = new StudentEntity();
            student.setUser(savedUser);
            student.setFirstName(user.getFirstName());
            student.setLastName(user.getLastName());
            studentRepository.save(student);
            savedUser.setStudent(student);
        } else if ("TEACHER".equalsIgnoreCase(user.getRole())) {
            TeacherEntity teacher = new TeacherEntity();
            teacher.setUser(savedUser);
            teacher.setFirstName(user.getFirstName());
            teacher.setLastName(user.getLastName());
            teacherRepository.save(teacher);
            savedUser.setTeacher(teacher);
        }

        return uRepo.save(savedUser);
    }
}