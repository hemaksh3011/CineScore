// Upcoming.js

import React, { useEffect, useState } from 'react';
import { fetchUpcomingMovies } from './tmdb';
import MovieModal from './MovieModal';
import './Upcoming.css';



const Spinner = () => (
  <div style={{ fontSize: '24px', textAlign: 'center' }}>🔄 Loading...</div>
);


export  function MyComponent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (2 second ke liye loading dikhayega)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? <Spinner /> : <p>Yeh tera content hai ✨</p>}
    </div>
  );
}


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
