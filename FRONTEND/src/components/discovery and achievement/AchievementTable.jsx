import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";

const AchievementsTable = ({ unlockedAchievements = [] }) => {
  const totalAchievements = 24;

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ padding: 2 }}>
      {Array.from({ length: totalAchievements }).map((_, index) => {
        const isUnlocked = unlockedAchievements.includes(index + 1);

        return (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card
              sx={{
                bgcolor: isUnlocked ? "cyan" : "#222",
                color: "white",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                boxShadow: "0px 0px 10px rgba(255, 152, 0, 0.5)",
                transition: "transform 0.2s, boxShadow 0.3s",
                "&:hover": isUnlocked
                  ? {
                      transform: "scale(1.05)",
                      boxShadow: "0px 0px 20px rgba(255, 152, 0, 0.8)",
                    }
                  : {},
              }}
            >
              <CardContent>
                {isUnlocked ? (
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Achievement {index + 1}
                  </Typography>
                ) : (
                  <Lock sx={{ fontSize: 40, color: "gray" }} />
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AchievementsTable;
