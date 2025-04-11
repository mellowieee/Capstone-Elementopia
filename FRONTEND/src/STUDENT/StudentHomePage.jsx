import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import DailyChallengeCard from "../components/Student Components/DailyChallengeCard";
import LessonCards from "../components/Student Components/LessonCards";
import AchievementsCard from "../components/Student Components/AchievementsCard";
import DiscoveriesCard from "../components/Student Components/DiscoveriesCard";
import UserCard from "../components/Student Components/UserCard";

const StudentHomePage = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", bgcolor: "#121212", color: "white", minHeight: "100vh", width: "100vw" }}>
      <Navbar open={open} />
      <Sidebar open={open} handleDrawerOpen={() => setOpen(true)} handleDrawerClose={() => setOpen(false)} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: open ? "180px" : "60px", width: "100%", marginTop: "80px" }}>
        {location.pathname === "/student-home-page" && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <DailyChallengeCard />
              <LessonCards />
            </Grid>
            <Grid item xs={12} md={4}>
              <UserCard/>
              <DiscoveriesCard />
              <AchievementsCard />
            </Grid>
          </Grid>
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default StudentHomePage;
