// FollowingContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const FollowingContext = createContext();

export const FollowingProvider = ({ children }) => {
  // Lazy load from localStorage if available
  const [followed, setFollowed] = useState(() => {
    const saved = localStorage.getItem("followedDevs");
    return saved ? JSON.parse(saved) : [];
  });

  const [notFollowed, setNotFollowed] = useState(() => {
    const saved = localStorage.getItem("notFollowedDevs");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(followed.length === 0 && notFollowed.length === 0);
  const [error, setError] = useState("");

  // Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("followedDevs", JSON.stringify(followed));
  }, [followed]);

  useEffect(() => {
    localStorage.setItem("notFollowedDevs", JSON.stringify(notFollowed));
  }, [notFollowed]);

  // Replace all developers (after initial fetch)
  const setAllDevelopers = (followedList, notFollowedList) => {
    setFollowed(followedList);
    setNotFollowed(notFollowedList);
    setLoading(false);
  };

  // Follow a developer
  const followDev = (dev) => {
    setFollowed((prev) => [...prev, dev]);
    setNotFollowed((prev) => prev.filter((d) => d.id !== dev.id));
  };

  // Unfollow a developer
  const unfollowDev = (dev) => {
    setFollowed((prev) => prev.filter((d) => d.id !== dev.id));
    setNotFollowed((prev) => [...prev, dev]);
  };

  return (
    <FollowingContext.Provider
      value={{
        followed,
        notFollowed,
        setAllDevelopers,
		setFollowed,
		setNotFollowed,
        followDev,
        unfollowDev,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </FollowingContext.Provider>
  );
};

// Custom hook
export const useFollowing = () => useContext(FollowingContext);
