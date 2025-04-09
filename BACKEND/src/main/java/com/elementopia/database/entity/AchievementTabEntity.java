package com.elementopia.database.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "achievement_tab")
public class AchievementTabEntity {
    @EmbeddedId
    private AchievementTabEntityId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private UserEntity user;

    @ManyToOne
    @MapsId("achievementId")
    @JoinColumn(name = "achievement_id", nullable = false)
    @JsonBackReference
    private AchievementEntity achievement;

    @Column(nullable = false)
    private LocalDate dateEarned;

    // Composite Key Class
    @Embeddable
    @Data
    public static class AchievementTabEntityId implements Serializable {
        private Long userId;
        private Long achievementId;
    }
}