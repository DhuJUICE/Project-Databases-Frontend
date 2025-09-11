import React, { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { fetchFeed } from "../apiComponents/api-feed";
import CreatePostModal from "./create-post-modal"; // import modal

const DeveloperFeed = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const getFeed = async () => {
      setLoading(true);
      const result = await fetchFeed();

      if (result.success) {
        const formattedPosts = result.feed.map((post) => ({
          id: post.id,
          image: post.imgUrl,
          content: post.caption,
        }));
        setPostsData(formattedPosts);
      } else {
        setError(result.message);
      }

      setLoading(false);
    };

    getFeed();
  }, []);

  const handleLike = (postId) => {
    if (username) alert(`${username} liked post ${postId}`);
    else alert("You need to be logged in to like posts.");
  };

  const handleComment = (postId) => {
    if (username) alert(`${username} commented on post ${postId}`);
    else alert("You need to be logged in to comment on posts.");
  };

  const handleCreatePost = (newPost) => {
    setPostsData([newPost, ...postsData]);
  };

  const containerStyle = {
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  };

  const mainStyle = {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    marginTop: "1.5rem",
  };

  const createPostStyle = {
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: "0.75rem 1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    cursor: "pointer",
    color: "#6b7280",
  };

  const postCardStyle = {
    backgroundColor: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: "1rem",
    transition: "box-shadow 0.3s ease",
  };

  const postCardHoverStyle = {
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
  };

  const postContentStyle = {
    marginBottom: "0.75rem",
    color: "#111827",
  };

  const postImageStyle = {
    width: "100%",
    borderRadius: "0.75rem",
    marginBottom: "0.75rem",
    objectFit: "cover",
  };

  const actionsStyle = {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: "0.5rem",
    borderTop: "1px solid #e5e7eb",
    color: "#4b5563",
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontSize: "0.95rem",
    color: "#4b5563",
  };

  const buttonHoverStyle = {
    color: "#2563eb",
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading feed...</div>;
  if (error) return <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>{error}</div>;

  return (
    <div style={containerStyle}>
      <main style={mainStyle}>
        {/* Create Post Input Bar */}
        <div style={createPostStyle} onClick={() => setIsModalOpen(true)}>
          What's on your mind, {username}?
        </div>

        {/* Modal */}
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreatePost}
          username={username}
        />

        {/* Posts */}
        {postsData.map((post) => (
          <div
            key={post.id}
            style={postCardStyle}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = postCardHoverStyle.boxShadow)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = postCardStyle.boxShadow)}
          >
            <p style={postContentStyle}>{post.content}</p>
            {post.image && <img src={post.image} alt="Post" style={postImageStyle} />}
            <div style={actionsStyle}>
              <button
                style={buttonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = buttonHoverStyle.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = buttonStyle.color)}
                onClick={() => handleLike(post.id)}
              >
                <ThumbsUp size={18} /> <span>Like</span>
              </button>
              <button
                style={buttonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = buttonHoverStyle.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = buttonStyle.color)}
                onClick={() => handleComment(post.id)}
              >
                <MessageCircle size={18} /> <span>Comment</span>
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default DeveloperFeed;
