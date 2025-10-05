// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white shadow-inner mt-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-sm">
        {/* Left side */}
        <div>
          &copy; {new Date().getFullYear()} Social Coder. All Rights Reserved.
        </div>

        {/* Right side */}
        <div className="text-gray-400">
          Developed by <span className="font-semibold text-white">HERANSOFT</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
