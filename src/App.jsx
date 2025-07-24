// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Upcoming from './Upcoming';
import Contactus from './Contactus';
import TVDetail from './TVDetail';
import Genre from './Genre';
import About from './About';
import Theater from './Theater';
import MovieDetail from './MovieDetail';
import TVShows from './TVShows';
import AuthPage from './AuthPage';
import Watchlist from './Watchlist';

import './App.css';
import bg from './images/Moody4_bg.jpg';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // ✅ Your firebase config file

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Automatically track login status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header user={user} />
        <img src={bg} alt="" className='bg-image' />

        <div className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/tv/:id" element={<TVDetail />} />
            <Route path="/Genre" element={<Genre />} />
            <Route path="/TVShows" element={<TVShows />} />
            <Route path="/Upcoming" element={<Upcoming />} />
            <Route path="/Theater" element={<Theater />} />
            <Route path="/Contactus" element={<Contactus />} />
            <Route path="/About" element={<About />} />
            <Route path="/Auth" element={<AuthPage />} />
            <Route path="/watchlist" element={<Watchlist />} />



            
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
