import React, { useState, useEffect } from "react";
// import Confetti from 'react-confetti';
// import { useWindowSize } from 'react-use';
import { Box, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import ElementMatchGame from "../components/MiniGames/ElementMatchGame"; // Import your mini-game here

// Assets
import card1 from "../assets/img/card1.jpg";
import card2 from "../assets/img/card2.jpg";
import card3 from "../assets/img/card3.jpg";
import card4 from "../assets/img/card4.jpg";
import card5 from "../assets/img/card5.jpg";

// Styles
import "../assets/css/StudentGameRoomPage.css";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const gameCards = [
  { text: "Build the Atom", image: card1 },
  { text: "Elemental Match", image: card2 },
  { text: "Molecule Maker", image: card3 },
  { text: "Periodic Quest", image: card4 },
  { text: "Bond Breaker", image: card5 },
];

const StudentGameRoomPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [dailyGame, setDailyGame] = useState(null);
  
    useEffect(() => {
      fetch('/api/daily-challenge')
        .then(res => res.json())
        .then(data => setDailyGame(data));
    }, []);

  return (
    <Box /*sx={{ display: "flex", backgroundColor: "black", minHeight: "100vh" }}*/>
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
          color: "white",
        }}
      >
        <DrawerHeader />

        {/* Show Back button and selected game if any */}
        {selectedGame ? (
          <>
            <Button
              variant="outlined"
              onClick={() => setSelectedGame(null)}
              sx={{ mb: 2, color: "white", borderColor: "white" }}
            >
              ⬅ Back to Game List
            </Button>

            {selectedGame === "Elemental Match" && <ElementMatchGame />}
            {/* Add more games here */}
            {/* selectedGame === "Build the Atom" && <BuildAtomGame /> */}
          </>
        ) : (
          // Game Card List
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {gameCards.map((card, index) => (
              <Grid item key={index}>
                <div
                  className={`game-card ${selectedGame === card.text ? "selected" : ""}`}
                  onClick={() => setSelectedGame(card.text)}
                  style={{
                    backgroundImage: `url(${card.image})`,
                  }}
                >
                  <span className="card-text">{card.text}</span>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg my-4">
        <h2 className="text-xl font-bold mb-1">🎯 Daily Challenge</h2>
        <p className="text-lg">{dailyGame?.title}</p>
        <p className="text-sm">{dailyGame?.description}</p>
        <p className="text-xs mt-1 text-green-600">Reward: {dailyGame?.reward}</p>
        <button className="mt-2 bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">
          Play Now
        </button>
    </div>
    </Box>
  );
};

export default StudentGameRoomPage;
