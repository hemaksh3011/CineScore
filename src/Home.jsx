import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from './tmdb';
import MovieModal from './MovieModal';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadTrending = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };
    loadTrending();
  }, []);

  return (
    <div className="home-container">
      <h2>🔥 Trending Movies This Week</h2>

      {movies.length === 0 ? (
        <p className="not-found">No movies found 😔</p>
      ) : (
        <div className="movie-slider">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <h4>{movie.title}</h4>
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default Home;