// index.js

import React, { createContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Create a context object
export const FavoritesContext = createContext();

// Define initial state and local storage key
const initialState = [];
const localStorageKey = 'favorites';

// Create a context provider component
export const FavoritesProvider = ({ children }) => {
  // State to hold favorites
  const [favorites, setFavorites] = useState(initialState);

  // Function to add to favorites
  const addToFavorites = (episode, show, season) => {
    const newFavorite = {
      episode,
      show,
      season,
      dateAdded: new Date().toISOString(), // Adding the current date/time
    };
    setFavorites([...favorites, newFavorite]);
  };

  // Function to remove from favorites
  const removeFromFavorites = (episodeNumber) => {
    setFavorites((previousFavorites) =>
      previousFavorites.filter(
        (favorite) => favorite.episode !== episodeNumber
      )
    );
  };

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Sync favorites state with local storage
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(favorites));
  }, [favorites]);

  // Context value to be provided
  const contextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };

  // Provide the context value to the components
  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Use createRoot from react-dom/client
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>
);
