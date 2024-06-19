import React, { useState } from "react";
import styled from "styled-components";
import { Menu, PersonRounded, SortByAlpha } from "@mui/icons-material";
import { IconButton } from "@mui/material";
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
  @media (max-width: 768px) {
    padding: 16px;
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
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;
`;

const NavBar = ({ menuOpen, setMenuOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(""); // Track sorting state

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSortAZ = () => {
    setSortBy("AZ");
    // Perform sorting logic here (if needed)
  };

  const handleSortZA = () => {
    setSortBy("ZA");
    // Perform sorting logic here (if needed)
  };

  return (
    <NavBarDiv>
      <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <Menu />
      </IcoButton>
      <SearchBar onSearch={handleSearch} /> {/* Include SearchBar component */}
      <ButtonDiv onClick={handleSortAZ}>
        <SortByAlpha />
        A-Z
      </ButtonDiv>
      <ButtonDiv onClick={handleSortZA}>
        <SortByAlpha />
        Z-A
      </ButtonDiv>
      <ButtonDiv>
        <PersonRounded />
        Login
      </ButtonDiv>
    </NavBarDiv>
  );
};

export default NavBar;
