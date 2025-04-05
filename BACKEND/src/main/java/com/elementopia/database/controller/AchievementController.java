package com.elementopia.database.controller;

import com.elementopia.database.entity.AchievementEntity;
import com.elementopia.database.service.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
public class AchievementController {
    private final AchievementService achievementService;

    @PostMapping
    public ResponseEntity<AchievementEntity> createAchievement(@RequestBody AchievementEntity achievement) {
        return ResponseEntity.ok(achievementService.createAchievement(achievement));
    }

    @GetMapping
    public ResponseEntity<List<AchievementEntity>> getAllAchievements() {
        return ResponseEntity.ok(achievementService.getAllAchievements());
    }
}