import React, { useState }  from 'react';
import './login-card.css'; 
import FeatureCard from "../components/featurecard";
import logo from "../assets/Logo.svg";


export default function login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  console.log("footer component rendered!");
    return (
<div className='login-container'>
    
  <FeatureCard
    className={'login'}
    // title="Login"
    description="Sign In"
    gradient="mixed"
  >
    {/* Input field inside the FeatureCard */}
    <input
      type="text"
      placeholder="Username"
      className="input-field username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
        <input
      type="password"
      placeholder="Password"
      className="input-field password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button className="input-field login-button">Login</button>
    <p className='signup-msg'>Don’t have an account? <a href='/sign-up' className='signup-link popup'>Sign Up</a></p>
    
  </FeatureCard>
</div>
    );
}