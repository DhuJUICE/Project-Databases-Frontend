import React from "react";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

const postsData = [
  {
    id: 1,
    title: "Building a React App",
    author: "Jane Doe",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/600x300",
    content: "In this post, I explain how I built a React app from scratch.",
    time: "2h ago",
  },
  {
    id: 2,
    title: "GraphQL vs REST",
    author: "John Smith",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/600x300",
    content:
      "I compare GraphQL and REST APIs and show the pros and cons of each.",
    time: "5h ago",
  },
  {
    id: 3,
    title: "Tips for JavaScript Developers",
    author: "Alice Johnson",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/600x300",
    content: "Here are my top 10 tips to become a better JavaScript developer.",
    time: "1d ago",
  },
  {
    id: 4,
    title: "Deploying to AWS",
    author: "Bob Lee",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/600x300",
    content: "A quick guide on deploying your applications to AWS.",
    time: "2d ago",
  },
];

const DeveloperFeed = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <main className="w-full max-w-xl mt-6 space-y-6">
        {postsData.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md p-4 transition hover:shadow-lg"
          >
            {/* Author row */}
            <div className="flex items-center mb-3">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{post.author}</p>
                <span className="text-sm text-gray-500">{post.time}</span>
              </div>
            </div>

            {/* Content */}
            <p className="mb-3 text-gray-800">{post.content}</p>

            {/* Image */}
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full rounded-lg mb-3"
              />
            )}

            {/* Actions */}
            <div className="flex justify-around text-gray-600 border-t pt-2">
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <ThumbsUp size={18} /> <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <MessageCircle size={18} /> <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <Share2 size={18} /> <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default DeveloperFeed;
