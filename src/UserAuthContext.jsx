// src/UserAuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(stored);
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.find((item) => item.id === movie.id);
      if (exists) {
        return prev.filter((item) => item.id !== movie.id); // Remove
      } else {
        return [...prev, movie]; // Add
      }
    });
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((item) => item.id === movieId);
  };

  return (
    <UserAuthContext.Provider value={{ watchlist, toggleWatchlist, isInWatchlist }}>
      {children}
    </UserAuthContext.Provider>
  );
};

// Custom hook
export const useUserAuth = () => useContext(UserAuthContext);
