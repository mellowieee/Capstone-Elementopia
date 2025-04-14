import React, { useState, useEffect } from "react";
import { Stage, Layer, Circle, Text, Line } from "react-konva";
import { Box, Typography, Button, ToggleButton } from "@mui/material";
import ElementTable from "./ElementTable";

const initialAtoms = [];
const moleculeCombinations = {
  "H2O": ["H", "H", "O"],
  "NH3": ["N", "H", "H", "H"],
  "CH4": ["C", "H", "H", "H", "H"],
};

const ChemistrySimulation = () => {
  const [atoms, setAtoms] = useState(initialAtoms);
  const [selectedElement, setSelectedElement] = useState("H");
  const [moleculeOutput, setMoleculeOutput] = useState("");
  const [eraseMode, setEraseMode] = useState(false);

  useEffect(() => {
    checkMolecule();
  }, [atoms]);

  const checkMolecule = () => {
    const elements = [...atoms.map((atom) => atom.element)].sort().join("");
    for (const [molecule, composition] of Object.entries(moleculeCombinations)) {
      if ([...composition].sort().join("") === elements) { 
        setMoleculeOutput(molecule);
        return;
      }
    }
    setMoleculeOutput("");
  };

  const handleStageClick = (e) => {
    if (!eraseMode) {
      const stage = e.target.getStage();
      if (!stage) return;
      const pointer = stage.getPointerPosition();
      if (!pointer) return;
      const { x, y } = pointer;
      setAtoms([...atoms, { id: atoms.length + 1, x, y, element: selectedElement }]);
    }
  };

  const handleDragMove = (e) => {
    const id = parseInt(e.target.id());
    const { x, y } = e.target.position();
    setAtoms((prevAtoms) => prevAtoms.map((atom) => atom.id === id ? { ...atom, x, y } : atom));
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
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#0a0a0f",
        height: "100vh",
        width: "100%",
        padding: 2,
        marginTop: "30px",
      }}
    >
      <Typography variant="h4" sx={{ color: "#ffcc00", fontWeight: "bold", textShadow: "2px 2px 8px #ffcc00" }}>
        Chemistry Simulation
      </Typography>
      <Box sx={{ backgroundColor: "#12121a", borderRadius: 3, boxShadow: 4, padding: 3, mt: 2, height: "300px" }}>
        <Stage width={1320} height={300} onClick={handleStageClick} style={{ border: "2px solid #ffcc00", borderRadius: "10px" }}>
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
                    atom.element === "O" ? "red" :
                      atom.element === "C" ? "#4d4d4d" :
                        atom.element === "N" ? "#6666ff" :
                          atom.element === "Cl" ? "#66ff66" : 
                            atom.element === "H" ? "#444444" : "#ffffff" 
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
                  text={atom.element}
                  fontSize={18}
                  fill="black"
                  fontStyle="bold"
                />
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
        <ElementTable selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
        <Box sx={{ display: "flex", gap: 2, position: "relative", bottom: "600px", left: "20px", width: "180px" }}>
        <ToggleButton
          value="eraseMode"
          selected={eraseMode}
          onChange={() => setEraseMode(!eraseMode)}
          sx={{
            backgroundColor: eraseMode ? "red" : "#444",
            color: "white !important",
            '&.Mui-selected': {
              backgroundColor: "red",
              color: "white !important",
            },
            '&:hover': {
              backgroundColor: eraseMode ? "#ff3333" : "#666"
            },
            transition: "background-color 0.3s",
          }}
        >
          {eraseMode ? "Erase" : "Erase"}
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
      <Typography variant="h6" sx={{ color: "#ffcc00", marginTop: 2, position: "absolute", bottom: "300px", right: "120px",width: "360px" }}>
  {moleculeOutput && `Formed: ${moleculeOutput}`}
  {moleculeOutput === "H2O" && (
    <Typography variant="h6" sx={{fontSize: ".9rem"}}>
      <span style={{ fontWeight: "bold"}}>Composition:</span>
      <br />
      Each water molecule consists of one oxygen atom and two hydrogen atoms, connected by covalent bonds. 
      <br />
      <span style={{ fontWeight: "bold"}}>States of Matter:</span>
      <br />
      Water can exist in three states: liquid, solid (ice), and gas (water vapor or steam). 
      <br />
      <span style={{ fontWeight: "bold"}}>Importance: </span>
      <br />
      Water is vital for all known forms of life, acting as a solvent and playing a crucial role in various biological processes. 
    </Typography>
  )}
</Typography>

      
    </Box>
  );
};

export default ChemistrySimulation;
