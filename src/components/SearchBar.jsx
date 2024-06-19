import React, { useState } from "react";
import styled from "styled-components";
import { SearchRounded } from "@mui/icons-material";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  padding: 4px 12px;
  width: 300px;
  max-width: 80%;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 8px;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Propagate search term to parent component
  };

  return (
    <SearchContainer>
      <SearchRounded />
      <SearchInput
        type="text"
        placeholder="Search podcasts..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </SearchContainer>
  );
};

export default SearchBar;
