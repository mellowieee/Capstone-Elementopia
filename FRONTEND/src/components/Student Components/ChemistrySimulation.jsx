import React, { useState, useEffect } from "react";
import { Stage, Layer, Circle, Text, Line } from "react-konva";
import { Box, Typography, Button, ToggleButton } from "@mui/material";
import ElementTable from "./ElementTable";
import compoundElements from "../Student Components/compound-elements.json";

const initialAtoms = [];

const ChemistrySimulation = () => {
  const [atoms, setAtoms] = useState(initialAtoms);
  const [selectedElement, setSelectedElement] = useState("H");
  const [moleculeOutput, setMoleculeOutput] = useState("");
  const [eraseMode, setEraseMode] = useState(false);

  useEffect(() => {
    checkMolecule();
  }, [atoms]);

  const checkMolecule = () => {
    const currentElements = atoms.map(atom => atom.element);

    const foundCompound = compoundElements.find(compound => {
      const compoundElementsSorted = [...compound.Elements].sort();
      const currentElementsSorted = [...currentElements].sort();
      return JSON.stringify(compoundElementsSorted) === JSON.stringify(currentElementsSorted);
    });

    if (foundCompound) {
      setMoleculeOutput(
        `NAME: ${foundCompound.NAME}\n` +
        `Symbol: ${foundCompound.Symbol}\n` +
        `Description: ${foundCompound.Description}\n` +
        `Elements: ${foundCompound.Elements.join(", ")}\n` +
        `Uses: ${foundCompound.Uses.join(", ")}`
      );
    } else {
      setMoleculeOutput("No known molecule formed.");
    }
  };

  const handleStageClick = (e) => {
    if (!eraseMode) {
      const stage = e.target.getStage();
      if (!stage) return;
      const pointer = stage.getPointerPosition();
      if (!pointer) return;
      const { x, y } = pointer;

      const selectedElementFullName =
        compoundElements.find((compound) => compound.Symbol === selectedElement)
          ?.Elements[0] || selectedElement;

      setAtoms((prevAtoms) => [
        ...prevAtoms,
        {
          id: prevAtoms.length + 1,
          x,
          y,
          element: selectedElement,
          fullElementName: selectedElementFullName,
        },
      ]);
    }
  };

  const handleDragMove = (e) => {
    const id = parseInt(e.target.id());
    const { x, y } = e.target.position();
    setAtoms((prevAtoms) =>
      prevAtoms.map((atom) => (atom.id === id ? { ...atom, x, y } : atom))
    );
  };

  const handleAtomClick = (id) => {
    if (eraseMode) {
      setAtoms(atoms.filter((atom) => atom.id !== id));
    }
  };

  const getBonds = () => {
    let bonds = [];
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const dx = atoms[i].x - atoms[j].x;
        const dy = atoms[i].y - atoms[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          bonds.push({ start: atoms[i], end: atoms[j] });
        }
      }
    }
    return bonds;
  };

  const handleClear = () => {
    setAtoms([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "#0a0a0f",
        height: "100vh",
        width: "100%",
        padding: 2,
        marginTop: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1, 
          marginRight: "20px", 
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#ffcc00",
            fontWeight: "bold",
            textShadow: "2px 2px 8px #ffcc00",
            marginBottom: "30px",
            textAlign: 'center',
          }}
        >
          Chemistry Simulation
        </Typography>

        <Stage
          width={900} 
          height={300}  
          onClick={handleStageClick}
          style={{ border: "2px solid #ffcc00", borderRadius: "10px" }}
        >
          <Layer>
            {getBonds().map((bond, index) => (
              <Line
                key={index}
                points={[bond.start.x, bond.start.y, bond.end.x, bond.end.y]}
                stroke="#ffcc00"
                strokeWidth={4}
              />
            ))}
            {atoms.map((atom) => (
              <React.Fragment key={atom.id}>
                <Circle
                  id={String(atom.id)}
                  x={atom.x}
                  y={atom.y}
                  radius={24}
                  fill={
                    atom.element === "O"
                      ? "red"
                      : atom.element === "C"
                      ? "#4d4d4d"
                      : atom.element === "N"
                      ? "#6666ff"
                      : atom.element === "Cl"
                      ? "#66ff66"
                      : atom.element === "H"
                      ? "#444444"
                      : "#ffffff"
                  }
                  draggable
                  onDragMove={handleDragMove}
                  onClick={() => handleAtomClick(atom.id)}
                  stroke="#ffffff"
                  strokeWidth={3}
                  shadowBlur={10}
                  shadowColor="#ffcc00"
                />
                <Text
                  x={atom.x - 6}
                  y={atom.y - 6}
                  text={atom.fullElementName}
                  fontSize={18}
                  fill="black"
                  fontStyle="bold"
                />
              </React.Fragment>
            ))}
          </Layer>
        </Stage>

        <ElementTable
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            position: "relative",
            bottom: "600px",
            left: "20px",
            width: "180px",
          }}
        >
          <ToggleButton
            value="eraseMode"
            selected={eraseMode}
            onChange={() => setEraseMode(!eraseMode)}
            sx={{
              backgroundColor: eraseMode ? "red" : "#444",
              color: "white !important",
              "&.Mui-selected": {
                backgroundColor: "red",
                color: "white !important",
              },
              "&:hover": {
                backgroundColor: eraseMode ? "#ff3333" : "#666",
              },
              transition: "background-color 0.3s",
            }}
          >
            Erase
          </ToggleButton>
          <Button
            variant="contained"
            color="error"
            onClick={handleClear}
            sx={{
              backgroundColor: "#ff3333",
              "&:hover": {
                backgroundColor: "#cc2929",
              },
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>

      {/* Output Area */}
      <Box
        sx={{
          width: "300px",
          backgroundColor: "#1a1a1d",
          borderRadius: "10px",
          padding: 2,
          position: "sticky",
          top: "150px",
          boxShadow: "0px 0px 10px rgba(255, 204, 0, 0.6)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: moleculeOutput.startsWith("Molecule") ? "#ffcc00" : "red",
            whiteSpace: "pre-line",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "16px",
            lineHeight: "1.5",
            wordBreak: "break-word",
          }}
        >
          {moleculeOutput}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChemistrySimulation;
