import React, { useState } from "react";
import { createPost } from "../apiComponents/api-post"; // import your API function

const CreatePostModal = ({ isOpen, onClose, onCreate }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState(""); // comma-separated input for tags
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreate = async () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!username || !token) {
      alert("You must be logged in to create a post.");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    setLoading(true);
    try {
      const response = await createPost({
        caption,
        imgUrl: image ? URL.createObjectURL(image) : "default.png",
        tags: tagArray.length ? tagArray : ["general"],
      });

      if (response.success) {
        alert("Post created successfully!");
        // Pass created post back to parent component
        onCreate({
          caption,
          image,
          id: Math.random().toString(36).substring(2, 10), // mock id
          tags: tagArray.length ? tagArray : ["general"],
        });

        // Reset form
        setCaption("");
        setImage(null);
        setTags("");
        onClose();
      } else {
        alert(response.message || "Failed to create post.");
      }
    } catch (error) {
      console.error("Create post error:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const contentStyle = {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "1rem",
    width: "90%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const inputStyle = {
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <h2>Create Post</h2>

        <input
          type="text"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={inputStyle}
        />

        <input
          type="file"
          onChange={handleImageChange}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Add tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={inputStyle}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button
            style={{ ...buttonStyle, backgroundColor: "#6b7280" }}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button style={buttonStyle} onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
