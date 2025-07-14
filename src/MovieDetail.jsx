import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetailById } from './tmdb';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieDetailById(id);
      setMovie(data);

      const trailer = data.videos?.results?.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) setTrailerKey(trailer.key);
    };
    loadMovie();
  }, [id]);

  if (!movie) return <p className="loading-text">Loading...</p>;

  return (
    <div className="movie-detail-container">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p><strong>🗓 Release Date:</strong> {movie.release_date}</p>
        <p><strong>⭐ Rating:</strong> {movie.vote_average}</p>
        <p><strong>🎬 Runtime:</strong> {movie.runtime} mins</p>
        <p><strong>📚 Overview:</strong> {movie.overview}</p>

        <div className="cast-section">
          <strong>Top Cast:</strong>
          <ul>
            {movie.credits?.cast?.slice(0, 5).map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>

        {trailerKey && (
          <div className="trailer-box">
            <h3>🎞 Watch Trailer</h3>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
