import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const LessonCards = () => {
  return (
    <Grid container spacing={2} sx={{ mb: 3, width: "100%" }}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              bgcolor: "#292929",
              color: "white",
              border: "2px solid #00bcd4",
              boxShadow: "0px 0px 15px rgba(0, 188, 212, 0.6)",
              transition: "transform 0.2s, box-shadow 0.3s",
              borderRadius: "8px",
              "&:hover": {
                boxShadow: "0px 0px 20px rgba(0, 188, 212, 1)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textShadow: "0px 0px 5px rgba(0, 188, 212, 0.8)",
                  textAlign: "center",
                }}
              >
                Lesson {index + 1}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LessonCards;
