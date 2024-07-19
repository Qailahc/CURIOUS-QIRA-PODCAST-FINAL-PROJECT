import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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

const Description = styled.p`
  margin-bottom: 20px;
  color: grey;
`;

const SeasonContainer = styled.div`
  margin-bottom: 20px;
  overflow-y: scroll;
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

const PodcastDetails = ({ selectedPodcast, setSelectedPodcast }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch podcast with id ${id}`);
        }
        const data = await response.json();
        setSelectedPodcast(data);
        setSelectedSeason(data.seasons[0]); // Set the first season as the default selected season
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

  const handleAddToFavoriteEpisode = (episode, podcastTitle, seasonTitle) => {
    const newFavorite = { episode, podcastTitle, seasonTitle, dateAdded: new Date() };
    const updatedFavorites = [...favoriteEpisodes, newFavorite];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteEpisodes(updatedFavorites);
  };

  const handleRemoveFromFavorites = (episodeId, dateAdded) => {
    const updatedFavorites = favoriteEpisodes.filter(
      (fav) => !(fav.episode.id === episodeId && fav.dateAdded === dateAdded)
    );
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteEpisodes(updatedFavorites);
  };

  const isFavorite = (episodeId, dateAdded) => {
    try {
      return favoriteEpisodes.some((fav) => fav.episode.id === episodeId && fav.dateAdded === dateAdded);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
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
          <Select onChange={(e) => setSelectedSeason(selectedPodcast.seasons[e.target.value])}>
            {selectedPodcast.seasons.map((season, index) => (
              <option key={season.season} value={index}>
                {season.title}
              </option>
            ))}
          </Select>
          {selectedSeason && (
            <div key={selectedSeason.season}>
              <SeasonTitle>{selectedSeason.title}</SeasonTitle>
              <EpisodeList>
                {selectedSeason.episodes.map((episode) => (
                  <EpisodeItem key={episode.episode}>
                    <h4>{episode.title}</h4>
                    <p>{episode.description}</p>
                    <FavoriteButton
                      onClick={() => {
                        isFavorite(episode.id, episode.dateAdded)
                          ? handleRemoveFromFavorites(episode.id, episode.dateAdded)
                          : handleAddToFavoriteEpisode(episode, selectedPodcast.title, selectedSeason.title);
                      }}
                      isFavorite={isFavorite(episode.id, episode.dateAdded)}
                    >
                      <HeartIcon className={`fas fa-heart${isFavorite(episode.id, episode.dateAdded) ? '' : '-broken'}`} />
                      {isFavorite(episode.id, episode.dateAdded) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </FavoriteButton>
                    <AudioPlayer>
                      <audio src={episode.file} controls />
                    </AudioPlayer>
                  </EpisodeItem>
                ))}
              </EpisodeList>
            </div>
          )}
        </SeasonContainer>
      )}
    </Container>
  );
};

export default PodcastDetails;
