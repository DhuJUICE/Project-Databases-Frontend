import React, { useEffect } from "react";
import { getMyPosts } from "../../apiComponents/api-post";
import sampleImages from "../../jsonData/sample-images.json"; 
import sampleProfileImages from "../../jsonData/sample-profile-pics.json";
import CreatePostModal from "./create-post-modal";
import { useMyPosts } from "./MyPostsContext";

const MyPosts = () => {
  const username = localStorage.getItem("username");
  const { posts, addPost, setAllPosts, loading, setLoading, error, setError } = useMyPosts();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * sampleImages.length);
    return sampleImages[randomIndex].url;
  };

  const getRandomProfileImage = () => {
    return sampleProfileImages[0].url;
  };

  useEffect(() => {
    // Only fetch if posts are empty
    if (posts.length === 0) {
      const fetchPosts = async () => {
        setLoading(true);
        const result = await getMyPosts();

        if (result.success) {
          const formattedPosts = result.posts.map((post) => ({
            ...post,
            imgUrl: getRandomImage(),
          }));
          setAllPosts(formattedPosts);
        } else {
          setError(result.message || "Failed to load posts.");
        }
        setLoading(false);
      };

      fetchPosts();
    }
  }, []);

  const handleCreatePost = (newPost) => {
    if (!newPost.image) newPost.image = getRandomImage();

    const formattedPost = {
      id: newPost.id || Math.random().toString(36).substring(2, 10),
      caption: newPost.caption || newPost.content || "",
      imgUrl: typeof newPost.image === "string" ? newPost.image : URL.createObjectURL(newPost.image),
      author: {
        username: username || "You",
        profileImage: getRandomProfileImage(),
      },
      createdAt: new Date().toISOString(),
    };

    addPost(formattedPost);
  };

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
        <div
          className="bg-white rounded-2xl shadow-md p-4 text-gray-500 cursor-pointer hover:shadow-lg transition"
          onClick={() => setIsModalOpen(true)}
        >
          What code are you working on, {username}?
        </div>

        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreatePost}
          username={username}
        />

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
            <div className="flex items-center mb-3">
              <img
                src={getRandomProfileImage()}
                alt={post.author?.username || "You"}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <p className="text-gray-800 font-semibold">{post.author?.username || "You"}</p>
            </div>

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
