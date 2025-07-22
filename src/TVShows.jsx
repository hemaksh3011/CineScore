// TVShows.js
import React, { useEffect, useState } from 'react';
import './TVShows.css';
import { fetchTrendingTvShows, searchTvShows } from './tmdb';
import { useNavigate } from 'react-router-dom';

function TvShows() {
  const [tvShows, setTvShows] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await fetchTrendingTvShows();
      const saved = JSON.parse(localStorage.getItem('watchlist')) || [];

      const updated = data.map((tv) => ({
        ...tv,
        inWatchlist: saved.some((s) => s.id === tv.id),
      }));

      setTvShows(updated);
    };
    load();
  }, []);

  const handleSearch = async () => {
    if (query.trim() === "") return;
    const results = await searchTvShows(query);
    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];

    const updated = results.map((tv) => ({
      ...tv,
      inWatchlist: saved.some((s) => s.id === tv.id),
    }));

    setTvShows(updated);
  };

  const toggleWatchlist = (tv) => {
    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
    const exists = saved.find((item) => item.id === tv.id);
    let updated;

    if (exists) {
      updated = saved.filter((item) => item.id !== tv.id);
    } else {
      updated = [...saved, tv];
    }

    localStorage.setItem('watchlist', JSON.stringify(updated));
    setTvShows((prev) =>
      prev.map((t) =>
        t.id === tv.id ? { ...t, inWatchlist: !exists } : t
      )
    );
  };

  return (
    <div className="tv-container">
      <h2>📺 Trending TV Shows</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search TV Shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="tv-grid">
        {tvShows.map((tv) => (
          <div key={tv.id} className="tv-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}
              alt={tv.name}
              className="tv-poster"
              onClick={() => navigate(`/tv/${tv.id}`)}
            />
            <h4>{tv.name}</h4>
            <button onClick={() => toggleWatchlist(tv)}>
              {tv.inWatchlist ? '❌' : '❤️'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TvShows;
