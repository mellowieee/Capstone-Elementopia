import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import './StudentStateChanges.css'; // Import the CSS file

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

// Define substance properties
const substances = [
  { 
    id: 'water', 
    name: 'Water', 
    freezingPoint: 0, 
    boilingPoint: 100,
    triplePoint: -0.01, // Celsius
    criticalPoint: 374, // Celsius
    states: {
      solid: { name: 'Ice', color: '#a5f3fc' },
      liquid: { name: 'Water', color: '#0ea5e9' },
      gas: { name: 'Water Vapor', color: '#e0f2fe' }
    }
  },
  { 
    id: 'co2', 
    name: 'Carbon Dioxide', 
    freezingPoint: -78, // Sublimates at normal pressure
    boilingPoint: -57, // Only liquid under pressure
    triplePoint: -56.6,
    criticalPoint: 31,
    states: {
      solid: { name: 'Dry Ice', color: '#e5e7eb' },
      liquid: { name: 'Liquid CO₂', color: '#9ca3af' },
      gas: { name: 'CO₂ Gas', color: '#f1f5f9' }
    }
  },
  { 
    id: 'oxygen', 
    name: 'Oxygen', 
    freezingPoint: -218.8,
    boilingPoint: -183,
    triplePoint: -218.8,
    criticalPoint: -118.6,
    states: {
      solid: { name: 'Solid Oxygen', color: '#bfdbfe' },
      liquid: { name: 'Liquid Oxygen', color: '#3b82f6' },
      gas: { name: 'Oxygen Gas', color: '#dbeafe' }
    }
  }
];

// Challenge modes
const challengeModes = [
  { id: 'explore', name: 'Explore Mode' },
  { id: 'target', name: 'Target State' },
  { id: 'cycle', name: 'State Cycle' },
];

