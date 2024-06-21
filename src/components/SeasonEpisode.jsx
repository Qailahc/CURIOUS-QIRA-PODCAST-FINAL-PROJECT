// Import necessary dependencies from React and styled-components
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters

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

// SeasonEpisode component to display episodes for a specific season
const SeasonEpisode = () => {
  const { id } = useParams(); // Get the genre ID from the URL parameters

  const [seasons, setSeasons] = useState([]); // State to store seasons data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch seasons data from the API based on the genre ID
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch seasons');
        }
        const data = await response.json();
        setSeasons(data.seasons); // Update seasons state with fetched data
      } catch (error) {
        setError(error); // Set error state if fetching fails
      } finally {
        setIsLoading(false); // Set loading state to false after fetching completes
      }
    };

    fetchSeasons(); // Invoke the fetchSeasons function
  }, [id]); // Dependency array ensures useEffect runs when ID changes

  // Render loading message while fetching data
  if (isLoading) {
    return <p>Loading seasons...</p>;
  }

  // Render error message if fetching fails
  if (error) {
    return <p>Error fetching seasons: {error.message}</p>;
  }

  // Render the list of seasons and their episodes
  return (
    <SeasonsContainer>
      <SeasonList>
        {/* Map through seasons and render each season card */}
        {seasons.map((season) => (
          <SeasonCard key={season.season}>
            <Image src={season.image} alt={`Season ${season.season}`} />
            <Title>{season.title}</Title>
            <Description>{season.description}</Description>
            <EpisodeList>
              {/* Map through episodes of each season and render episode cards */}
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
