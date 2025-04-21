package com.elementopia.database.service;

import com.elementopia.database.entity.AchievementEntity;
import com.elementopia.database.entity.UserEntity;
import com.elementopia.database.repository.AchievementRepository;
import com.elementopia.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AchievementService {

    @Autowired
    private AchievementRepository achievementRepo;

    @Autowired
    private UserRepository userRepo;

    public List<AchievementEntity> getAllAchievements() {
        return achievementRepo.findAll();
    }

    public AchievementEntity getAchievementById(Long id) {
        return achievementRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Achievement not found"));
    }

    public List<AchievementEntity> getAchievementsByUserId(Long userId) {
        return achievementRepo.findByUser_UserId(userId);
    }

    public AchievementEntity createAchievement(Long userId, AchievementEntity achievement) {
        UserEntity user = userRepo.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        achievement.setUser(user);
        return achievementRepo.save(achievement);
    }

    public AchievementEntity updateAchievement(Long id, AchievementEntity updated) {
        AchievementEntity achievement = achievementRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Achievement not found"));

        achievement.setTitle(updated.getTitle());
        achievement.setDescription(updated.getDescription());
        achievement.setDateAchieved(updated.getDateAchieved());

        return achievementRepo.save(achievement);
    }

    public boolean deleteAchievement(Long id) {
        if (achievementRepo.existsById(id)) {
            achievementRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
