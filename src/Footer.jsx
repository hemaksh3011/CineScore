import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li><Link to="/Home">Home</Link></li> 
          <li><Link to="/Contactus">Contact Us</Link></li>
          <li><Link to="/About">About</Link></li>
        </ul>

        <p className="footer-text">© 2025 CineScore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
