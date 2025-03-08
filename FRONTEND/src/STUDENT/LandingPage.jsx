import React from 'react';
import './landing-page.css';

function LandingPage() {
  console.log("LandingPage component rendered!");

  return (
    <div className="landingpage-container">
      <nav className="nav-bar">
        {/* Left Side - Logo */}
        <a className="logo" href='/'>ELEMENTOPIA</a>

        {/* Center Navigation Links */}
        <div className="nav-links">
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
      <div className='content-header'>
        <h1 className='content-title'>Master Chemical Structures Through Play</h1>
        <p className='content-desc'>Build, explore, and learn molecular structures in our engaging 2D chemistry game. Perfect for students, educators, and chemistry enthusiasts.</p>
      </div>
      <div className='content-body'>
        <a href="/login">Get Started</a>
        <a href="/about-us">Learn More</a>
        </div>
    </div>
  );
}

export default LandingPage;
