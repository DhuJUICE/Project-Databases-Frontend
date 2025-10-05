// DeveloperFeed.js
import React, { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { fetchFeed } from "../../apiComponents/api-feed";
import { likePost, unlikePost, commentPost } from "../../apiComponents/api-relationships";
import CreatePostModal from "./create-post-modal";
import sampleImages from "../../jsonData/sample-images.json";

const DeveloperFeed = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const username = localStorage.getItem("username");

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * sampleImages.length);
    return sampleImages[randomIndex].url;
  };

  useEffect(() => {
    const getFeed = async () => {
      setLoading(true);
      const result = await fetchFeed();

      if (result.success) {
        const formattedPosts = result.feed.map((post) => ({
          id: post.id,
          image: getRandomImage(),
          content: post.caption,
          tags: post.tags || [],
          createdAt: post.createdAt,
          comments: [], // Initialize empty comments array
          showCommentInput: false, // Toggle input visibility
          newComment: "", // Track current input
        }));
        setPostsData(formattedPosts);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    getFeed();
  }, []);

  const handleLike = async (postId) => {
    if (!username) return alert("You need to be logged in to like posts.");
    const result = await likePost(postId);
    if (result.success) alert(`You liked post ${postId}`);
    else alert(result.message || "Failed to like post.");
  };

  const handleUnLike = async (postId) => {
    if (!username) return alert("You need to be logged in to unlike posts.");
    const result = await unlikePost(postId);
    if (result.success) alert(`You unliked post ${postId}`);
    else alert(result.message || "Failed to unlike post.");
  };

  const toggleCommentInput = (postId) => {
    setPostsData((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, showCommentInput: !post.showCommentInput }
          : post
      )
    );
  };

  const handleCommentChange = (postId, value) => {
    setPostsData((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, newComment: value } : post
      )
    );
  };

  const handleAddComment = async (postId) => {
    const post = postsData.find((p) => p.id === postId);
    if (!username) return alert("You need to be logged in to comment.");
    if (!post.newComment.trim()) return;

    const result = await commentPost(postId, post.newComment);
    if (result.success) {
      setPostsData((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: [...p.comments, { username, text: p.newComment }],
                newComment: "",
              }
            : p
        )
      );
    } else {
      alert(result.message || "Failed to add comment.");
    }
  };

  const handleCreatePost = (newPost) => {
    if (!newPost.image) newPost.image = getRandomImage();
    setPostsData([newPost, ...postsData]);
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">Loading feed...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-8">
      <main className="w-full max-w-3xl px-4 space-y-6">
        {/* Create Post Input Bar */}
        <div
          className="bg-white rounded-2xl shadow-md p-4 text-gray-500 cursor-pointer hover:shadow-lg transition"
          onClick={() => setIsModalOpen(true)}
        >
          What's on your mind, {username}?
        </div>

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
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            <p className="text-gray-800 mb-3">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full rounded-xl object-cover max-h-96 mb-3"
              />
            )}

            <div className="flex justify-between border-t border-gray-200 pt-3 text-gray-500">
              <button
                className="flex items-center gap-1 hover:text-blue-600 transition"
                onClick={() => handleLike(post.id)}
              >
                <ThumbsUp size={18} /> Like
              </button>
              <button
                className="flex items-center gap-1 hover:text-blue-600 transition"
                onClick={() => handleUnLike(post.id)}
              >
                <ThumbsUp size={18} /> UnLike
              </button>
              <button
                className="flex items-center gap-1 hover:text-blue-600 transition"
                onClick={() => toggleCommentInput(post.id)}
              >
                <MessageCircle size={18} /> Comment
              </button>
            </div>

            {/* Inline Comment Section */}
            {post.showCommentInput && (
              <div className="mt-3">
                {post.comments.map((c, idx) => (
                  <div key={idx} className="text-gray-700 text-sm mb-1">
                    <span className="font-semibold">{c.username}: </span>
                    {c.text}
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={post.newComment}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default DeveloperFeed;
