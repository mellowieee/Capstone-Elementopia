import React, { useState } from 'react';
import FeatureCard from "../components/featurecard";
import '../components/buttons.css';
import './register-card.css';

const RegisterCard = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        if (!firstname || !lastname || !email || !username || !password || !confirmPassword || !role) {
            setMessage("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        const userData = { firstname, lastname, email, username, password, role };

        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const result = await response.text();
            console.log("Server Response:", response.status, result);

            if (response.status === 400) {
                setMessage(result); // Display error message (e.g., "Username already taken!")
            } else if (response.ok) {
                setMessage("Registration successful!");
            } else {
                throw new Error(result);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage(`Registration failed: ${error.message}`);
        }
    };

    return (
        <div className="register-card">
            <FeatureCard className="register" description="Sign Up" gradient="mixed">
                <div className="full-name">
                    <input
                        type="text"
                        className="input-field first-name"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="input-field last-name"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="input-field email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="input-field username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="input-field password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="input-field confirm-password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <select
                        className="input-field role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                    </select>
                </div>
                <button className="input-field submit-btn" onClick={handleRegister}>
                    Register
                </button>
                {message && <p className="status-message">{message}</p>}
                <p className="login-msg">
                    Already have an account?{" "}
                    <a href="/login" className="login-link popup">
                        Login
                    </a>
                </p>
            </FeatureCard>
        </div>
    );
};

export default RegisterCard;
