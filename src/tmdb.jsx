const API_KEY = '09d4a583c206cebdd85ad57b36cb5a9d';
const BASE_URL = 'https://api.themoviedb.org/3';

// 🔥 Trending Movies (Weekly)
export async function fetchTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// 📺 Trending TV Shows (Weekly)
export async function fetchTrendingTvShows() {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// 🔍 Search Movies by Name
export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.results;
}

// 🔍 Search TV Shows by Name
export async function searchTvShows(query) {
  const res = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.results;
}

// 🎭 Get Movie Genres
export async function fetchMovieGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();
  return data.genres;
}

// 🎭 Get Movies by Genre ID
export async function fetchMoviesByGenre(genreId) {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await res.json();
  return data.results;
}

// 🇮🇳 Bollywood Movies (Hindi Language)
export async function fetchBollywoodMovies() {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&region=IN`);
  const data = await res.json();
  return data.results;
}

// 📅 Upcoming Movies
export async function fetchUpcomingMovies() {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// 📋 Full Movie Details by ID (includes cast & videos)
export async function fetchMovieDetailById(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`);
  const data = await res.json();
  return data;
}
