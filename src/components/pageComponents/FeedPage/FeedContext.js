// FeedContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  // Lazy load from localStorage
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("feedPosts");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(posts.length === 0);
  const [error, setError] = useState(null);

  // Persist posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("feedPosts", JSON.stringify(posts));
  }, [posts]);

  // Replace entire feed (e.g., after first fetch)
  const setAllPosts = (newPosts) => {
    setPosts(newPosts);
    setLoading(false);
  };

  // Update a post in the feed (like, comment, etc.)
  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  // Add a new post to the beginning
  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <FeedContext.Provider
      value={{
        posts,
        setAllPosts,
		setPosts, // <-- add this
        updatePost,
        addPost,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

// Custom hook for convenience
export const useFeed = () => useContext(FeedContext);
