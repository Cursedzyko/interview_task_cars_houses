import React, { useState } from "react";
import { createUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import '../index.css';


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
	<div className="min-h-screen flex items-center justify-center bg-gray-100">
	  <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
		<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
		<form onSubmit={handleSignup} className="space-y-4">
		  <div>
			<input
			  type="text"
			  placeholder="Username"
			  value={username}
			  onChange={(e) => setUsername(e.target.value)}
			  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		  </div>
		  <div>
			<input
			  type="password"
			  placeholder="Password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		  </div>
		  <button
			type="submit"
			className="w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
		  >
			Sign Up
		  </button>
		</form>
	  </div>
	</div>
  );
};

export default Signup;
