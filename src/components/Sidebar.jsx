import React from "react";
import styled from "styled-components";
import { HomeRounded, CloseRounded, SearchRounded, FavoriteRounded, LightModeRounded, LogoutRounded } from "@mui/icons-material"
import LogoIcon from "../images/1.png";
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
    left: ${({ setMenuOpen }) => (setMenuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;`;

   const Flex = styled.div`
    justify-content: space-between;
    display: flex;
    align-items: center;
    padding: 0px 16px;
    width: 86%;
  `;

 const Logo = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: bold;
  font-size: 20px;
  margin: 16px 0px;`;

const Close = styled.div`
display: none;
   @media (max-width: 1100px) {
   display: block;
}
   `;

const Elements = styled.div`
padding: 4px 16px;
display: flex;
flex-direction: row;
box-sizing: border-box;
justify-content: flex-start;
align-items: center;
gap: 12px;
cursor: pointer;
color:  ${({ theme }) => theme.text_secondary};
width: 100%;
text-decoration: none !important;
&:hover{
    background-color: ${({ theme }) => theme.text_secondary + 50};
}`;

const NavText = styled.div`
padding: 12px 0px;
text-decoration: none !important;
`;

const HR = styled.div`
width: 100%;
height: 1px;
background-color: ${({ theme }) => theme.text_secondary + 50};
margin: 10px 0px;
`;

const Image = styled.img`
  height: 40px;
`;

const menuItems = [
    {
        link: "/",
        name: "Dashboard",
        icon: <HomeRounded />
    },

    {
        link: "/search",
        name: "Search",
        icon: <SearchRounded />
    },

    {
        link: "/favorites",
        name: "Favorites",
        icon: <FavoriteRounded />
    }

]

const button = [
    {
        fun: () => console.log("Light Mode"),
        name: "Light Mode",
        icon: <LightModeRounded />

    },

    {
        fun: () => console.log("Logout"),
        name: "Logout",
        icon: <LogoutRounded />

    }
]


const Sidebar = () => {
    return (
        <MenuContainer>
            <Flex>
            <Logo>
            <Image src={LogoIcon} />
                Curious Qira Podcast</Logo>
            <Close>
                <CloseRounded />
            </Close>
            </Flex>
            {menuItems.map((item) => 
                <Link to={item.link}>
            <Elements>
                {item.icon}
                <HomeRounded />
                <NavText>{item.name}</NavText>
            </Elements>
            </Link>
            )}
            <HR />
            {button.map((item) => 
                <Link to={item.link}>
            <Elements>
                {item.icon}
                <HomeRounded />
                <NavText>{item.name}</NavText>
            </Elements>
            </Link>
            )}
        </MenuContainer>
    )
}

export default Sidebar