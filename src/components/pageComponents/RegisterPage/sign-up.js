// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../../apiComponents/api-signUp";

const Sign_Up = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateSignUpForm = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    let newErrors = {};
    if (!firstname) newErrors.firstname = "First name is required";
    if (!lastname) newErrors.lastname = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser({ firstname, lastname, email, username, password });
      navigate('/sign-in');
    } catch (error) {
      console.error("Sign-up error:", error);
      setErrors({ api: "There was an issue signing up. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={validateSignUpForm} className="space-y-4" autoComplete="off">
          
          <div>
            <label htmlFor="firstname" className="block font-medium mb-1">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter your first name"
              autoComplete="off"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
          </div>

          <div>
            <label htmlFor="lastname" className="block font-medium mb-1">Last Name</label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter your last name"
              autoComplete="off"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              autoComplete="off"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="username" className="block font-medium mb-1">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              autoComplete="new-username"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirm-password" className="block font-medium mb-1">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={togglePasswordVisibility}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="show-password" className="text-gray-700 text-sm">Show Password</label>
          </div>

          {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign_Up;
