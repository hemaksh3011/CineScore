// TVDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TVDetail.css';

const API_KEY = '09d4a583c206cebdd85ad57b36cb5a9d';

function TVDetail() {
  const { id } = useParams();
  const [tv, setTV] = useState(null);

  useEffect(() => {
    const fetchTVDetail = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
      );
      const data = await res.json();
      setTV(data);
    };
    fetchTVDetail();
  }, [id]);

  if (!tv) return <div className="loading">Loading...</div>;

  const trailer = tv.videos?.results?.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );

  return (
    <div className="tv-detail-container">
      <div className="poster-section">
        <img
          src={`https://image.tmdb.org/t/p/w400${tv.poster_path}`}
          alt={tv.name}
        />
      </div>
      <div className="info-section">
        <h2>{tv.name}</h2>
        <p><strong>First Air Date:</strong> {tv.first_air_date}</p>
        <p><strong>Rating:</strong> {tv.vote_average} ⭐</p>
        <p><strong>Overview:</strong> {tv.overview}</p>

        {tv.credits?.cast?.length > 0 && (
          <div>
            <strong>Top Cast:</strong>
            <ul>
              {tv.credits.cast.slice(0, 5).map((actor) => (
                <li key={actor.id}>{actor.name}</li>
              ))}
            </ul>
          </div>
        )}

        {trailer && (
          <div className="trailer-section">
            <h3>🎬 Trailer</h3>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default TVDetail;
