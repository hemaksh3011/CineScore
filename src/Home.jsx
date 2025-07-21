import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from './tmdb';
import MovieModal from './MovieModal';
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
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

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

  const toggleWatchlist = (movie) => {
    let updated;
    const exists = watchlist.some((m) => m.id === movie.id);
    if (exists) {
      updated = watchlist.filter((m) => m.id !== movie.id);
    } else {
      updated = [...watchlist, movie];
    }
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return (
    <div className="home-container">
      <h2>🔥 Trending Movies This Week</h2>

      {loading ? (
        <Spinner />
      ) : movies.length === 0 ? (
        <p className="not-found">Loading</p>
      ) : (
        <div className="movie-slider">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div
                className="watchlist-icon"
                onClick={() => toggleWatchlist(movie)}
              >
                {isInWatchlist(movie.id) ? "💖" : "🤍"}
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                onClick={() => setSelectedMovie(movie)}
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
