// Watchlist.js
import React, { useEffect, useState } from 'react';
import './Watchlist.css';
import { useNavigate } from 'react-router-dom';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(saved);
  }, []);

  const removeFromWatchlist = (id) => {
    const updated = watchlist.filter((item) => item.id !== id);
    localStorage.setItem('watchlist', JSON.stringify(updated));
    setWatchlist(updated);
  };

  return (
    <div className="watchlist-container">
      <h2>📌 My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((item) => (
            <div key={item.id} className="watchlist-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                onClick={() =>
                  navigate(item.title ? `/movie/${item.id}` : `/tv/${item.id}`)
                }
              />
              <h4>{item.title || item.name}</h4>
              <button onClick={() => removeFromWatchlist(item.id)}>
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
