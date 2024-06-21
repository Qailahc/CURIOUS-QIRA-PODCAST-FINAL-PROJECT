// Import necessary dependencies from React and styled-components
import React, { useState } from "react";
import styled from "styled-components";
import { SearchRounded } from "@mui/icons-material"; // Import search icon from Material UI icons

// Styled-components for styling
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.primary}; // Border color based on theme
  border-radius: 12px;
  padding: 4px 12px;
  width: 300px; // Fixed width
  max-width: 80%; // Maximum width to ensure responsiveness
`;

const SearchInput = styled.input`
  border: none;
  outline: none; // Remove default input focus outline
  width: 100%; // Take up remaining width
  padding: 8px; // Padding for input field
  background: transparent; // Transparent background
  color: ${({ theme }) => theme.text_primary}; // Text color based on theme
`;

// SearchBar component to handle search functionality
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  // Function to handle search input change
  const handleSearch = (event) => {
    const value = event.target.value; // Get the value from input field
    setSearchTerm(value); // Update search term state with the new value
    onSearch(value); // Propagate search term to parent component using callback function
  };

  return (
    // Search container with search icon and input field
    <SearchContainer>
      <SearchRounded /> {/* Search icon */}
      <SearchInput
        type="text"
        placeholder="Search podcasts..." // Placeholder text for input field
        value={searchTerm} // Bind input value to search term state
        onChange={handleSearch} // Call handleSearch function on input change
      />
    </SearchContainer>
  );
};

export default SearchBar; // Export SearchBar component
