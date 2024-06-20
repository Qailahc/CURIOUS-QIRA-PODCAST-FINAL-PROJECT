import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

const AudioPlayer = styled.audio`
  margin-top: 20px;
`;

const PlayButton = styled.button`
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

const PodcastDetails = ({ selectedPodcast, setSelectedPodcast, addToFavourite }) => {
  const { id } = useParams();
  const audioRef = useRef(null);

  useEffect(() => {
    if (!selectedPodcast) {
      const fetchPodcastDetails = async () => {
        try {
          const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch podcast with id ${id}`);
          }
          const data = await response.json();
          setSelectedPodcast(data);
        } catch (error) {
          console.error('Error fetching podcast:', error);
        }
      };

      fetchPodcastDetails();
    }
  }, [id, selectedPodcast, setSelectedPodcast]);

  const toggleFavorite = (episode) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorited = storedFavorites.some(fav => fav.id === episode.id);
    const updatedFavorites = isFavorited
      ? storedFavorites.filter(fav => fav.id !== episode.id)
      : [...storedFavorites, episode];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (episodeId) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return storedFavorites.some(fav => fav.id === episodeId);
  };

  const handlePlayAudio = (episode) => {
    if (audioRef.current) {
      audioRef.current.src = episode.file;
      audioRef.current.play();
    }
  };

  if (!selectedPodcast) {
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
                    <PlayButton onClick={() => handlePlayAudio(episode)}>Play Episode</PlayButton>
                    <FavoriteButton
                      onClick={() => addToFavourite(episode, selectedPodcast.title, season.title)}
                      isFavorite={isFavorite(episode.id)}
                    >
                      <HeartIcon
                        className={`fas fa-heart${isFavorite(episode.id) ? '' : '-broken'}`}
                        isFavorite={isFavorite(episode.id)}
                      />
                      {isFavorite(episode.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </FavoriteButton>
                    <audio ref={audioRef} src={episode.file} controls />
                  </EpisodeItem>
                ))}
              </EpisodeList>
            </div>
          ))}
        </SeasonContainer>
      )}
      <Image src={selectedPodcast.image} alt={selectedPodcast.title} />
      <AudioPlayer ref={audioRef} controls />
    </Container>
  );
};

export default PodcastDetails;
