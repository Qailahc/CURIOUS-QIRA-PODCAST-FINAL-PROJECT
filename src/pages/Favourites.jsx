import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [sortBy, setSortBy] = useState('title-asc'); // Initial sorting criteria

  const sortByTitleAsc = (data) =>
    data.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));

  const sortByTitleDesc = (data) =>
    data.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1));

  const sortByDateAddedDesc = (data) =>
    data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    // Update favorites data on state change (e.g., adding/removing favorites)
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  let sortedData = favorites;
  if (sortBy === 'title-asc') {
    sortedData = sortByTitleAsc(favorites.slice()); // Sort a copy to avoid mutating original state
  } else if (sortBy === 'title-desc') {
    sortedData = sortByTitleDesc(favorites.slice());
  } else if (sortBy === 'date-added-desc') {
    sortedData = sortByDateAddedDesc(favorites.slice());
  }

  return (
    <div>
      <h1>Favorites</h1>
      <select value={sortBy} onChange={handleSortChange}>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="date-added-desc">Recently Added</option>
      </select>
      {sortedData.length === 0 ? (
        <p>You don't have any favorited podcasts yet.</p>
      ) : (
        <ul>
          {sortedData.map((podcast) => (
            <li key={podcast.id}>
              <h3>{podcast.title}</h3>
              <img src={podcast.image} alt={podcast.title} />
              <audio src={podcast.audio} controls />
              <button onClick={() => setFavorites(favorites.filter((item) => item.id !== podcast.id))}>
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
