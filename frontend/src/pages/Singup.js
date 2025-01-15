import React, { useState } from "react";
import { createUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username: username.trim(),
                password: password,
                roles: [],      
                permissions: [],
            };

            console.log("Sending payload:", payload);
            await createUser(payload);
            alert("Account created successfully! You can now log in.");
            navigate("/login");
        } catch (error) {
            console.error("Error creating account:", error.response?.data || error.message);
            alert("Error creating account: " + (error.response?.data?.detail || error.message));
        }
    };


    return (
        <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
        </form>
        </div>
    );
};

export default Signup;
