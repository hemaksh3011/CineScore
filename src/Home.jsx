// Home.js
import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from './tmdb';
import MovieModal from './MovieModal';
import HeartButton from './HeartButton';
import './Home.css';

const Spinner = () => (
  <div style={{ fontSize: '24px', textAlign: 'center', marginTop: '2rem' }}>
    🔄 Loading...
  </div>
);

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  return (
    <div className="home-container">
      <h2>🔥 Trending Movies This Week</h2>

      {loading ? (
        <Spinner />
      ) : movies.length === 0 ? (
        <p className="not-found">No movies found</p>
      ) : (
        <div className="movie-slider">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-footer">
                <h4>{movie.title}</h4>
                <HeartButton movie={movie} />
              </div>
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
