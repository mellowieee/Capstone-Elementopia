package com.elementopia.database.repository;

import com.elementopia.database.entity.AchievementEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchievementRepository extends JpaRepository<AchievementEntity, Long> {
    List<AchievementEntity> findByUser_UserId(Long userId);
}
