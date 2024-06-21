// Import necessary dependencies from React and styled-components
import React from "react";
import styled from "styled-components";
import { HomeRounded, CloseRounded, FavoriteRounded, LightModeRounded, LogoutRounded, DarkModeRounded } from "@mui/icons-material"; // Import icons from Material-UI
import LogoIcon from "../images/musical.png"; // Import custom logo image
import { Link } from "react-router-dom"; // Import Link component for routing

// Styled components for styling the sidebar menu
const MenuContainer = styled.div`
  flex: 0.5;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg}; // Background color based on theme
  color: ${({ theme }) => theme.text_primary}; // Text color based on theme
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${({ menuOpen }) => (menuOpen ? "0" : "-100%")}; // Slide in/out animation based on menuOpen state
    transition: 0.3s ease-in-out;
  }
`;

const Flex = styled.div`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  width: 86%;
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.primary}; // Logo text color based on theme
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: bold;
  font-size: 20px;
  margin: 16px 0px;
`;

const Close = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
`;

const Elements = styled.div`
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary}; // Text color based on theme
  width: 100%;
`;

const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text_secondary + "50"}; // HR color based on theme
  margin: 10px 0px;
`;

const Image = styled.img`
  height: 40px;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text_secondary}; // Link text color based on theme
  &:hover {
    color: ${({ theme }) => theme.text_primary}; // Hover color based on theme
    background-color: ${({ theme }) => theme.text_secondary + "50"}; // Hover background color based on theme
  }
`;

// Sidebar component
const Sidebar = ({ menuOpen, setMenuOpen, darkMode, setDarkMode }) => {
  // Menu items with routes and icons
  const menuItems = [
    {
      link: "/",
      name: "Dashboard",
      icon: <HomeRounded />, // Home icon
    },
    {
      link: "/favorites",
      name: "Favorites",
      icon: <FavoriteRounded />, // Favorites icon
    },
  ];

  // Buttons with functions and icons
  const button = [
    {
      fun: () => setDarkMode(!darkMode), // Function to toggle dark mode
      name: darkMode ? "Light Mode" : "Dark Mode", // Button name based on dark mode state
      icon: darkMode ? <LightModeRounded /> : <DarkModeRounded />, // Light mode or dark mode icon
    },
    {
      fun: () => console.log("Logout"), // Placeholder logout function
      name: "Logout", // Logout button name
      icon: <LogoutRounded />, // Logout icon
    },
  ];

  // Render the sidebar menu with menu items and buttons
  return (
    <MenuContainer menuOpen={menuOpen}>
      <Flex>
        {/* Logo with image and text */}
        <Logo>
          <Image src={LogoIcon} />
          CURIOUS QIRA PODCAST
        </Logo>
        {/* Close button for mobile view */}
        <Close onClick={() => setMenuOpen(false)}>
          <CloseRounded />
        </Close>
      </Flex>
      {/* Render menu items */}
      {menuItems.map((item) => (
        <CustomLink to={item.link} key={item.link}>
          <Elements>
            {item.icon}
            <span>{item.name}</span>
          </Elements>
        </CustomLink>
      ))}
      {/* Horizontal line separator */}
      <HR />
      {/* Render buttons */}
      {button.map((item, index) => (
        <Elements key={index} onClick={item.fun}>
          {item.icon}
          <span>{item.name}</span>
        </Elements>
      ))}
    </MenuContainer>
  );
};

// Export the Sidebar component as default
export default Sidebar;
