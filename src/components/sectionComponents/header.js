// Header.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const toggleUserMenu = () => setUserMenuVisible((prev) => !prev);
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Title */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl font-extrabold tracking-tight">
            DevSocial
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/feed")}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Feed
          </button>
          <button
            onClick={() => navigate("/my-posts")}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
          >
            My Posts
          </button>
          <button
            onClick={() => navigate("/developers")}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
          >
            Developers
          </button>

          {/* Sign In / Sign Up for unauthenticated users */}
          <button
            onClick={() => navigate("/sign-in")}
            className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/sign-up")}
            className="px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition"
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
