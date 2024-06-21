import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MenuItem, FormControl, Select } from '@mui/material';

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

const SearchBar = styled.input`
padding: 8px;
  margin-bottom: 20px;

   display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  padding: 4px 12px;
  width: 300px;
  max-width: 80%;
`;

const Dashboard = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Filter and sort podcasts based on search term and sort option
  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPodcasts = [...filteredPodcasts].sort((a, b) => {
    if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'title-desc') {
      return b.title.localeCompare(a.title);
    } else {
      return 0; // No sorting
    }
  });

  return (
    <DashBoardMain>
      {error && <p>Error fetching podcasts: {error.message}</p>}
      {!isLoading ? (
        <FilterContainer>
          <SearchBar
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FormControl>
            <Select value={sortBy} onChange={handleSortChange}>
              <MenuItem value="">Sort by</MenuItem>
              <MenuItem value="title-asc">Title (A-Z)</MenuItem>
              <MenuItem value="title-desc">Title (Z-A)</MenuItem>
            </Select>
          </FormControl>
          <Podcast>
            {sortedPodcasts.map((podcast) => (
              <Card key={podcast.id}>
                <div>{podcast.title}</div>
                <Image src={podcast.image} alt={podcast.title} />
                <Genre>{podcast.genre}</Genre>
                <Date>{podcast.date}</Date>
                <PlayButton onClick={() => navigateToEpisode(podcast.id)}>Play</PlayButton>
              </Card>
            ))}
          </Podcast>
        </FilterContainer>
      ) : (
        <p>Loading podcasts...</p>
      )}
    </DashBoardMain>
  );
};

export default Dashboard;
