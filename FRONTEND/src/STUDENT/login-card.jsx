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
      const response = await UserService.loginUser(
        username.toLowerCase(),
        password
      );

      if (response) {
        setMessage("Login successful! Redirecting...");

        // Save user session (tungod sa Spring Security :3)
        sessionStorage.setItem("user", JSON.stringify(response));

        setTimeout(() => {
          onLoginSuccess && onLoginSuccess();
          navigate("/student-home-page");
        }, 1500);
      } else {
        setMessage("Invalid username or password.");
      }
    } catch (error) {
      setMessage("Login failed: " + (error.response?.data || error.message));
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
