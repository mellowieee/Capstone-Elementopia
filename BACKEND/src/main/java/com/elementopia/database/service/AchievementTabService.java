package com.elementopia.database.service;

import com.elementopia.database.entity.AchievementEntity;
import com.elementopia.database.entity.AchievementTabEntity;
import com.elementopia.database.entity.UserEntity;
import com.elementopia.database.repository.AchievementRepository;
import com.elementopia.database.repository.AchievementTabRepository;
import com.elementopia.database.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AchievementTabService {
    private final AchievementTabRepository achievementTabRepository;
    private final UserRepository userRepository;
    private final AchievementRepository achievementRepository;

    @Transactional
    public AchievementTabEntity awardAchievementToUser(Long userId, Long achievementId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        AchievementEntity achievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new RuntimeException("Achievement not found!"));

        AchievementTabEntity achievementTab = new AchievementTabEntity();
        AchievementTabEntity.AchievementTabEntityId id = new AchievementTabEntity.AchievementTabEntityId();
        id.setUserId(userId);
        id.setAchievementId(achievementId);

        achievementTab.setId(id);
        achievementTab.setUser(user);
        achievementTab.setAchievement(achievement);
        achievementTab.setDateEarned(LocalDate.now());

        return achievementTabRepository.save(achievementTab);
    }
}