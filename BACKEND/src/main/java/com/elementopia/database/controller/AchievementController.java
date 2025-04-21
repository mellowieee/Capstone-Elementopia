package com.elementopia.database.controller;

import com.elementopia.database.entity.AchievementEntity;
import com.elementopia.database.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    @Autowired
    private AchievementService achievementService;

    @GetMapping("/getAll")
    public List<AchievementEntity> getAllAchievements() {
        return achievementService.getAllAchievements();
    }

    @GetMapping("/get/{id}")
    public AchievementEntity getAchievementById(@PathVariable Long id) {
        return achievementService.getAchievementById(id);
    }

    @GetMapping("/getByUser/{userId}")
    public List<AchievementEntity> getAchievementsByUserId(@PathVariable Long userId) {
        return achievementService.getAchievementsByUserId(userId);
    }

    @PostMapping("/create/{userId}")
    public AchievementEntity createAchievement(@PathVariable Long userId, @RequestBody AchievementEntity achievement) {
        return achievementService.createAchievement(userId, achievement);
    }

    @PutMapping("/update/{id}")
    public AchievementEntity updateAchievement(@PathVariable Long id, @RequestBody AchievementEntity achievement) {
        return achievementService.updateAchievement(id, achievement);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAchievement(@PathVariable Long id) {
        boolean deleted = achievementService.deleteAchievement(id);
        if (deleted) {
            return ResponseEntity.ok("Achievement Deleted Successfully");
        } else {
            return ResponseEntity.status(404).body("Achievement not found");
        }
    }
}
