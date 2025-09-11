import React, { useState } from 'react';
import '../../styles/sign-up.css'; // Optional, keep for your styling
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../apiComponents/api-signUp"; // Your API call

const Sign_Up = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateSignUpForm = async (event) => {
    event.preventDefault();

    // Get values from the form
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Basic validation
    if (!firstname || !lastname || !email || !username || !password) {
      alert("Please fill in all required fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Call your API to register the user
      const data = await registerUser({ firstname, lastname, email, username, password, confirmPassword });

      // Redirect to login
      navigate('/sign-in');
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("There was an issue signing up. Please try again.");
    }
  };

  return (
    <div>
      <main className="sign-up flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
          <form id="sign-up-form" onSubmit={validateSignUpForm} className="space-y-4">
            <div>
              <label htmlFor="firstname" className="block font-semibold mb-1">First Name:</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter your first name"
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block font-semibold mb-1">Last Name:</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter your last name"
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold mb-1">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="username" className="block font-semibold mb-1">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Choose a username"
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-semibold mb-1">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                minLength="3"
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block font-semibold mb-1">Confirm Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm your password"
                minLength="3"
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <label htmlFor="show-password">Show Password</label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 font-semibold"
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Sign_Up;
