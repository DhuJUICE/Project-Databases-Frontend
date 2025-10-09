// MyPostsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const MyPostsContext = createContext();

// Provider component
export const MyPostsProvider = ({ children }) => {
  // Lazy load posts from localStorage if available
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("myPosts");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(posts.length === 0);
  const [error, setError] = useState("");

  // Persist posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("myPosts", JSON.stringify(posts));
  }, [posts]);

  // Add a new post to the beginning of the list
  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // Update entire posts list (e.g., after first fetch)
  const setAllPosts = (newPosts) => {
    setPosts(newPosts);
    setLoading(false);
  };

  return (
    <MyPostsContext.Provider
      value={{
        posts,
        setAllPosts,
		setPosts, // <-- add this
        addPost,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </MyPostsContext.Provider>
  );
};

// Custom hook to use context easily
export const useMyPosts = () => useContext(MyPostsContext);
