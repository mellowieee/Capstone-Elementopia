package Elementopia.Gamified.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Elementopia.Gamified.Entity.StudentEntity;
import Elementopia.Gamified.Entity.TeacherEntity;
import Elementopia.Gamified.Entity.UserEntity;
import Elementopia.Gamified.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String saveUser(UserEntity userDTO) {
        // Check if email exists
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            return "Error: Email already in use!";
        }

        // Check if username exists
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            return "Error: Username already taken!";
        }

        // Create user entity based on role
        UserEntity user;
        if ("TEACHER".equalsIgnoreCase(userDTO.getRole())) {
            user = new TeacherEntity(userDTO.getFirstname(), userDTO.getLastname(),
                    userDTO.getEmail(), userDTO.getUsername(), passwordEncoder.encode(userDTO.getPassword()));
        } else {
            user = new StudentEntity(userDTO.getFirstname(), userDTO.getLastname(),
                    userDTO.getEmail(), userDTO.getUsername(), passwordEncoder.encode(userDTO.getPassword()));
        }

        userRepository.save(user);
        return "User registered successfully!";
    }

    public String loginUser(String username, String password) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            
            UserEntity user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) { // Check hashed password
                return "Login successful!";
            } else {
                return "Invalid password!";
            }
        } else {
            return "User not found!";
        }
    }
}
