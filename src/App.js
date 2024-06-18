import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './utils/Themes';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import { BrowserRouter } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden
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
        <Sidebar 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        darkMode={setDarkMode}
        setDarkMode={darkMode}
        />
        <Frame> 
          <NavBar menuOpen={menuOpen}
           setMenuOpen={setMenuOpen}
           darkMode={setDarkMode}
           setDarkMode={darkMode} 
           />
          CURIOUS QIRA PODCAST
          </Frame>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
