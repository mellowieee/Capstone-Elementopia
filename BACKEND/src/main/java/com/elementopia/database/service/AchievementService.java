package com.elementopia.database.service;

import com.elementopia.database.entity.AchievementEntity;
import com.elementopia.database.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {
    private final AchievementRepository achievementRepository;

    public AchievementEntity createAchievement(AchievementEntity achievement) {
        return achievementRepository.save(achievement);
    }

    public List<AchievementEntity> getAllAchievements() {
        return achievementRepository.findAll();
    }
}