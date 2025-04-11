import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import ChemistryCurriculum from "../components/Student Components/Lesson1Chemistry";



const StudentCareerPage = () => {
  const [open, setOpen] = useState(false); 

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", bgcolor: "#121212", color: "white", minHeight: "100vh", width: "100vw" }}>
      <Navbar open={open} />
      <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <Box  component="main" sx={{ flexGrow: 1, p: 3, marginLeft: open ? "20px" : "10px", width: "100%", marginTop: "50px" }}>
        <ChemistryCurriculum/>
      </Box>
    </Box>
  );
};

export default StudentCareerPage;
