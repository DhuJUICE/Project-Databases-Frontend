import React, { useState } from "react";

const CreatePostModal = ({ isOpen, onClose, onCreate, username }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreate = () => {
    const postId = Math.random().toString(36).substring(2, 10); // mock id
    alert(`${username} created post with id ${postId}`);
    onCreate({ caption, image, id: postId });
    setCaption("");
    setImage(null);
    onClose();
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
        <input type="file" onChange={handleImageChange} style={inputStyle} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button style={{ ...buttonStyle, backgroundColor: "#6b7280" }} onClick={onClose}>
            Cancel
          </button>
          <button style={buttonStyle} onClick={handleCreate}>
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
