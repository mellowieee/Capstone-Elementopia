import React from "react";
import { Card, Typography, Button } from "@mui/material";

const DailyChallengeCard = () => {
  return (
    <Card
      sx={{
        mb: 3,
        p: 3,
        bgcolor: "#1e1e1e",
        color: "white",
        width: "100%",
        border: "2px solid #ff9800",
        borderRadius: "10px",
        boxShadow: "0px 0px 15px rgba(255, 152, 0, 0.8)",
        transition: "transform 0.2s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0px 0px 20px rgba(255, 152, 0, 1)",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
          textShadow: "0px 0px 8px rgba(255, 152, 0, 0.8)",
          letterSpacing: "2px",
        }}
      >
        Daily Challenge
      </Typography>
      <Typography sx={{ mt: 1, fontSize: "1.1rem", opacity: 0.8 }}>
        Here’s your daily Challenge! Complete it and claim your reward!
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: "#ff9800",
          color: "#121212",
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "5px",
          textTransform: "uppercase",
          boxShadow: "0px 0px 10px rgba(255, 152, 0, 0.7)",
          transition: "background 0.3s, transform 0.2s",
          "&:hover": {
            bgcolor: "#ffb74d",
            transform: "scale(1.1)",
            boxShadow: "0px 0px 15px rgba(255, 152, 0, 1)",
          },
        }}
      >
        Start Challenge
      </Button>
    </Card>
  );
};

export default DailyChallengeCard;
