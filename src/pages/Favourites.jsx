import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
    const [favoritesData, setFavoritesData] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));
    const [sortBy, setSortBy] = useState('title-asc'); // Initial sorting criteria
  
    const sortByTitleAsc = (data) =>
      data.sort((a, b) => (a.show.toLowerCase() > b.show.toLowerCase() ? 1 : -1));
  
    const sortByTitleDesc = (data) =>
      data.sort((a, b) => (a.show.toLowerCase() < b.show.toLowerCase() ? 1 : -1));
  
    const sortByDateAddedDesc = (data) =>
      data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  
    const handleSortChange = (event) => {
      setSortBy(event.target.value);
    };
  
    useEffect(() => {
      // Update favorites data on state change (e.g., adding/removing favorites)
      const updatedData = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavoritesData(updatedData);
    }, []);
  
    let sortedData = favoritesData;
    if (sortBy === 'title-asc') {
      sortedData = sortByTitleAsc(favoritesData.slice()); // Sort a copy to avoid mutating original state
    } else if (sortBy === 'title-desc') {
      sortedData = sortByTitleDesc(favoritesData.slice());
    } else if (sortBy === 'date-added-desc') {
      sortedData = sortByDateAddedDesc(favoritesData.slice());
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
            {sortedData.map((episode) => (
              <li key={episode.show + episode.episodeTitle}>
                <h3>{episode.show}</h3>
                <p>
                  Episode: {episode.episodeTitle} (Season {episode.season})
                </p>
                <p>Added: {episode.dateAdded}</p>
                <audio src={episode.audio} controls />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default FavoritesPage;