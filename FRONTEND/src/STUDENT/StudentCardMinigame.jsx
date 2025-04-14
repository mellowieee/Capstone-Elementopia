import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import './StudentCardMinigame.css'; // Import the CSS file

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const questionSet = [
  { question: "Na & Cl", correct: "Ionic" },
  { question: "H & O", correct: "Covalent" },
  { question: "Fe & Cu", correct: "Metallic" },
  { question: "C & H", correct: "Covalent" },
  { question: "Mg & O", correct: "Ionic" },
];

const answerOptions = ["Ionic", "Covalent", "Metallic"];
// Removed external image and will rely on CSS styling instead

const StudentCardMinigame = () => {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [plusOnePosition, setPlusOnePosition] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleCardClick = (choice, cardIndex) => {
    if (choice === questionSet[index].correct) {
      setFeedback("✅ Correct!");
      setScore((prev) => prev + 1);
      setPlusOnePosition(cardIndex);
      setShowPlusOne(true);
    } else {
      setFeedback(`❌ Incorrect! Correct answer: ${questionSet[index].correct}`);
    }

    setTimeout(() => {
      setShowPlusOne(false);
      setFeedback("");
      setIndex((prev) => (prev + 1) % questionSet.length);
    }, 1500);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar open={open} />
      <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

      <Box
        component="main"
        className={`main-container ${open ? 'main-container-open' : 'main-container-closed'}`}
      >
        <DrawerHeader />

        <Box className="game-container">
          <Box className="header-section">
            <Typography variant="h4" className="game-title">
              Chemistry Match-Up
            </Typography>
            <Typography variant="h6" className="score-display">
              Score: {score}
            </Typography>
          </Box>

          <Box className="question-panel">
            <Typography variant="h5" className="question-text">
              What bond type is formed between {questionSet[index].question}?
            </Typography>
          </Box>

          {/* Cards */}
          <Box className="cards-container">
            {answerOptions.map((option, i) => (
              <Box
                key={i}
                onClick={() => handleCardClick(option, i)}
                className="card"
              >
                {/* +1 animation */}
                {showPlusOne && plusOnePosition === i && (
                  <Box className="plus-one">+1</Box>
                )}

                {/* Card overlay */}
                <Box className="card-overlay" />
                <Typography variant="h6" className="card-text">
                  {option}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Feedback */}
          {feedback && (
            <Typography variant="h6" className="feedback">
              {feedback}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StudentCardMinigame;