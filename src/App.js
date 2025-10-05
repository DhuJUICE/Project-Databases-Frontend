import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollComponents/scrollToTop";

import MyPostsPage from "./components/pageComponents/MyPostsPage/my-posts";
import FeedPage from "./components/pageComponents/FeedPage/feed-page";

import FollowingPage from "./components/pageComponents/FollowingPage/following";

import Sign_In from "./components/pageComponents/LoginPage/sign-in";
import Sign_Up from "./components/pageComponents/RegisterPage/sign-up";

import Header from './components/sectionComponents/header';
import Footer from './components/sectionComponents/footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header stays at top */}
        <Header />

        {/* Main content grows */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Sign_In />} />
            <Route path="/my-posts" element={<MyPostsPage />} />
            <Route path="/feed" element={<FeedPage />} />

            <Route path="/following" element={<FollowingPage />} />

            <Route path="/sign-in" element={<Sign_In />} />
            <Route path="/sign-up" element={<Sign_Up />} />
          </Routes>
        </main>

        {/* Footer sticks to bottom */}
        <Footer />

        {/* Scroll to Top button */}
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
