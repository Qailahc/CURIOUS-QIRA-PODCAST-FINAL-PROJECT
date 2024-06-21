import React, { useState } from "react";
import styled from "styled-components";
import { Menu, PersonRounded } from "@mui/icons-material";
import { IconButton,  Select, MenuItem, FormControl } from "@mui/material";
import SearchBar from "../components/SearchBar"; 

const NavBarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 40px;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7px);
  /* Responsive adjustments */
  @media (max-width: 768px) {
    padding: 16px;
    gap: 10px;
    flex-wrap: wrap; /* Wrap elements on smaller screens */
  }
`;

const ButtonDiv = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 70px;
  padding: 8px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

& > svg {
    margin-right: 4px; /* Adjust icon spacing */
  }
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
    /* Responsive adjustments */
  @media (max-width: 768px) {
    width: 100%; /* Take full width on smaller screens */
    margin-bottom: 10px; /* Add spacing when wrapping */
    justify-content: space-between; /* Align buttons horizontally */
  }
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;
`;

const SortSelect = styled(FormControl)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 40px;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7px);
  /* Responsive adjustments */
  @media (max-width: 768px) {
    width: 100%; /* Take full width on smaller screens */
    margin-bottom: 10px; /* Add spacing when wrapping */
    order: 1; /* Move SortSelect above SearchBar on small screens */
  }
`;



const NavBar = ({ menuOpen, setMenuOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(""); // Track sorting state

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  

  return (
    <NavBarDiv>
      <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <Menu />
      </IcoButton>
      <SearchBar onSearch={handleSearch} value={searchTerm} /> {/* Include SearchBar component with value prop */}
      <SortSelect>
        <Select value={sortBy} onChange={handleSortChange}>
          <MenuItem value="title-asc">A-Z</MenuItem>
          <MenuItem value="title-desc">Z-A</MenuItem>
          <MenuItem value="date-added-desc">Most Recent</MenuItem>
          <MenuItem value="date-added-asc">Oldest</MenuItem>
        </Select>
      </SortSelect>
      <ButtonDiv>
        <PersonRounded />
        Login
      </ButtonDiv>
    </NavBarDiv>
  );
};

export default NavBar;
