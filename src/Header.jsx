import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from './images/cine_score.png';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function Header({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/auth");
    });
  };

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
        <Link to="/Theater" className="nav-item">Theaters</Link>
        <Link to="/about" className="nav-item">About</Link>
        <Link to="/Contactus" className="nav-item">Contact</Link>
        {user && <Link to="/watchlist" className="nav-item">Watchlist</Link>}
      </nav>

      <div className="auth-section">
        {user ? (
          <>
            <span className="user-welcome">👤 {user.email}</span>
            <button className="auth-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/auth" className="auth-btn">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
