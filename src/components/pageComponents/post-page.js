import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Image as ImageIcon, Send } from "lucide-react";

const DeveloperFeed = () => {
  const [posts, setPosts] = useState([
    {
      id: "9bc84ed0-5e4d-4bac-8285-f135dfeb3b8f",
      imgUrl: "https://img.dev/code7.png",
      caption: "Dark mode toggle with CSS",
    },
  ]);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption && !image) return;

    const newPost = {
      id: uuidv4(),
      imgUrl: image,
      caption: caption,
    };

    setPosts([newPost, ...posts]);
    setCaption("");
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <main className="w-full max-w-lg p-4 space-y-6">
        {/* Post form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-4"
        >
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mb-3 rounded-lg max-h-60 object-cover"
            />
          )}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-blue-600">
              <ImageIcon size={20} />
              <span>Add Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <button
              type="submit"
              className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              <Send size={18} />
              <span>Post</span>
            </button>
          </div>
        </form>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
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
        </div>
      </main>
    </div>
  );
};

export default DeveloperFeed;
