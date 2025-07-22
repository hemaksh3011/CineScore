import React, { useEffect, useState } from 'react';
import './Genre.css';
import { fetchMovieGenres, fetchMoviesByGenre, fetchBollywoodMovies } from './tmdb';
import { useNavigate } from 'react-router-dom';

function Genre() {
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenresAndMovies = async () => {
      const fetchedGenres = await fetchMovieGenres();
      const filteredGenres = fetchedGenres.filter(g => g.name !== "Romance" && g.name !== "Drama");
      setGenres([{ id: 'bollywood', name: 'Bollywood' }, ...filteredGenres]);

      const genreData = {};
      const saved = JSON.parse(localStorage.getItem('watchlist')) || [];

      const bollywoodMovies = await fetchBollywoodMovies();
      genreData['Bollywood'] = bollywoodMovies.map(movie => ({
        ...movie,
        inWatchlist: saved.some(item => item.id === movie.id),
      }));

      for (const genre of filteredGenres) {
        const movies = await fetchMoviesByGenre(genre.id);
        genreData[genre.name] = movies.map(movie => ({
          ...movie,
          inWatchlist: saved.some(item => item.id === movie.id),
        }));
      }

      setMoviesByGenre(genreData);
    };
    loadGenresAndMovies();
  }, []);

  const toggleWatchlist = (genreName, movie) => {
    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
    const exists = saved.find(item => item.id === movie.id);
    let updated;

    if (exists) {
      updated = saved.filter(item => item.id !== movie.id);
    } else {
      updated = [...saved, movie];
    }

    localStorage.setItem('watchlist', JSON.stringify(updated));

    setMoviesByGenre(prev => ({
      ...prev,
      [genreName]: prev[genreName].map(m =>
        m.id === movie.id ? { ...m, inWatchlist: !exists } : m
      ),
    }));
  };

  const handleSearch = (genreName, movies) => {
    const term = searchTerms[genreName]?.toLowerCase() || "";
    return movies.filter((movie) =>
      movie.title?.toLowerCase().includes(term)
    );
  };

  const handleSearchChange = (genreName, value) => {
    setSearchTerms((prev) => ({
      ...prev,
      [genreName]: value,
    }));
  };

  return (
    <div className="genre-container">
      <h2>🎭 Movies By Genre</h2>

      {genres.map((genre) => (
        <div key={genre.id} className="genre-section">
          <div className="genre-heading">
            <h3>{genre.name}</h3>
            <input
              type="text"
              placeholder={`Search in ${genre.name}`}
              value={searchTerms[genre.name] || ''}
              onChange={(e) => handleSearchChange(genre.name, e.target.value)}
              className="genre-input"
            />
          </div>

          <div className="genre-grid">
            {moviesByGenre[genre.name] &&
              handleSearch(genre.name, moviesByGenre[genre.name]).map((movie) => (
                <div
                  key={movie.id}
                  className="genre-card"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h4>{movie.title}</h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(genre.name, movie);
                    }}
                    title={movie.inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                  >
                    {movie.inWatchlist ? '❌' : '❤️'}
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Genre;
