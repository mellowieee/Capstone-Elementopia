import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@mui/material";
import compoundElements from "../Student Components/compound-elements.json"; // Assuming JSON is in this path
import ChemistrySimulation from "../Student Components/ChemistrySimulation"; // Import your Chemistry Simulation component

const ChallengePage = ({ atoms, setAtoms, setMoleculeOutput }) => {
  const [challengeCompound, setChallengeCompound] = useState(null);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);

  // Function to randomly select a compound
  const getRandomCompound = () => {
    const randomIndex = Math.floor(Math.random() * compoundElements.length);
    return compoundElements[randomIndex];
  };

  // Function to check if the user has formed the correct compound
  const checkChallengeCompletion = () => {
    if (!challengeCompound) return;

    const currentElements = atoms.map((atom) => atom.element);
    const compoundElementsSorted = [...challengeCompound.Elements].sort();
    const currentElementsSorted = [...currentElements].sort();

    // Check if the atoms formed match the compound
    if (JSON.stringify(compoundElementsSorted) === JSON.stringify(currentElementsSorted)) {
      setIsChallengeCompleted(true);
      setMoleculeOutput(
        `Well done! You’ve created ${challengeCompound.NAME}.\n` +
        `Symbol: ${challengeCompound.Symbol}\n` +
        `Description: ${challengeCompound.Description}\n` +
        `Elements: ${challengeCompound.Elements.join(", ")}\n` +
        `Uses: ${challengeCompound.Uses.join(", ")}`
      );
    } else {
      setIsChallengeCompleted(false);
      setMoleculeOutput("Keep going! Try to create the compound.");
    }
  };

  // Initialize the challenge compound when the component mounts
  useEffect(() => {
    const selectedCompound = getRandomCompound();
    setChallengeCompound(selectedCompound);
  }, []);

  // Function to handle start of the challenge
  const handleStartChallenge = () => {
    setIsChallengeCompleted(false);
    setAtoms([]); 
    setMoleculeOutput(""); 
  };

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

      {challengeCompound && !isChallengeCompleted ? (
        <>
          <Typography sx={{ mt: 1, fontSize: "1.1rem", opacity: 0.8 }}>
            Your challenge is to create the compound:{" "}
            <strong>{challengeCompound.NAME}</strong> (Formula:{" "}
            {challengeCompound.Symbol})
          </Typography>
          <ChemistrySimulation
            atoms={atoms}
            setAtoms={setAtoms}
            setMoleculeOutput={setMoleculeOutput}
          /> {/* Pass necessary props to the simulation */}
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
            onClick={checkChallengeCompletion}
          >
            Check if You Completed the Challenge
          </Button>
        </>
      ) : isChallengeCompleted ? (
        <>
          <Typography sx={{ mt: 1, fontSize: "1.1rem", opacity: 0.8 }}>
            Congratulations! You created the compound:{" "}
            <strong>{challengeCompound.NAME}</strong>
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "#4caf50",
              color: "#121212",
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: "5px",
              textTransform: "uppercase",
              boxShadow: "0px 0px 10px rgba(76, 175, 80, 0.7)",
              transition: "background 0.3s, transform 0.2s",
              "&:hover": {
                bgcolor: "#388e3c",
                transform: "scale(1.1)",
                boxShadow: "0px 0px 15px rgba(76, 175, 80, 1)",
              },
            }}
            onClick={handleStartChallenge}
          >
            Start New Challenge
          </Button>
        </>
      ) : (
        <Typography sx={{ mt: 1, fontSize: "1.1rem", opacity: 0.8 }}>
          Click the button below to start a new challenge.
        </Typography>
      )}
    </Card>
  );
};

export default ChallengePage;
