package com.elementopia.database.controller;

import com.elementopia.database.entity.UserEntity;
import com.elementopia.database.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService uServ;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Create User
    @PostMapping("/createUser")
    public UserEntity createUser(@RequestBody UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return uServ.createUser(user);
    }

    // Get All Users
    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers() {
        return uServ.getAllUsers();
    }

    // Get User By ID
    @GetMapping("/getUser/{id}")
    public UserEntity getUser(@PathVariable Long id) {
        return uServ.getUser(id);
    }

    // Update User By ID
    @PutMapping("/updateUser")
    public UserEntity updateUser(@RequestParam Long id, @RequestBody UserEntity newUserDetails) {
        if (newUserDetails.getPassword() != null) {
            newUserDetails.setPassword(passwordEncoder.encode(newUserDetails.getPassword()));
        }
        return uServ.updateUser(id, newUserDetails);
    }

    // Update Profile By ID
    @PutMapping("/updateProfile")
    public UserEntity updateProfile(@RequestParam Long id, @RequestBody UserEntity newUserDetails) {
        return uServ.updateProfile(id, newUserDetails);
    }

    // Delete User By ID
    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable Long id) {
        return uServ.deleteUser(id);
    }

    // Register User
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserEntity user) {
        try {
            UserEntity newUser = uServ.registerUser(user);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Login User (Session-Based)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserEntity loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok("Login successful!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
        }
    }


    // Logout User
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Get session if exists, don't create a new one
        if (session != null) {
            session.invalidate();
        }

        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully!");
    }

    // Get Current Logged-in User
    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request, Principal principal) {
        HttpSession session = request.getSession(false); // Do not create a new session
        if (session == null || principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No active session found!");
        }
        UserEntity user = uServ.findByUsername(principal.getName());
        return ResponseEntity.ok(user);
    }

}
