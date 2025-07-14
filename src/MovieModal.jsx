import React, { useEffect, useState, useRef } from 'react';
import './MovieModal.css';

const API_KEY = "09d4a583c206cebdd85ad57b36cb5a9d";

function MovieModal({ movie, onClose }) {
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [creditsRes, videoRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`)
        ]);

        const creditsData = await creditsRes.json();
        const videoData = await videoRes.json();

        setCast(creditsData.cast?.slice(0, 5) || []);

        const trailer = videoData.results?.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        setTrailerKey(trailer?.key || null);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchDetails();
  }, [movie]);

  // Auto-scroll to modal when it opens
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <span className="close-btn" onClick={onClose}>×</span>

        <div className="modal-layout">
          {/* Left poster */}
          <div className="modal-left">
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
              className="poster-img"
            />
          </div>

          {/* Right info */}
          <div className="modal-right">
            <h2>{movie.title}</h2>
            {movie.release_date && (
              <p><strong>Release Date:</strong> {movie.release_date}</p>
            )}
            <p><strong>Rating:</strong> {movie.vote_average || "N/A"} ⭐</p>
            <p><strong>Overview:</strong> {movie.overview || "No description available."}</p>

            {cast.length > 0 && (
              <div className="cast-list">
                <strong>Top Cast:</strong>
                <ul>
                  {cast.map((actor) => (
                    <li key={actor.id}>{actor.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {trailerKey && (
              <div className="trailer-section">
                <h3>🎬 Trailer</h3>
                <iframe
                  width="100%"
                  height="220"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="YouTube Trailer"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
