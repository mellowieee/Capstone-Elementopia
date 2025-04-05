import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import card4 from "../assets/card4.jpg";
import card5 from "../assets/card5.jpg";

import "./StudentGameRoomPage.css"; // Import the CSS file

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

// Array of cards with different background images and text
const gameCards = [
  { text: "Build the Atom", image: card1 },
  { text: "Elemental Match", image: card2 },
  { text: "Molecule Maker", image: card3 },
  { text: "Periodic Quest", image: card4 },
  { text: "Bond Breaker", image: card5 },
];

const StudentGameRoomPage = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", backgroundColor: "black", minHeight: "100vh" }}>
      <Navbar open={open} />
      <Sidebar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: open ? "180px" : "60px",
          color: "white",
        }}
      >
        <DrawerHeader />

        {/* Updated Grid for Upper Left Alignment */}
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start" // Align cards to the left
          alignItems="flex-start"   // Align cards to the top
        >
          {gameCards.map((card, index) => (
            <Grid item key={index}>
              <div
                className={`game-card ${selected === index ? "selected" : ""}`}
                onClick={() => setSelected(index)}
                style={{
                  backgroundImage: `url(${card.image})`,
                }}
              >
                <span className="card-text">{card.text}</span>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentGameRoomPage;