const StudentStateChanges = () => {
  const [open, setOpen] = useState(false);
  const [selectedSubstance, setSelectedSubstance] = useState(substances[0]);
  const [temperature, setTemperature] = useState(25); // in Celsius
  const [pressure, setPressure] = useState(1); // in atm
  const [currentState, setCurrentState] = useState('liquid');
  const [mode, setMode] = useState(challengeModes[0]);
  const [particles, setParticles] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [targetState, setTargetState] = useState(null);
  const [score, setScore] = useState(0);
  
  // Handle drawer
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // Handle substance change
  const handleSubstanceChange = (event) => {
    const newSubstance = substances.find(s => s.id === event.target.value);
    setSelectedSubstance(newSubstance);
    // Reset temperature to room temperature
    setTemperature(25);
    updateState(newSubstance, 25, pressure);
  };

  // Handle temperature change
  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
    updateState(selectedSubstance, newValue, pressure);
  };

  // Handle pressure change
  const handlePressureChange = (event, newValue) => {
    setPressure(newValue);
    updateState(selectedSubstance, temperature, newValue);
  };

  // Handle mode change
  const handleModeChange = (event) => {
    const newMode = challengeModes.find(m => m.id === event.target.value);
    setMode(newMode);
    
    // Reset if changing modes
    setFeedback('');
    
    // Set up the challenge based on mode
    if (newMode.id === 'target') {
      setupTargetChallenge();
    } else if (newMode.id === 'cycle') {
      setupCycleChallenge();
    }
  };

  // Calculate state based on temperature and pressure
  const updateState = (substance, temp, pres) => {
    let newState;
    
    // Simple state determination logic
    // This is simplified - a real implementation would use phase diagrams
    if (temp < substance.freezingPoint) {
      newState = 'solid';
    } else if (temp < substance.boilingPoint) {
      newState = 'liquid';
    } else {
      newState = 'gas';
    }
    
    // Special case for CO2 which sublimates
    if (substance.id === 'co2' && pres < 5.1 && temp < substance.boilingPoint) {
      newState = temp < substance.freezingPoint ? 'solid' : 'gas';
    }
    
    // Update state
    setCurrentState(newState);
    
    // Generate particles based on state
    generateParticles(newState, temp);
    
    // Check if challenge goal is met
    checkChallengeProgress(newState);
  };

  // Set up a target state challenge
  const setupTargetChallenge = () => {
    const states = ['solid', 'liquid', 'gas'];
    const randomState = states[Math.floor(Math.random() * states.length)];
    setTargetState(randomState);
    setFeedback(`Challenge: Make ${selectedSubstance.name} a ${selectedSubstance.states[randomState].name}!`);
  };

  // Set up cycle challenge
  const setupCycleChallenge = () => {
    setTargetState('solid'); // Start with solid
    setFeedback(`Challenge: Start with ${selectedSubstance.states.solid.name}, then cycle through all states!`);
  };

  // Check if challenge goal is met
  const checkChallengeProgress = (newState) => {
    if (mode.id === 'explore') {
      return; // No challenge to check in explore mode
    }
    
    if (mode.id === 'target' && newState === targetState) {
      setFeedback(`✅ Success! You've changed ${selectedSubstance.name} to ${selectedSubstance.states[newState].name}!`);
      setScore(prevScore => prevScore + 10);
      setTargetState(null);
      setTimeout(() => {
        setupTargetChallenge();
      }, 2000);
    }
    
    if (mode.id === 'cycle' && newState === targetState) {
      let nextTarget;
      
      if (targetState === 'solid') {
        nextTarget = 'liquid';
        setFeedback(`✅ ${selectedSubstance.states.solid.name} created! Now make it a ${selectedSubstance.states.liquid.name}!`);
      } else if (targetState === 'liquid') {
        nextTarget = 'gas';
        setFeedback(`✅ ${selectedSubstance.states.liquid.name} created! Now make it a ${selectedSubstance.states.gas.name}!`);
      } else if (targetState === 'gas') {
        nextTarget = 'solid';
        setFeedback(`✅ ${selectedSubstance.states.gas.name} created! Full cycle completed! +50 points!`);
        setScore(prevScore => prevScore + 50);
        setTimeout(() => {
          setFeedback(`Start a new cycle: Create ${selectedSubstance.states.solid.name}!`);
        }, 2000);
      }
      
      setTargetState(nextTarget);
      
      if (nextTarget !== 'solid') {
        setScore(prevScore => prevScore + 10);
      }
    }
  };

  // Generate particles based on state and temperature
  const generateParticles = (state, temp) => {
    const particleCount = state === 'solid' ? 30 : state === 'liquid' ? 40 : 50;
    const speed = state === 'solid' ? 0.5 : state === 'liquid' ? 1 + (temp/100) : 2 + (temp/50);
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
    }));
    
    setParticles(newParticles);
  };

  // Initialize on load
  useEffect(() => {
    updateState(selectedSubstance, temperature, pressure);
  }, []);

  // Animation loop for particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(p => {
          // Update position
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;
          
          // Bounce off walls
          if (newX < 0 || newX > 100) {
            p.speedX *= -1;
            newX = p.x + p.speedX;
          }
          
          if (newY < 0 || newY > 100) {
            p.speedY *= -1;
            newY = p.y + p.speedY;
          }
          
          return {
            ...p,
            x: newX,
            y: newY
          };
        })
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [particles]);

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
              State Changes Challenge
            </Typography>
            <Box className="mode-score-container">
              <FormControl className="mode-select">
                <InputLabel id="mode-select-label">Mode</InputLabel>
                <Select
                  labelId="mode-select-label"
                  id="mode-select"
                  value={mode.id}
                  label="Mode"
                  onChange={handleModeChange}
                >
                  {challengeModes.map(m => (
                    <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="h6" className="score-display">
                Score: {score}
              </Typography>
            </Box>
          </Box>

          {/* Feedback message */}
          {feedback && (
            <Typography variant="h6" className="feedback">
              {feedback}
            </Typography>
          )}

          {/* Controls Section */}
          <Box className="controls-section">
            <FormControl className="substance-select">
              <InputLabel id="substance-select-label">Substance</InputLabel>
              <Select
                labelId="substance-select-label"
                id="substance-select"
                value={selectedSubstance.id}
                label="Substance"
                onChange={handleSubstanceChange}
              >
                {substances.map(substance => (
                  <MenuItem key={substance.id} value={substance.id}>{substance.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Box className="slider-container">
              <Typography id="temperature-slider-label">
                Temperature: {temperature}°C
              </Typography>
              <Slider
                aria-labelledby="temperature-slider-label"
                min={-250}
                max={400}
                value={temperature}
                onChange={handleTemperatureChange}
                className="temperature-slider"
              />
            </Box>
            
            <Box className="slider-container">
              <Typography id="pressure-slider-label">
                Pressure: {pressure.toFixed(1)} atm
              </Typography>
              <Slider
                aria-labelledby="pressure-slider-label"
                min={0.1}
                max={10}
                step={0.1}
                value={pressure}
                onChange={handlePressureChange}
                className="pressure-slider"
              />
            </Box>
          </Box>

          {/* Simulation Container */}
          <Box 
            className="simulation-container"
            style={{ 
              backgroundColor: selectedSubstance.states[currentState].color,
            }}
          >
            <Typography variant="h5" className="state-label">
              Current State: {selectedSubstance.states[currentState].name}
            </Typography>
            
            {/* Particles */}
            {particles.map(particle => (
              <Box
                key={particle.id}
                className="particle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: currentState === 'gas' ? 0.7 : 1,
                }}
              />
            ))}
          </Box>

          {/* Info panel */}
          <Box className="info-panel">
            <Typography variant="body1">
              <strong>Freezing Point:</strong> {selectedSubstance.freezingPoint}°C | 
              <strong> Boiling Point:</strong> {selectedSubstance.boilingPoint}°C
            </Typography>
            <Typography variant="body2">
              Particles move faster as temperature increases. State changes occur at specific temperatures.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentStateChanges;