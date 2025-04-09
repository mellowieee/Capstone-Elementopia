package com.elementopia.database.controller;

import com.elementopia.database.entity.AchievementTabEntity;
import com.elementopia.database.service.AchievementTabService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/achievementTab")
@RequiredArgsConstructor
public class AchievementTabController {
    private final AchievementTabService achievementTabService;

    @PostMapping("/award/{userId}/{achievementId}")
    public ResponseEntity<AchievementTabEntity> awardAchievement(
            @PathVariable Long userId,
            @PathVariable Long achievementId
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(achievementTabService.awardAchievementToUser(userId, achievementId));
    }
}