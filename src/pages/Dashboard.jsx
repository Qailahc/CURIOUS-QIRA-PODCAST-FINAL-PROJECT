import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// Styled-components for styling
const DashBoardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  &:hover {
    transition: 0.2s ease-in-out;
  }
`;

const Podcast = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;

  // Center items if only one present
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.card_bg};
  padding: 16px;
  border-radius: 8px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Genre = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const Date = styled.div`
  margin-top: 4px;
  color: ${({ theme }) => theme.text_tertiary};
  font-size: 12px;
`;

const FavoritesButton = styled.button`
  margin-top: 8px;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const Dashboard = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const navigateToEpisode = (podcastId) => {
    // Navigate programmatically using useNavigate hook
    // Ensure the path matches your route setup in App.jsx
    navigate(`/podcast/${podcastId}`);
  };

  const addToFavorites = (podcast) => {
    // Retrieve existing favorites from localStorage or initialize as empty array
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Check if the podcast is already in favorites
    if (!favorites.some((fav) => fav.id === podcast.id)) {
      // Add podcast to favorites
      favorites.push(podcast);
      // Store updated favorites back in localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  return (
    <DashBoardMain>
      {error && <p>Error fetching podcasts: {error.message}</p>}
      {isLoading ? (
        <p>Loading podcasts...</p>
      ) : (
        <>
          <FilterContainer>
            <Topic>
              #Spotlight
              <Link to={`/showpodcasts/spotlight`} style={{ textDecoration: 'none' }}>
                <Span>Show All</Span>
              </Link>
            </Topic>
            <Podcast>
              {podcasts.map((podcast) => (
                <Card key={podcast.id}>
                  <div>{podcast.title}</div>
                  <Image src={podcast.image} alt={podcast.title} />
                  <Genre>{podcast.genre}</Genre>
                  <Date>{podcast.date}</Date>
                  <button onClick={() => navigateToEpisode(podcast.id)}>Play</button>
                  <FavoritesButton onClick={() => addToFavorites(podcast)}>Add to Favorites</FavoritesButton>
                </Card>
              ))}
            </Podcast>
          </FilterContainer>
        </>
      )}
    </DashBoardMain>
  );
};

export default Dashboard;

