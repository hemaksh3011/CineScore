// Upcoming.js
import React, { useEffect, useState } from 'react';
import './Upcoming.css';
import { fetchUpcomingMovies } from './tmdb';
import { useNavigate } from 'react-router-dom';

function Upcoming() {
  const [upcoming, setUpcoming] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await fetchUpcomingMovies();
      const saved = JSON.parse(localStorage.getItem('watchlist')) || [];

      const updated = data.map((movie) => ({
        ...movie,
        inWatchlist: saved.some((item) => item.id === movie.id),
      }));

      setUpcoming(updated);
    };
    load();
  }, []);

  const toggleWatchlist = (movie) => {
    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
    const exists = saved.find((item) => item.id === movie.id);
    let updated;

    if (exists) {
      updated = saved.filter((item) => item.id !== movie.id);
    } else {
      updated = [...saved, movie];
    }

    localStorage.setItem('watchlist', JSON.stringify(updated));
    setUpcoming((prev) =>
      prev.map((m) =>
        m.id === movie.id ? { ...m, inWatchlist: !exists } : m
      )
    );
  };

  return (
    <div className="upcoming-container">
      <h2>🎬 Upcoming Movies</h2>

      <div className="upcoming-grid">
        {upcoming.map((movie) => (
          <div key={movie.id} className="upcoming-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="upcoming-poster"
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
            <h4>{movie.title}</h4>
            <button onClick={() => toggleWatchlist(movie)} title={movie.inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}>
              {movie.inWatchlist ? '❌' : '❤️'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upcoming;

