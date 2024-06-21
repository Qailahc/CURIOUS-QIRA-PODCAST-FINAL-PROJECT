import React, { useState, useEffect } from 'react';

// FavoritesPage component
const FavoritesPage = () => {
  const localStorageKey = 'favorites'; // Key for local storage
  const [favorites, setFavorites] = useState([]); // State to store favorite podcasts
  const [sortBy, setSortBy] = useState('title-asc'); // State to manage sorting criteria

  // Sort functions for different criteria
  const sortByTitleAsc = (data) =>
    [...data].sort((a, b) => {
      if (!a.title || !b.title) return 0; // Defensive check for undefined titles
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    });

  const sortByTitleDesc = (data) =>
    [...data].sort((a, b) => {
      if (!a.title || !b.title) return 0; // Defensive check for undefined titles
      return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
    });

  const sortByDateAddedDesc = (data) =>
    [...data].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

  // Handler for sorting change
  const handleSortChange = (event) => {
    setSortBy(event.target.value); // Update sorting criteria
  };

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    setFavorites(storedFavorites);
  }, []);

  // Update local storage when favorites change
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem(localStorageKey, JSON.stringify(favorites));
    }
  }, [favorites]);

  // Function to remove podcast from favorites
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((item) => item.episode.id !== id);
    setFavorites(updatedFavorites); // Update favorites state
  };

  // Sort the data based on selected criteria
  let sortedData = [...favorites];
  if (sortBy === 'title-asc') {
    sortedData = sortByTitleAsc(sortedData);
  } else if (sortBy === 'title-desc') {
    sortedData = sortByTitleDesc(sortedData);
  } else if (sortBy === 'date-added-desc') {
    sortedData = sortByDateAddedDesc(sortedData);
  }

  return (
    <div>
      <h1>Favorites</h1>
      {/* Dropdown to select sorting criteria */}
      <select value={sortBy} onChange={handleSortChange}>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="date-added-desc">Recently Added</option>
      </select>
      {/* Render favorite podcasts */}
      {sortedData.length === 0 ? (
        <p>You don't have any favorited podcasts yet.</p>
      ) : (
        <ul>
          {sortedData.map((podcast) => (
            <li key={podcast.episode.id}>
              <h3>{podcast.title}</h3>
              <img src={podcast.image} alt={podcast.title} />
              {/* Placeholder audio for demonstration */}
              <audio src="https://podcast-api.netlify.app/placeholder-audio.mp3" controls />
              {/* Button to remove from favorites */}
              <button onClick={() => removeFromFavorites(podcast.episode.id)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
