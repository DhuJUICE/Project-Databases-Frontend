import React from 'react';
import '../../App.css';

const Footer = () => {
  return (
    <div>

      <div className="copyrights">
        <p>
          &copy; {new Date().getFullYear()} Tummy Yummy's. All Rights Reserved. | Developed by JugamSoft Technologies
        </p>
      </div>
    </div>
  );
};

export default Footer;
