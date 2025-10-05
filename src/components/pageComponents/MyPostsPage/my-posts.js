// MyPosts.js
import React, { useState, useEffect } from "react";
import { getMyPosts } from "../../apiComponents/api-post";
import sampleImages from "../../jsonData/sample-images.json"; // Import JSON file
import sampleProfileImages from "../../jsonData/sample-profile-pics.json";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper to pick a random image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * sampleImages.length);
    return sampleImages[randomIndex].url;
  };

	// Helper to pick a random image
	const getRandomProfileImage = () => {
		return sampleProfileImages[0].url;
		};

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const result = await getMyPosts();

      if (result.success) {
        // Assign random placeholder image if post doesn't have imgUrl
        const formattedPosts = result.posts.map((post) => ({
          ...post,
          imgUrl: getRandomImage(),
        }));
        setPosts(formattedPosts);
      } else {
        setError(result.message || "Failed to load posts.");
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-600 text-lg animate-pulse">Loading your posts...</p>
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
        {posts.length === 0 && (
          <p className="text-gray-600 text-center text-lg">
            You haven’t posted anything yet.
          </p>
        )}

        {posts.map((post) => (
          <div
            key={post.id || post.imgUrl + post.caption}
            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Post header */}
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex-shrink-0">
				<img
					src={getRandomProfileImage()}

					className="w-10 h-10 rounded-full object-cover"
				/>
				</div>
              <div>
                <p className="text-gray-800 font-semibold">You</p>
              </div>
            </div>

            {/* Post content */}
            {post.caption && (
              <p className="mb-3 text-gray-800 text-md">{post.caption}</p>
            )}
            {post.imgUrl && (
              <img
                src={post.imgUrl}
                alt={post.caption}
                className="w-full rounded-xl object-cover max-h-96"
              />
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default MyPosts;
