import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components for styling
const Container = styled.div`
  padding: 20px;
  overflow-y: scroll;
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

const FavoriteList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FavoriteItem = styled.li`
  margin-bottom: 20px;
  color: white;
`;

const FavoriteButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: ${({ theme, isFavorite }) => (isFavorite ? theme.danger : theme.primary)};
  color: ${({ theme }) => theme.button_text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme, isFavorite }) =>
      isFavorite ? theme.danger_hover : theme.primary_hover};
  }
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
`;

const Description = styled.p`
  color: grey;
`;

// FavoritesPage component
const FavoritesPage = () => {
  const localStorageKey = 'favorites'; // Key for local storage
  const [favorites, setFavorites] = useState([]); // State to store favorite podcasts
  const [sortBy, setSortBy] = useState('title-asc'); // State to manage sorting criteria

  // Sort functions for different criteria
  const sortByTitleAsc = (data) =>
    [...data].sort((a, b) => {
      if (!a.episode.title || !b.episode.title) return 0; // Defensive check for undefined titles
      return a.episode.title.toLowerCase() > b.episode.title.toLowerCase() ? 1 : -1;
    });

  const sortByTitleDesc = (data) =>
    [...data].sort((a, b) => {
      if (!a.episode.title || !b.episode.title) return 0; // Defensive check for undefined titles
      return a.episode.title.toLowerCase() < b.episode.title.toLowerCase() ? 1 : -1;
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
  const removeFromFavorites = (id, dateAdded) => {
    const updatedFavorites = favorites.filter((item) => item.episode.id !== id || item.dateAdded !== dateAdded);
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
    <Container>
      <Title>Favorites</Title>
      {/* Dropdown to select sorting criteria */}
      <Select value={sortBy} onChange={handleSortChange}>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="date-added-desc">Recently Added</option>
      </Select>
      {/* Render favorite podcasts */}
      {sortedData.length === 0 ? (
        <Description>You don't have any favorited podcasts yet.</Description>
      ) : (
        <FavoriteList>
          {sortedData.map((podcast) => (
            <FavoriteItem key={podcast.episode.id}>
              <Title>{podcast.episode.title}</Title>
              <Description>{podcast.seasonTitle} - {podcast.podcastTitle}</Description>
              <Description>Date Added: {podcast.dateAdded}</Description> {/* Display date added */}
              <audio src={podcast.episode.file} controls />
              <FavoriteButton onClick={() => removeFromFavorites(podcast.episode.id, podcast.dateAdded)}>
                Remove from Favorites
              </FavoriteButton>
            </FavoriteItem>
          ))}
        </FavoriteList>
      )}
    </Container>
  );
};

export default FavoritesPage;
