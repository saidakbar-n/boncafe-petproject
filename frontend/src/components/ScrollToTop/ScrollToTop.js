import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import styled from 'styled-components';

const ScrollButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.primaryLight}
  );
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.lg};
  z-index: 999;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transform: ${props => props.$visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.3s ease;
  
  /* Mobile optimizations */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  svg {
    font-size: 1.5rem;
  }

  @media (min-width: 768px) {
    &:hover {
      box-shadow: ${props => props.theme.shadows.xl};
      transform: ${props => props.$visible ? 'translateY(-2px)' : 'translateY(20px)'};
    }
  }

  @media (max-width: 767px) {
    bottom: 1rem;
    right: 1rem;
    width: 48px;
    height: 48px;
    
    /* Disable transitions on mobile for performance */
    transition: opacity 0.2s ease;
    transform: none !important;
    
    &:active {
      opacity: 0.7;
      transform: scale(0.95);
    }
  }
`;

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          setShowButton(scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttled scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Use different scroll behavior for mobile vs desktop
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Instant scroll on mobile for better performance
      window.scrollTo(0, 0);
    } else {
      // Smooth scroll on desktop
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ScrollButton
      onClick={scrollToTop}
      $visible={showButton}
      aria-label="Scroll to top"
    >
      <FiArrowUp />
    </ScrollButton>
  );
};

export default ScrollToTop;