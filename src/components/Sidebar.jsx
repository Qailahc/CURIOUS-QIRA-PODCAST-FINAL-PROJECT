import React from "react";
import styled from "styled-components";
import { HomeRounded, CloseRounded, FavoriteRounded, LightModeRounded, LogoutRounded, DarkModeRounded } from "@mui/icons-material";
import LogoIcon from "../images/Logo.png";
import { Link } from "react-router-dom";

const MenuContainer = styled.div`
  flex: 0.5;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${({ menuOpen }) => (menuOpen ? "0" : "-100%")};
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
  color: ${({ theme }) => theme.primary};
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
  color: ${({ theme }) => theme.text_secondary};
  width: 100%;
`;

const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text_secondary + "50"};
  margin: 10px 0px;
`;

const Image = styled.img`
  height: 40px;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text_secondary};
  &:hover {
    color: ${({ theme }) => theme.text_primary};
    background-color: ${({ theme }) => theme.text_secondary + "50"};
  }
`;

const Sidebar = ({ menuOpen, setMenuOpen, darkMode, setDarkMode }) => {
  const menuItems = [
    {
      link: "/",
      name: "Dashboard",
      icon: <HomeRounded />,
    },
    {
      link: "/favorites",
      name: "Favorites",
      icon: <FavoriteRounded />,
    },
  ];

  const button = [
    {
      fun: () => setDarkMode(!darkMode),
      name: darkMode ? "Light Mode" : "Dark Mode",
      icon: darkMode ? <LightModeRounded /> : <DarkModeRounded />,
    },
    {
      fun: () => console.log("Logout"),
      name: "Logout",
      icon: <LogoutRounded />,
    },
  ];

  return (
    <MenuContainer menuOpen={menuOpen}>
      <Flex>
        <Logo>
          <Image src={LogoIcon} />
          CURIOUS QIRA PODCAST
        </Logo>
        <Close onClick={() => setMenuOpen(false)}>
          <CloseRounded />
        </Close>
      </Flex>
      {menuItems.map((item) => (
        <CustomLink to={item.link} key={item.link}>
          <Elements>
            {item.icon}
            <span>{item.name}</span>
          </Elements>
        </CustomLink>
      ))}
      <HR />
      {button.map((item, index) => (
        <Elements key={index} onClick={item.fun}>
          {item.icon}
          <span>{item.name}</span>
        </Elements>
      ))}
    </MenuContainer>
  );
};

export default Sidebar;

