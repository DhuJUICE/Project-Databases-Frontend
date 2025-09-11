import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";

// Importing your components
import Home from "./components/home";

import FeedPage from "./components/pageComponents/feed-page";
import PostPage from "./components/pageComponents/post-page";
import FollowPage from "./components/pageComponents/developers";

import Sign_In from "./components/userManagementComponents/sign-in";
import Sign_Up from "./components/userManagementComponents/sign-up";
import UploadProduct from "./components/upload-products";
import "./App.css";
import Header from './components/sectionComponents/header'; // Import Header component
import Footer from './components/sectionComponents/footer'; // Import Footer component


function App() {
  return (

      <Router>
        <ScrollToTop /> {/* Ensures scrolling to top on route change */}
        <div className="App">
          <div className="header">
            <Header />
          </div>

          <div className="body">

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/post" element={<PostPage />} />
                <Route path="/developers" element={<FollowPage />} />


                <Route path="/sign-in" element={<Sign_In />} />
                <Route path="/sign-up" element={<Sign_Up />} />
                <Route path="/upload-product" element={<UploadProduct />} />
              </Routes>

          </div>

          <div className="footer">
            <Footer />
          </div>
        </div>
      </Router>

  );
}

export default App;
