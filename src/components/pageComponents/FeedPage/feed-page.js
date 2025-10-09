import React, { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import { fetchFeed } from "../../apiComponents/api-feed";
import { likePost, unlikePost, commentPost } from "../../apiComponents/api-relationships";
import sampleImages from "../../jsonData/sample-images.json";
import sampleProfileImages from "../../jsonData/sample-profile-pics.json";
import { useFeed } from "./FeedContext";

const DEFAULT_PROFILE_IMG = "https://via.placeholder.com/40?text=Dev";

const DeveloperFeed = () => {
  const username = localStorage.getItem("username");
  const { posts, setAllPosts, updatePost, loading, setLoading, error, setError } = useFeed();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * sampleImages.length);
    return sampleImages[randomIndex].url;
  };

  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * sampleProfileImages.length);
    return sampleProfileImages[randomIndex].url;
  };

  useEffect(() => {
    if (posts.length === 0) {
      const getFeed = async () => {
        setLoading(true);
        const result = await fetchFeed();

        if (result.success) {
          const formattedPosts = result.feed.map((post) => {
            const author = post.author
              ? { username: post.author, profileImage: getRandomProfileImage() }
              : { username: "Unknown", profileImage: getRandomProfileImage() };

            return {
              id: post.id,
              image: getRandomImage(),
              content: post.caption,
              author,
              tags: post.tags || [],
              createdAt: post.datePosted,
              likedByCurrentUser: post.likedByCurrentUser || false,
              comments: (post.comments || []).map((c) => ({
                id: c.id,
                username: c.author,
                text: c.comment,
              })),
              newComment: "",
            };
          });

          setAllPosts(formattedPosts);
        } else {
          setError(result.message);
        }
        setLoading(false);
      };

      getFeed();
    }
  }, []);

  const handleToggleLike = async (postId, currentlyLiked) => {
    if (!username) return alert("You need to be logged in to like posts.");
    let result;
    if (currentlyLiked) result = await unlikePost(postId);
    else result = await likePost(postId);

    if (result.success) {
      const updatedPost = posts.find((p) => p.id === postId);
      if (updatedPost) {
        updatePost({ ...updatedPost, likedByCurrentUser: !currentlyLiked });
      }
    } else {
      alert(result.message || "Failed to update like status.");
    }
  };

  const handleCommentChange = (postId, value) => {
    const updatedPost = posts.find((p) => p.id === postId);
    if (updatedPost) {
      updatePost({ ...updatedPost, newComment: value });
    }
  };

  const handleAddComment = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (!username) return alert("You need to be logged in to comment.");
    if (!post.newComment.trim()) return;

    const result = await commentPost(postId, post.newComment);
    if (result.success) {
      const updatedPost = {
        ...post,
        comments: [...post.comments, { id: Date.now(), username, text: post.newComment }],
        newComment: "",
      };
      updatePost(updatedPost);
    } else {
      alert(result.message || "Failed to add comment.");
    }
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
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={post.author?.profileImage || DEFAULT_PROFILE_IMG}
                alt={post.author?.username || "Unknown"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-800">{post.author?.username || "Unknown"}</span>
            </div>

            <p className="text-gray-800 mb-3">{post.content}</p>
            {post.image && (
              <img src={post.image} alt="Post" className="w-full rounded-xl object-cover max-h-96 mb-3" />
            )}

            <div className="flex justify-start border-t border-gray-200 pt-3 text-gray-500">
              <button
                className={`flex items-center gap-1 transition ${
                  post.likedByCurrentUser ? "text-blue-600" : "hover:text-blue-600"
                }`}
                onClick={() => handleToggleLike(post.id, post.likedByCurrentUser)}
              >
                <ThumbsUp size={18} />
                {post.likedByCurrentUser ? "Liked" : "Like"}
              </button>
            </div>

            <div className="mt-3">
              {post.comments.map((c) => (
                <div key={c.id} className="text-gray-700 text-sm mb-1">
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
                  Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default DeveloperFeed;
