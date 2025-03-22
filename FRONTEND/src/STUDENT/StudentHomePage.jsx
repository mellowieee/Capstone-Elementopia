import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const StudentHomePage = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get the current path

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar open={open} />
      <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, transition: "margin 0.3s ease", marginLeft: open ? "180px" : "60px" }}>
        <DrawerHeader />

        {/* Only show homepage content if NOT inside /student-home-page/room */}
        {location.pathname === "/student-home-page" && (
          <>
            <Typography sx={{ marginBottom: 2 }}>
              Welcome to Student Home Page
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              idk what to do here!!
            </Typography>
          </>
        )}

        {/* Outlet for Nested Routes */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default StudentHomePage;
