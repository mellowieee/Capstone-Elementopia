package Elementopia.Gamified.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Elementopia.Gamified.entity.UserEntity;
import Elementopia.Gamified.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    public String saveUser(UserEntity user) {
    	Optional<UserEntity> existingUser = userRepository.findByUsername(user.getUsername());
        if(existingUser.isPresent()) {
        	return "Username already exists. Please choose another.";
        }
        userRepository.save(user);
        return "New User is added";
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}
