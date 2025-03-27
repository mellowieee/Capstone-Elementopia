import React, { useState } from 'react';
import './login-card.css'; 
import FeatureCard from "../components/featurecard";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            setMessage("Both fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.text();
            console.log("Server Response:", response.status, result);

            if (response.ok) {
                setMessage("Login successful!");
                // Redirect user after successful login
                setTimeout(() => {
                    window.location.href = "/student-home-page"; // Change this to the actual dashboard page
                }, 1000);
            } else {
                setMessage(result); // Display error message from the backend
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage("Login failed. Please try again.");
        }
    };

    return (
        <div className='login-container'>
            <FeatureCard className="login" description="Sign In" gradient="mixed">
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
                <button className="input-field login-button" onClick={handleLogin}>
                    Login
                </button>
                {message && <p className="status-message">{message}</p>}
                <p className='signup-msg'>Don’t have an account? <a href='/sign-up' className='signup-link popup'>Sign Up</a></p>
            </FeatureCard>
        </div>
    );
}
