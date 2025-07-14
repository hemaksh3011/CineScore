// Upcoming.js

import React, { useEffect, useState } from 'react';
import { fetchUpcomingMovies } from './tmdb';
import MovieModal from './MovieModal';
import './Upcoming.css';

function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchUpcomingMovies();
      setMovies(data);
    };
    load();
  }, []);

  return (
    <div className="upcoming-container">
      <h2>🎬 Upcoming Movies</h2>

      <div className="upcoming-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="upcoming-card"
            onClick={() => setSelectedMovie(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="upcoming-poster"
            />
            <h4>{movie.title}</h4>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default Upcoming;
