import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";

const discoveries = Array.from({ length: 49 }, (_, index) => ({
    title: `Discovery ${index + 1}`,
    unlocked: index === 0, 
  }));
  
  const Discovery = () => {
    return (
      <Grid container spacing={2} sx={{ padding: 2, marginTop: "15px" }}>
        {discoveries.map((dis, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card
              sx={{
                bgcolor: dis.unlocked ? "#ff9800" : "#222",
                color: "white",
                textAlign: "center",
                padding: 2,
                borderRadius: "12px",
                boxShadow: "0px 0px 10px rgba(255, 152, 0, 0.5)",
                transition: "transform 0.2s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 0px 20px rgba(255, 152, 0, 0.8)",
                },
              }}
            >
              <CardContent>
                {dis.unlocked ? (
                  <Typography variant="h6" sx={{ fontWeight: "bold", textShadow: "0px 0px 5px rgba(255, 152, 0, 0.8)" }}>
                    {dis.title}
                  </Typography>
                ) : (
                  <Lock sx={{ fontSize: 40, color: "gray" }} />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };
  
  export default Discovery;