package com.elementopia.database.repository;

import com.elementopia.database.entity.AchievementTabEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AchievementTabRepository extends JpaRepository<AchievementTabEntity, AchievementTabEntity.AchievementTabEntityId> {
}