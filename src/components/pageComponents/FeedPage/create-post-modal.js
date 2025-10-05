// CreatePostModal.js
import React, { useState } from "react";
import { createPost } from "../../apiComponents/api-post";

const CreatePostModal = ({ isOpen, onClose, onCreate }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  // Validation messages
  const [errors, setErrors] = useState({ caption: "", image: "", tags: "" });

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setErrors((prev) => ({ ...prev, tags: "" }));
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleCreate = async () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!username || !token) {
      setErrors({ caption: "", image: "", tags: "You must be logged in." });
      return;
    }

    // Reset errors
    let newErrors = { caption: "", image: "", tags: "" };
    if (!caption.trim()) newErrors.caption = "Caption is required.";
    if (!image) newErrors.image = "Image is required.";
    if (tags.length === 0) newErrors.tags = "Add at least one tag.";

    setErrors(newErrors);

    if (newErrors.caption || newErrors.image || newErrors.tags) return;

    setLoading(true);
    try {
      const response = await createPost({
        caption,
        imgUrl: URL.createObjectURL(image),
        tags,
      });

      if (response.success) {
        onCreate({
          caption,
          image,
          id: Math.random().toString(36).substring(2, 10),
          tags,
        });

        setCaption("");
        setImage(null);
        setTags([]);
        setTagInput("");
        setErrors({ caption: "", image: "", tags: "" });
        onClose();
      } else {
        setErrors({ caption: "", image: "", tags: response.message || "Failed to create post." });
      }
    } catch (error) {
      console.error("Create post error:", error);
      setErrors({ caption: "", image: "", tags: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800">Create Post</h2>

        {/* Caption */}
        <input
          type="text"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
            if (e.target.value.trim()) setErrors((prev) => ({ ...prev, caption: "" }));
          }}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.caption ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.caption && <p className="text-red-500 text-sm">{errors.caption}</p>}

        {/* Image */}
        <input
          type="file"
          onChange={handleImageChange}
          className={`w-full text-gray-700 ${errors.image ? "border border-red-500" : ""}`}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

        {/* Tags Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
        {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}

        {/* Display tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-gray-500 hover:text-gray-800 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
