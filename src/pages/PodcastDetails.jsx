import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
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

const PodcastDetails = () => {
  const { id } = useParams(); // Extracts the 'id' parameter from the URL
  const [podcast, setPodcast] = useState(null); // State to hold the podcast data
  const [currentSeason, setCurrentSeason] = useState(null); // State to manage the current season
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

  const handleSeasonClick = (season) => {
    setCurrentSeason(season);
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
                style={{ cursor: "pointer" }}
                onClick={() => handleSeasonClick(season)}
              >
                {season.title}
              </SeasonTitle>
              {currentSeason === season && (
                <EpisodeList>
                  {season.episodes.map((episode) => (
                    <EpisodeItem key={episode.episode}>
                      <h4>{episode.title}</h4>
                      <p>{episode.description}</p>
                      <button onClick={() => handlePlayAudio(episode)}>
                        Play Episode
                      </button>
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
