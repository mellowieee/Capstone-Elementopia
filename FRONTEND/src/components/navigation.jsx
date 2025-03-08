import React from 'react';
import './navigation.css'; 

export default function Navigation() {
  console.log("Navigation component rendered!");
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
        </div>
    );
}