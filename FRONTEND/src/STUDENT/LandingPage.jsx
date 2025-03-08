import React from 'react';
import './landing-page.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function LandingPage() {
  console.log("LandingPage component rendered!");
  const settings = {
    dots: true, // Show navigation dots
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of slides visible at a time
    slidesToScroll: 3, // Number of slides to scroll at a time
    autoplay: true, // Auto-play slides
    autoplaySpeed: 3000,
    arrows: true,
  };

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
        <div className='content-introduction'>
          <h2 className='content-intro-title'>Our Mission</h2>
          <p className='content-intro-desc'>Our mission is to make learning chemistry fun and engaging for students of all ages. We believe that by combining education with entertainment, we can create a unique learning experience that will help students master the fundamentals of chemistry.</p>
        </div>
        <div className="carousel-container">
          <h2 className='carousel-label'>Highlights</h2>
        <Slider {...settings}>
          <div className="carousel-slide">
            <img src="https://imgs.search.brave.com/Jx8eAt3b3FFc7T8qGmK4AjpohtGB8b4pA1TYkGAkfTQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzY1LzEzLzk0/LzM2MF9GXzk2NTEz/OTQwOV9JT21HVGVQ/Z2ZFVW44ek1YWnFw/YTlPRXRpRmJndkVC/TC5qcGc" alt="Slide 1" />
          </div>
          <div className="carousel-slide">
            <img src="https://imgs.search.brave.com/o8RJsyBu9AEl2ypNLchMlnv-6kg8ttNiHYsxevChiiQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzYxLzg3LzE3/LzM2MF9GXzk2MTg3/MTc4M19GcGNkd1Zu/bmlJY21tT3YwcjJu/bzJ0MVVxeU9HWEVF/eC5qcGc" alt="Slide 2" />
          </div>
          <div className="carousel-slide">
            <img src="https://cdn1.epicgames.com/spt-assets/419bd4760ed0465ba7f365f56f47d163/shrapnel-19nie.jpg?resize=1&w=480&h=270&quality=medium" alt="Slide 3" />
          </div>
          <div className="carousel-slide">
            <img src="https://cdn1.epicgames.com/spt-assets/419bd4760ed0465ba7f365f56f47d163/shrapnel-19nie.jpg?resize=1&w=480&h=270&quality=medium" alt="Slide 4" />
          </div>
          <div className="carousel-slide">
            <img src="https://cdn1.epicgames.com/spt-assets/419bd4760ed0465ba7f365f56f47d163/shrapnel-19nie.jpg?resize=1&w=480&h=270&quality=medium" alt="Slide 5" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default LandingPage;
