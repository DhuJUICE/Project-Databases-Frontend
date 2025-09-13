import React, { useState, useEffect } from "react";
import { getMyPosts } from "../apiComponents/api-post"; // import the API function

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const result = await getMyPosts();

      if (result.success) {
        setPosts(result.posts);
      } else {
        setError(result.message || "Failed to load posts.");
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading your posts...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <main className="w-full max-w-lg p-4 space-y-6">
        {posts.length === 0 && (
          <p className="text-gray-600 text-center">
            You haven’t posted anything yet.
          </p>
        )}

        {posts.map((post) => (
          <div
            key={post.id || post.imgUrl + post.caption} // fallback key if id missing
            className="bg-white rounded-2xl shadow-md p-4"
          >
            {post.caption && (
              <p className="mb-3 text-gray-800">{post.caption}</p>
            )}
            {post.imgUrl && (
              <img
                src={post.imgUrl}
                alt={post.caption}
                className="w-full rounded-lg"
              />
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default MyPosts;
