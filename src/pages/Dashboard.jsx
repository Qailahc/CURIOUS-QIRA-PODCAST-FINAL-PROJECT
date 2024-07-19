import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { FormControl, Select, MenuItem } from '@mui/material';

const Container = styled.div`
  padding: 20px;
  overflow-y: scroll;
`;

const Title = styled.h1`
  color: grey;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
  gap: 20px; /* Add spacing between elements */
`;

const SearchBar = styled.input`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  padding: 8px 12px; /* Increased padding */
  width: 300px; /* Fixed width */
  max-width: 80%; /* Maximum width */
  margin: 0 auto; /* Center horizontally */
`;

const PodcastList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const PodcastItem = styled.li`
  cursor: pointer;
  background: ${({ theme }) => theme.bgDark};
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
  }
`;

const PodcastImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const PodcastTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const Dashboard = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [podcastsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get('https://podcast-api.netlify.app/shows');
        setPodcasts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch podcasts');
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1); // Reset to first page on sort
  };

  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPodcasts = [...filteredPodcasts].sort((a, b) => {
    if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'title-desc') {
      return b.title.localeCompare(a.title);
    } else {
      return 0;
    }
  });

  const indexOfLastPodcast = currentPage * podcastsPerPage;
  const indexOfFirstPodcast = indexOfLastPodcast - podcastsPerPage;
  const currentPodcasts = sortedPodcasts.slice(indexOfFirstPodcast, indexOfLastPodcast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <Title>Podcasts</Title>
      <FilterContainer>
        <SearchBar
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormControl>
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="">Sort by (Default)</MenuItem>
            <MenuItem value="title-asc">Title (A-Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z-A)</MenuItem>
          </Select>
        </FormControl>
      </FilterContainer>
      <PodcastList>
        {currentPodcasts.map((podcast) => (
          <PodcastItem key={podcast.id} onClick={() => navigate(`/podcast/${podcast.id}`)}>
            <PodcastImage src={podcast.image} alt={podcast.title} />
            <PodcastTitle>{podcast.title}</PodcastTitle>
          </PodcastItem>
        ))}
      </PodcastList>
      <Pagination
        itemsPerPage={podcastsPerPage}
        totalItems={sortedPodcasts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Container>
  );
};

export default Dashboard;
