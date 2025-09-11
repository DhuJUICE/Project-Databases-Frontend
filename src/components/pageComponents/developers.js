import React, { useState, useEffect } from "react";
import { fetchDevelopers } from "../apiComponents/api-developers"; // adjust path
import { followUser } from "../apiComponents/api-relationships"; // import the follow function

const DeveloperFollow = () => {
  const [developers, setDevelopers] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDevelopers = async () => {
      setLoading(true);
      const result = await fetchDevelopers();
      if (result.success) {
        setDevelopers(result.developers);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    loadDevelopers();
  }, []);

  // This now calls the API to follow the developer
  const handleFollow = async (dev) => {
    const result = await followUser(dev.username);
    if (result.success) {
      setFollowed([...followed, dev]);
    } else {
      alert(result.message);
    }
  };

  const handleUnfollow = (dev) => {
    setFollowed(followed.filter((d) => d.id !== dev.id));
  };

  const notFollowed = developers.filter((d) => !followed.some((f) => f.id === d.id));

  if (loading) return <p style={{ textAlign: "center", marginTop: "1.5rem" }}>Loading developers...</p>;
  if (error) return <p style={{ textAlign: "center", marginTop: "1.5rem", color: "red" }}>{error}</p>;

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "1.5rem"
  };

  const cardStyle = {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    padding: "1rem",
    maxHeight: "70vh",
    overflowY: "auto"
  };

  const buttonStyle = {
    follow: {
      padding: "0.5rem 1rem",
      borderRadius: "1rem",
      backgroundColor: "#2563eb",
      color: "#fff",
      fontWeight: "600",
      border: "none",
      cursor: "pointer"
    },
    unfollow: {
      padding: "0.5rem 1rem",
      borderRadius: "1rem",
      backgroundColor: "#ef4444",
      color: "#fff",
      fontWeight: "600",
      border: "none",
      cursor: "pointer"
    }
  };

  const listItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: "0.75rem",
    borderRadius: "1rem",
    marginBottom: "0.5rem"
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" }}>
        Follow Developers
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", flexWrap: "wrap" }}>
        {/* Left column */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Available to Follow</h3>
          {notFollowed.length > 0 ? notFollowed.map((dev) => (
            <div key={dev.id} style={listItemStyle}>
              <div>
                <p style={{ fontWeight: "600", color: "#000" }}>{dev.firstname} {dev.lastname}</p>
                <span style={{ color: "#6b7280" }}>@{dev.username}</span>
              </div>
              <button style={buttonStyle.follow} onClick={() => handleFollow(dev)}>Follow</button>
            </div>
          )) : <p style={{ color: "#6b7280", textAlign: "center" }}>You're following everyone!</p>}
        </div>

        {/* Right column */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Followed Developers</h3>
          {followed.length > 0 ? followed.map((dev) => (
            <div key={dev.id} style={listItemStyle}>
              <div>
                <p style={{ fontWeight: "600", color: "#000" }}>{dev.firstname} {dev.lastname}</p>
                <span style={{ color: "#6b7280" }}>@{dev.username}</span>
              </div>
              <button style={buttonStyle.unfollow} onClick={() => handleUnfollow(dev)}>Unfollow</button>
            </div>
          )) : <p style={{ color: "#6b7280", textAlign: "center" }}>You haven't followed anyone yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default DeveloperFollow;
