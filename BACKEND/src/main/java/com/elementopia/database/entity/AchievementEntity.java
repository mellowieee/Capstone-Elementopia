package com.elementopia.database.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "achievement")
public class AchievementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long achievementId;

    @Column(nullable = false)
    private String name;

    private String description;

    // Relationship with AchievementTabEntity
    @OneToMany(mappedBy = "achievement")
    @JsonBackReference
    private List<AchievementTabEntity> achievementTabs;
}