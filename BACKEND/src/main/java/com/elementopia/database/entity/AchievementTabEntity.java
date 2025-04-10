package com.elementopia.database.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate dateEarned;

    @Embeddable
    @Data
    public static class AchievementTabEntityId implements Serializable {
        private Long userId;
        private Long achievementId;
    }
}