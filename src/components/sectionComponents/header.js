// Header.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFeed } from "../pageComponents/FeedPage/FeedContext";
import { useMyPosts } from "../pageComponents/MyPostsPage/MyPostsContext";
import { useFollowing } from "../pageComponents/FollowingPage/FollowingContext";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  // Context setters
  const { setPosts } = useFeed();
  const { setPosts: setMyPosts } = useMyPosts();
  const { setFollowed, setNotFollowed } = useFollowing();

  const handleLogout = () => {
    // Remove token and stored data
    localStorage.removeItem("token");
    localStorage.removeItem("feedPosts");
    localStorage.removeItem("myPosts");
    localStorage.removeItem("followedDevs");
    localStorage.removeItem("notFollowedDevs");

    // Clear contexts
    setPosts([]);
    setMyPosts([]);
    setFollowed([]);
    setNotFollowed([]);

    setIsLoggedIn(false);
    navigate("/sign-in");
  };

  // Update login state if token changes elsewhere
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
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-2xl font-extrabold tracking-tight">DevSocial</h1>
        </div>

        <nav className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
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
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
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
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
