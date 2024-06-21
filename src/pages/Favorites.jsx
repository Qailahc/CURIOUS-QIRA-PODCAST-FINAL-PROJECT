import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 20px;
  overflow-y: scroll; // Enables vertical scrolling
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-weight: bold;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.button_text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary_hover};
  }
`;

const EpisodeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const EpisodeItem = styled.li`
  margin-bottom: 20px;
`;

const EpisodeTitle = styled.h3`
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.button_text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary_hover};
  }
`;

const Description = styled.p`
  margin-bottom: 10px;
`;


const FavoritesPage = () => {
  const localStorageKey = 'favorites'; // Key for local storage
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('title-asc'); // Initial sorting criteria

  // Sort functions
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

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem(localStorageKey, JSON.stringify(favorites));
    }
  }, [favorites]);

  // Function to remove from favorites
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
  };

  // Sorted data based on sort criteria
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
              <audio src="https://podcast-api.netlify.app/placeholder-audio.mp3" controls />
              <button onClick={() => removeFromFavorites(podcast.id)}>
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
