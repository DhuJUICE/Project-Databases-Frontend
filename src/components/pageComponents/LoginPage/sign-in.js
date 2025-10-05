// SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../apiComponents/api-signIn';

const Sign_In = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const userName = document.getElementById('username').value;
    const userPassword = document.getElementById('password').value;

    const result = await signIn(userName, userPassword);

    if (result.success) {
      setSuccessMessage('Logged in successfully!');
      navigate('/feed');
      window.location.reload(); // update Footer and everything else
    } else {
      setErrorMessage(result.message || 'Login failed.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h1>

        <form onSubmit={validateForm} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-gray-700 font-medium">
              Username or Email
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username or email"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Enter your password"
              minLength="3"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="show-password" className="text-gray-700 text-sm">
              Show Password
            </label>
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign_In;
