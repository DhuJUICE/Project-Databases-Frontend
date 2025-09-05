import React from 'react';
import '../styles/menu.css';

const postsData = [
  {
    id: 1,
    title: "Building a React App",
    author: "Jane Doe",
    image: "https://via.placeholder.com/300x200",
    content: "In this post, I explain how I built a React app from scratch.",
  },
  {
    id: 2,
    title: "GraphQL vs REST",
    author: "John Smith",
    image: "https://via.placeholder.com/300x200",
    content: "I compare GraphQL and REST APIs and show the pros and cons of each.",
  },
  {
    id: 3,
    title: "Tips for JavaScript Developers",
    author: "Alice Johnson",
    image: "https://via.placeholder.com/300x200",
    content: "Here are my top 10 tips to become a better JavaScript developer.",
  },
  {
    id: 4,
    title: "Deploying to AWS",
    author: "Bob Lee",
    image: "https://via.placeholder.com/300x200",
    content: "A quick guide on deploying your applications to AWS.",
  },
];

const DeveloperFeed = () => {
  return (
    <div>
      <main>
        <div className="feed">
          {postsData.map((post) => (
            <div key={post.id} className="post-card">
              <img src={post.image} alt={post.title} />
              <h3>{post.title}</h3>
              <p><strong>By:</strong> {post.author}</p>
              <p>{post.content}</p>
              <button className="like-button">Like</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DeveloperFeed;
