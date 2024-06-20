import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './utils/Themes';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import SeasonEpisode from './components/SeasonEpisode';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Favourites from "./pages/Favourites";
import PodcastDetails from "./pages/PodcastDetails";
import SignUp from "./pages/SignUp";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

function App() {
  // hooks
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          {menuOpen && (
            <Sidebar 
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}
          <Frame>
            <NavBar
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/podcast/:id" element={<PodcastDetails />} />
              <Route path="/season/:id" element={<SeasonEpisode />} />
            </Routes>
          </Frame>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
