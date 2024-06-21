// PodcastDetails.jsx

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';

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

const PodcastDetails = ({ selectedPodcast, setSelectedPodcast, addToFavorite: addToFavoriteProp }) => {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  
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

    const audioRef = useRef(null); // Ref to manage the audio element


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
      try {
        return favoriteEpisodes.some((fav) => fav.episode.id === episodeId);
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
                      onClick={() => addToFavoriteProp(episode, selectedPodcast.title, season.title)}

                      isFavorite={isFavorite(episode.id)}
                    >
                      <HeartIcon className={`fas fa-heart${isFavorite(episode.id) ? '' : '-broken'}`} />
                      {isFavorite(episode.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </FavoriteButton>
                    <AudioPlayer>
                    <audio ref={audioRef} src={episode.file} controls />
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