import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollComponents/scrollToTop";

import MyPostsPage from "./components/pageComponents/MyPostsPage/my-posts";
import FeedPage from "./components/pageComponents/FeedPage/feed-page";
import FollowPage from "./components/pageComponents/DevelopersPage/developers";
import Sign_In from "./components/pageComponents/LoginPage/sign-in";
import Sign_Up from "./components/pageComponents/RegisterPage/sign-up";


import Header from './components/sectionComponents/header'; // Import Header component
import Footer from './components/sectionComponents/footer'; // Import Footer component


function App() {
  return (

      <Router>
        
        <div className="App">
          <main>
		  <Header />
              <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/my-posts" element={<MyPostsPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/developers" element={<FollowPage />} />
                <Route path="/sign-in" element={<Sign_In />} />
                <Route path="/sign-up" element={<Sign_Up />} />
              </Routes>
			<Footer />
			<ScrollToTop /> {/* Ensures scrolling to top on route change */}
          </main>
        </div>
      </Router>

  );
}

export default App;
