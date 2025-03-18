import React from 'react';
import FeatureCard from "../components/featurecard";
import '../components/buttons.css';
import './register-card.css';
import { useState } from "react";


const RegisterCard = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    return (
        
<div className="register-card">
    <FeatureCard
        className={'register'}
        // title="Sign Up"
        description="Sign Up"
        gradient="mixed"
    >
        <div className='full-name'>
                <input
                    type="text" 
                    className="input-field first-name" 
                    placeholder='First Name'
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)} 
                    required
                />
                <input
                    type="text" 
                    className="input-field last-name" 
                    placeholder='Last Name'
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}  
                    required
                />
        </div>
        <div className="form-group">
            <input 
                type="email" 
                className="input-field email" 
                placeholder='Email'
                value={Email}
                onChange={(e) => setEmail(e.target.value)}  
                required 
            />
            <input 
                type="password" 
                className="input-field password" 
                placeholder='Password'
                value={Password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                className="input-field confirm-password" 
                placeholder='Confirm Password'
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
            />
            <select 
                className='input-field role' 
                value={selectedRole} 
                onChange={(e) => setSelectedRole(e.target.value)}
            >
            <option value="" disabled className='dropdown'>Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
        </div>
        <button className='input-field submit-btn'>Register</button>
        <p className='login-msg'>Already have an account? <a href='/login' className='login-link popup'>Login</a></p>
    </FeatureCard>
</div>
    );
};

export default RegisterCard;