import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './images/cine_score.png'; // make sure logo exists

function Header() {
  return (
    <header className="main-header">
      <div className="logo-area">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <h1 className="site-title">Cine<span>Score</span></h1>
      </div>

      <nav className="nav-links">
        <Link to="/Home" className="nav-item">Home</Link>
        <Link to="/TVShows" className="nav-item">TV Shows</Link>
        <Link to="/upcoming" className="nav-item">Upcoming</Link>
        <Link to="/Genre" className="nav-item">Movies</Link>
        {/* <Link to="/search" className="nav-item">Search</Link> */}
        <Link to="/Theater" className="nav-item">Theaters</Link>
        <Link to="/about" className="nav-item">About</Link>
        <Link to="/Contactus" className="nav-item">Contact</Link>
      </nav>

      
    </header>
  );
}

export default Header;
