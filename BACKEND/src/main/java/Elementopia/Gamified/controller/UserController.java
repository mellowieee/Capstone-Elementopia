package Elementopia.Gamified.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Elementopia.Gamified.Entity.StudentEntity;
import Elementopia.Gamified.Entity.TeacherEntity;
import Elementopia.Gamified.Entity.UserEntity;
import Elementopia.Gamified.repository.UserRepository;
import Elementopia.Gamified.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")  // Adjust based on frontend port
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserEntity user) {
        UserEntity newUser;
        
        if ("TEACHER".equalsIgnoreCase(user.getRole())) {
            newUser = new TeacherEntity(
                user.getFirstname(), user.getLastname(),
                user.getEmail(), user.getUsername(),
                user.getPassword()
            );
        } else if ("STUDENT".equalsIgnoreCase(user.getRole())) {
            newUser = new StudentEntity(
                user.getFirstname(), user.getLastname(),
                user.getEmail(), user.getUsername(),
                user.getPassword()
            );
        } else {
            return ResponseEntity.badRequest().body("Invalid role!");
        }

        userRepository.save(newUser); // Saves to tbl_teacher or tbl_student
        return ResponseEntity.ok(user.getRole() + " registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserEntity userDTO) {
        String result = userService.loginUser(userDTO.getUsername(), userDTO.getPassword());
        return ResponseEntity.ok(result);
    }
}
