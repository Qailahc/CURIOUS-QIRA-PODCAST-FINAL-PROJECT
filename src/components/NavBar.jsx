// Import necessary dependencies from React, styled-components, and Material-UI
import React from "react";
import styled from "styled-components";
import { Menu, PersonRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// Styled-components for styling the navbar components
const NavBarDiv = styled.div`
  display: flex; // Flex display
  justify-content: space-between; // Space evenly between items
  width: 100%; // Full width
  padding: 16px 40px; // Padding
  align-items: center; // Align items at the center
  box-sizing: border-box; // Use border-box model
  color: ${({ theme }) => theme.text_primary}; // Text color based on theme
  gap: 30px; // Gap between elements
  background: ${({ theme }) => theme.bgLight}; // Background color based on theme
  border-radius: 16px; // Rounded corners
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); // Box shadow effect
  backdrop-filter: blur(5.7px); // Apply blur effect to the background
  -webkit-backdrop-filter: blur(5.7px); // WebKit version of backdrop-filter
  /* Responsive adjustments */
  @media (max-width: 768px) {
    padding: 16px; // Reduced padding on smaller screens
    gap: 10px; // Reduced gap between elements on smaller screens
    flex-wrap: wrap; // Wrap elements on smaller screens
  }
`;

const ButtonDiv = styled.div`
  font-size: 14px; // Font size
  cursor: pointer; // Pointer cursor
  text-decoration: none; // Remove default link underline
  color: ${({ theme }) => theme.primary}; // Text color based on theme
  border: 1px solid ${({ theme }) => theme.primary}; // Border style
  border-radius: 12px; // Rounded corners
  width: 100%; // Full width
  max-width: 70px; // Maximum width
  padding: 8px 10px; // Padding
  text-align: center; // Text alignment
  display: flex; // Flex display
  align-items: center; // Align items at the center
  justify-content: center; // Justify content at the center
  gap: 6px; // Gap between elements

  & > svg {
    margin-right: 4px; // Adjust icon spacing
  }
  &:hover {
    background-color: ${({ theme }) => theme.primary}; // Background color on hover based on theme
    color: ${({ theme }) => theme.text_primary}; // Text color on hover based on theme
  }
  /* Responsive adjustments */
  @media (max-width: 768px) {
    width: 100%; // Take full width on smaller screens
    margin-bottom: 10px; // Add spacing when wrapping
    justify-content: space-between; // Align buttons horizontally
  }
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important; // Icon color based on theme
`;

// NavBar component for rendering the navigation bar
const NavBar = ({ menuOpen, setMenuOpen }) => {
  // Removed unnecessary state and functions

  return (
    // Render the navigation bar with menu button and login button
    <NavBarDiv>
      <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <Menu /> {/* Menu icon */}
      </IcoButton>
      <ButtonDiv>
        <PersonRounded /> {/* Person icon */}
        Login {/* Login text */}
      </ButtonDiv>
    </NavBarDiv>
  );
};

export default NavBar; // Export NavBar component
