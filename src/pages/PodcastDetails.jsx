import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

// Styled components for styling
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

const Description = styled.p`
  margin-bottom: 20px;
  color: grey;
`;

const SeasonContainer = styled.div`
  margin-bottom: 20px;
  overflow-y: scroll; // Enables vertical scrolling
`;

const SeasonTitle = styled.h3`
  margin-bottom: 10px;
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

const EpisodeList = styled.ul`
  list-style-type: none;
  padding: 0;
  color: grey;
`;

const EpisodeItem = styled.li`
  margin-bottom: 10px;
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

const HeartIcon = styled.i`
  color: ${({ theme, isFavorite }) => (isFavorite ? theme.danger : theme.primary)};
  margin-right: 8px;
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
`;

const AudioPlayer = styled.div`
  margin-right: 10px;
  padding: 13px;
`;

// PodcastDetails component
const PodcastDetails = ({ selectedPodcast, setSelectedPodcast }) => {
  const { id } = useParams(); // Get podcast id from route parameters
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]); // State to store favorite episodes

  useEffect(() => {
    // Fetch podcast details from API
    const fetchPodcastDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch podcast with id ${id}`);
        }
        const data = await response.json();
        setSelectedPodcast(data); // Update selected podcast state
        setIsLoading(false); // Update loading state
      } catch (error) {
        console.error('Error fetching podcast:', error);
      }
    };

    fetchPodcastDetails(); // Call the fetch function
  }, [id, setSelectedPodcast]); // Depend on id and setSelectedPodcast

  useEffect(() => {
    // Load favorite episodes from local storage on component mount
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteEpisodes(storedFavorites);
  }, []);

  // Function to add episode to favorites
  const handleAddToFavorite = (episode, podcastTitle, seasonTitle) => {
    const newFavorite = { episode, podcastTitle, seasonTitle, dateAdded: new Date() };
    const updatedFavorites = [...favoriteEpisodes, newFavorite];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteEpisodes(updatedFavorites); // Update favorite episodes state
  };

  // Function to remove episode from favorites
  const handleRemoveFromFavorites = (episodeId) => {
    const updatedFavorites = favoriteEpisodes.filter((fav) => fav.episode.id !== episodeId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteEpisodes(updatedFavorites); // Update favorite episodes state
  };

  // Function to check if an episode is in favorites
  const isFavorite = (episodeId) => {
    try {
      return favoriteEpisodes.some((fav) => fav.episode.id === episodeId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  };

  // Render loading message while data is being fetched
  if (isLoading || !selectedPodcast) {
    return <p>Loading podcast details...</p>;
  }

  return (
    <Container>
      {/* Render podcast title and description */}
      <Title>{selectedPodcast.title}</Title>
      <Description>{selectedPodcast.description}</Description>
      {/* Render seasons and episodes */}
      {selectedPodcast.seasons && (
        <SeasonContainer>
          <h2>Seasons</h2>
          {/* Dropdown to select seasons */}
          <Select onChange={(e) => setSelectedPodcast(selectedPodcast.seasons[e.target.value])}>
            {selectedPodcast.seasons.map((season, index) => (
              <option key={season.season} value={index}>
                {season.title}
              </option>
            ))}
          </Select>
          {/* Render episodes for each season */}
          {selectedPodcast.seasons.map((season) => (
            <div key={season.season}>
              <SeasonTitle>{season.title}</SeasonTitle>
              <EpisodeList>
                {season.episodes.map((episode) => (
                  <EpisodeItem key={episode.episode}>
                    <h4>{episode.title}</h4>
                    <p>{episode.description}</p>
                    {/* Button to add/remove from favorites */}
                    <FavoriteButton
                      onClick={() => {
                        isFavorite(episode.id)
                          ? handleRemoveFromFavorites(episode.id)
                          : handleAddToFavorite(episode, selectedPodcast.title, season.title);
                      }}
                      isFavorite={isFavorite(episode.id)}
                    >
                      <HeartIcon className={`fas fa-heart${isFavorite(episode.id) ? '' : '-broken'}`} />
                      {isFavorite(episode.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </FavoriteButton>
                    {/* Audio player for the episode */}
                    <AudioPlayer>
                      <audio src={episode.file} controls />
                    </AudioPlayer>
                  </EpisodeItem>
                ))}
              </EpisodeList>
            </div>
          ))}
        </SeasonContainer>
      )}
    </Container>
  );
};

export default PodcastDetails;
