import React, { useState } from "react";
import "./login-card.css";
import FeatureCard from "../components/featurecard";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setMessage("");

    if (!username.trim() || !password.trim()) {
      setMessage("Username and password are required!");
      return;
    }

    try {
      const response = await UserService.loginUser(username.toLowerCase(), password);

      if (response && response.token) {
        // Assuming `response.token` contains a JWT or session token
        setMessage("Login successful! Redirecting...");

        // Save user session (Spring Security requirement)
        sessionStorage.setItem("user", JSON.stringify(response));

        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
          navigate("/student-home-page"); // Redirect to the actual dashboard page
          onLoginSuccess && onLoginSuccess();
          navigate("/student-home-page");
        }, 1500);
      } else {
        setMessage(response.message || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
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
        <p className="signup-msg">
          Don’t have an account?{" "}
          <a href="/sign-up" className="signup-link popup">
            Sign Up
          </a>
        </p>
      </FeatureCard>
    </div>
  );
}
