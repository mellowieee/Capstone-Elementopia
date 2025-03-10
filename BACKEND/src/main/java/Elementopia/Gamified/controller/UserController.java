package Elementopia.Gamified.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Elementopia.Gamified.entity.UserEntity;
import Elementopia.Gamified.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody UserEntity user) {
    	String response = userService.saveUser(user);
       if(response.equals("Username already exists. Please choose another.")) {
    	   return ResponseEntity.badRequest().body(response);
       }
       return ResponseEntity.ok(response);
    }
    
    @GetMapping("/getAll")
    public ResponseEntity<List<UserEntity>> list() {
        List<UserEntity> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
