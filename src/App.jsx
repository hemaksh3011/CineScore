// App.js
import React from 'react';
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
import MovieDetail from './MovieDetail';  // ✅ fixed import name
import TVShows from './TVShows';
import './App.css';
import bg from './images/Moody4_bg.jpg';

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header />
        <img src={bg} alt="" className='bg-image' />
        <div className="main-content">
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/movie/:id' element={<MovieDetail />} />
            <Route path='/Contactus' element={<Contactus />} />
            <Route path='/tv/:id' element={<TVDetail />} />
            <Route path='/Genre' element={<Genre />} />
            <Route path='/About' element={<About />} />
            <Route path='/TVShows' element={<TVShows />} />
            <Route path='/Upcoming' element={<Upcoming />} />
            <Route path='/Theater' element={<Theater />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
