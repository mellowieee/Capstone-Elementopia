import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="landingpage-container">
      <nav className="nav-bar">

        {/* Burger Menu Button */}
        <button className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>        

      {/* Dropdown Menu (only appears when burger is clicked) */}
      <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
          <a href="/Dashboard">Dashboard</a>
          <a href="/Custom-Room">Custom Room</a>
          <a href="/Achievements">Achievements</a>
          <a href="/Periodic-Table">Periodic Table</a>
          <a href="/Daily-Challenge">Daily Challenge</a>
          <a href="/Sandbox">Sandbox</a>
        </div>
      {/* )} */}

        {/* Left Side - Logo */}
        <a className="logo" href="/">ELEMENTOPIA</a>

        {/* Center Navigation Links - Hidden when burger is used */}
        <div className= "nav-links">
          <a href="/about-us">About Us</a>
          <a href="/career">Career</a>
          <a href="/contact-us">Contact Us</a>
        </div>

        {/* Right Side - Login & Sign Up */}
        <div className="auth-links">
          <a href="/login">Login</a>
          <a className="signup" href="/sign-up">Sign Up</a>
        </div>
      </nav>
    </div>
  );
}
