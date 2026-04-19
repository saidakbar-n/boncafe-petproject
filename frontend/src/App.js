import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Branches from './pages/Branches/Branches';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { NotificationProvider } from './contexts/NotificationContext';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';

const ContentWrapper = styled.div`
  min-height: calc(100vh - 80px);
  padding-top: 80px;
  
  /* Ensure scrolling works on mobile */
  @media (max-width: 767px) {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transform: none !important;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <GlobalStyle />
        <Router>
          <div className="App" style={{ 
            minHeight: '100vh', 
            overflowX: 'hidden',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}>
            <Navbar />
            <ContentWrapper className="scrollable">
              <main role="main" style={{ 
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}>
                <Routes>
                  {/* Public routes - Simple menu showcase */}
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/branches" element={<Branches />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
            </ContentWrapper>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;