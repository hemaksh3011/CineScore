import React, { useEffect, useState } from 'react';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Get data from localStorage
    const stored = localStorage.getItem('watchlist');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setWatchlist(parsed);
      } catch (e) {
        console.error("Invalid watchlist format:", e);
      }
    }
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎥 Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>No movies in your watchlist yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {watchlist.map((movie) => (
            <div key={movie.id} style={{ width: "200px" }}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h4>{movie.title}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
