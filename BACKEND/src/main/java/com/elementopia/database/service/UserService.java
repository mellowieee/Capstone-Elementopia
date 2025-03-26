package com.elementopia.database.service;

import com.elementopia.database.entity.StudentEntity;
import com.elementopia.database.entity.TeacherEntity;
import com.elementopia.database.entity.UserEntity;
import com.elementopia.database.repository.StudentRepository;
import com.elementopia.database.repository.TeacherRepository;
import com.elementopia.database.repository.UserRepository;
import com.elementopia.database.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

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

    @Autowired
    private JwtUtil jwtUtil;

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
        UserEntity user = new UserEntity();
        try {
            user = uRepo.findById(id).get();

            user.setUsername(newUserDetails.getUsername());
            user.setPassword(newUserDetails.getPassword());
            user.setEmail(newUserDetails.getEmail());
            user.setFirstName(newUserDetails.getFirstName());
            user.setLastName(newUserDetails.getLastName());
        } catch (Exception e) {
            throw new NameNotFoundException("User with ID " + id + " not found!");
        } finally {
            return uRepo.save(user);
        }
    }

    // Update Profile
    public UserEntity updateProfile(Long id, UserEntity newUserDetails) {
        UserEntity user = new UserEntity();
        try {
            user = uRepo.findById(id).get();

            user.setUsername(newUserDetails.getUsername());
            user.setFirstName(newUserDetails.getFirstName());
            user.setLastName(newUserDetails.getLastName());
        } catch (Exception e) {
            throw new NameNotFoundException("User with ID " + id + " not found!");
        } finally {
            return uRepo.save(user);
        }
    }

    // Delete User By ID
    public String deleteUser(Long id) {
        String msg;
        if (uRepo.existsById(id)) {
            uRepo.deleteById(id);
            msg = "User with ID " + id + " deleted successfully!";
        } else {
            msg = "User with ID " + id + " not found!";
        }
        return msg;
    }

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
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        UserEntity savedUser = uRepo.save(user);

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
        return uRepo.save(user);
    }

    // Login User
    public String loginUser(String username, String password) {
        UserEntity user = findByUsername(username);

        if (user == null) {
            throw new RuntimeException("User not found!");
        }

        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Stored Hashed Password: " + user.getPassword());

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password!");
        }

        return jwtUtil.generateToken(username);
    }


}
