// Header.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const toggleUserMenu = () => setUserMenuVisible((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove access token
    setIsLoggedIn(false); // update state
    navigate("/sign-in"); // redirect to sign-in page
  };

  // Optional: reactively update login state if token changes elsewhere
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Title */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl font-extrabold tracking-tight">DevSocial</h1>
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
            onClick={() => navigate("/following")}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
          >
            Following
          </button>

          {/* Conditional Auth Buttons */}
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
