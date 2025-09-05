// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount }) => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const toggleUserMenu = () => setUserMenuVisible((prev) => !prev);

  return (
    <div>
      <header>
        <div className="main-bar">
          <Link to="/">
            <div className="title">
              <h1>
                Developer Code Review - Social Media Site
              </h1>
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
