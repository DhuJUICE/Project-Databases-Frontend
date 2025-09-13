// Header.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ cartCount }) => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const toggleUserMenu = () => setUserMenuVisible((prev) => !prev);

  const navigate = useNavigate();

  return (
    <div>
      <header>
        <div className="main-bar flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
          {/* Title */}
          <div
            className="title cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-xl font-bold">
              Developer Code Review - Social Media Site
            </h1>
          </div>

          {/* Navigation buttons */}
          <div className="flex space-x-4">
		  <button
              onClick={() => navigate("/my-posts")}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              My Posts
            </button>
            <button
              onClick={() => navigate("/feed")}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Feed
            </button>

            <button
              onClick={() => navigate("/developers")}
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Developers
            </button>
            <button
              onClick={() => navigate("/sign-in")}
              className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/sign-up")}
              className="px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
