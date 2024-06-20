import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font: bold;
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

const PodcastDetails = () => {
  const { id } = useParams(); // Extracts the 'id' parameter from the URL
  const [podcast, setPodcast] = useState(null); // State to hold the podcast data
  const [currentSeason, setCurrentSeason] = useState(null); // State to manage the current season
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const audioRef = useRef(null); // Ref to manage the audio element

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/shows/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch podcast with id ${id}`);
        }
        const data = await response.json();
        setPodcast(data);
        // Initialize with the first season by default
        if (data.seasons && data.seasons.length > 0) {
          setCurrentSeason(data.seasons[0]);
        }
      } catch (error) {
        console.error('Error fetching podcast:', error);
      }
    };

    fetchPodcastDetails();
  }, [id]);

  const toggleFavorite = (episode) => {
    const index = favorites.findIndex((item) => item.id === episode.id);
    if (index === -1) {
      setFavorites([...favorites, episode]);
    } else {
      const updatedFavorites = favorites.filter((item) => item.id !== episode.id);
      setFavorites(updatedFavorites);
    }
  };

  const isFavorite = (episodeId) => {
    return favorites.some((item) => item.id === episodeId);
  };

  const handlePlayAudio = (episode) => {
    if (audioRef.current) {
      audioRef.current.src = episode.file;
      audioRef.current.play();
    }
  };

  if (!podcast) {
    return <p>Loading podcast details...</p>;
  }

  return (
    <Container>
      <Title>{podcast.title}</Title>
      <Description>{podcast.description}</Description>
      {podcast.seasons && (
        <SeasonContainer>
          <h2>Seasons</h2>
          {podcast.seasons.map((season) => (
            <div key={season.season}>
              <SeasonTitle
                style={{ cursor: 'pointer' }}
                onClick={() => setCurrentSeason(season)}
              >
                {season.title}
              </SeasonTitle>
              {currentSeason === season && (
                <EpisodeList>
                  {season.episodes.map((episode) => (
                    <EpisodeItem key={episode.episode}>
                      <h4>{episode.title}</h4>
                      <p>{episode.description}</p>
                      <PlayButton onClick={() => handlePlayAudio(episode)}>
                        Play Episode
                      </PlayButton>
                      <FavoriteButton
                        onClick={() => toggleFavorite(episode)}
                        isFavorite={isFavorite(episode.id)}
                      >
                        <HeartIcon
                          className={`fas fa-heart${isFavorite(episode.id) ? '' : '-broken'}`}
                          isFavorite={isFavorite(episode.id)}
                        />
                        {isFavorite(episode.id)
                          ? 'Remove from Favorites'
                          : 'Add to Favorites'}
                      </FavoriteButton>
                      <audio ref={audioRef} src={episode.file} controls />
                    </EpisodeItem>
                  ))}
                </EpisodeList>
              )}
            </div>
          ))}
        </SeasonContainer>
      )}
      <Image src={podcast.image} alt={podcast.title} />
      <AudioPlayer ref={audioRef} controls />
    </Container>
  );
};

export default PodcastDetails;
