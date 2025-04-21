package com.elementopia.database.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AchievementDTO {
    private String title;
    private LocalDate dateAchieved;
}
