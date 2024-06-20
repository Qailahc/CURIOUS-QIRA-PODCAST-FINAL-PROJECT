// PodcastDetails.jsx

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const SeasonContainer = styled.div`
  margin-bottom: 20px;
`;

const SeasonTitle = styled.h3`
  margin-bottom: 10px;
`;

const EpisodeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const EpisodeItem = styled.li`
  margin-bottom: 10px;
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

const PodcastDetails = ({ selectedPodcast, setSelectedPodcast }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch podcast with id ${id}`);
        }
        const data = await response.json();
        setSelectedPodcast(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching podcast:', error);
      }
    };

    fetchPodcastDetails();
  }, [id, setSelectedPodcast]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteEpisodes(storedFavorites);
  }, []);

  const addToFavorite = (episode, podcastTitle, seasonTitle) => {
    const newFavorite = { episode, podcastTitle, seasonTitle, dateAdded: new Date() };
    const updatedFavorites = [...favoriteEpisodes, newFavorite];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteEpisodes(updatedFavorites);
  };

  const removeFromFavorites = (episodeId) => {
    const updatedFavorites = favoriteEpisodes.filter((fav) => fav.episode.id !== episodeId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteEpisodes(updatedFavorites);
  };

  const isFavorite = (episodeId) => {
    return favoriteEpisodes.some((fav) => fav.episode.id === episodeId);
  };

  if (isLoading || !selectedPodcast) {
    return <p>Loading podcast details...</p>;
  }

  return (
    <Container>
      <Title>{selectedPodcast.title}</Title>
      <Description>{selectedPodcast.description}</Description>
      {selectedPodcast.seasons && (
        <SeasonContainer>
          <h2>Seasons</h2>
          <Select onChange={(e) => setSelectedPodcast(selectedPodcast.seasons[e.target.value])}>
            {selectedPodcast.seasons.map((season, index) => (
              <option key={season.season} value={index}>
                {season.title}
              </option>
            ))}
          </Select>
          {selectedPodcast.seasons.map((season) => (
            <div key={season.season}>
              <SeasonTitle>{season.title}</SeasonTitle>
              <EpisodeList>
                {season.episodes.map((episode) => (
                  <EpisodeItem key={episode.episode}>
                    <h4>{episode.title}</h4>
                    <p>{episode.description}</p>

                    <FavoriteButton
                      onClick={() => addToFavorite(episode, selectedPodcast.title, season.title)}
                      isFavorite={isFavorite(episode.id)}
                    >
                      <HeartIcon className={`fas fa-heart${isFavorite(episode.id) ? '' : '-broken'}`} />
                      {isFavorite(episode.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </FavoriteButton>
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
