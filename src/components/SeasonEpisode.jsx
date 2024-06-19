// components/SeasonEpisode.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

// Styled-components for styling
const SeasonsContainer = styled.div`
  padding: 20px;
`;

const SeasonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const SeasonCard = styled.div`
  background-color: ${({ theme }) => theme.card_bg};
  padding: 16px;
  border-radius: 8px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const EpisodeList = styled.div`
  margin-top: 20px;
`;

const EpisodeCard = styled.div`
  background-color: ${({ theme }) => theme.card_bg};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

const SeasonEpisode = () => {
  const { id } = useParams();

  const [seasons, setSeasons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch seasons');
        }
        const data = await response.json();
        setSeasons(data.seasons);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeasons();
  }, [id]);

  if (isLoading) {
    return <p>Loading seasons...</p>;
  }

  if (error) {
    return <p>Error fetching seasons: {error.message}</p>;
  }

  return (
    <SeasonsContainer>
      <SeasonList>
        {seasons.map((season) => (
          <SeasonCard key={season.season}>
            <Image src={season.image} alt={`Season ${season.season}`} />
            <Title>{season.title}</Title>
            <Description>{season.description}</Description>
            <EpisodeList>
              {season.episodes.map((episode) => (
                <EpisodeCard key={episode.episode}>
                  <Title>{episode.title}</Title>
                  <Description>{episode.description}</Description>
                  {/* Add more details or play button for episodes if needed */}
                </EpisodeCard>
              ))}
            </EpisodeList>
          </SeasonCard>
        ))}
      </SeasonList>
    </SeasonsContainer>
  );
};

export default SeasonEpisode;
