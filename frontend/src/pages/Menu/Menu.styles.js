import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MenuContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 0 4rem;
  background: rgba(255, 248, 240, 0.8);
  
  @media (max-width: 992px) {
    padding: 6rem 0 3rem;
  }

  @media (max-width: 768px) {
    padding: 5rem 0 2rem;
  }
`;

export const MenuLayout = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  padding: 0 2rem;
  
  @media (max-width: 992px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 1rem;
    gap: 1rem;
  }
`;

export const FilterSidebar = styled.div`
  width: 300px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MenuHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    margin-bottom: 1.5rem;
  }
`;

export const MenuTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: clamp(1.75rem, 6vw, 3rem);
    margin-bottom: 0.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: clamp(1.5rem, 7vw, 2.5rem);
    margin-bottom: 0.5rem;
  }
`;

export const MenuSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.lg};
    max-width: 500px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.md};
    max-width: 400px;
    line-height: 1.5;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: ${props => props.theme.fontSizes.sm};
    max-width: 300px;
    line-height: 1.4;
  }
`;

export const MenuControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.06);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 12px;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    gap: 0.5rem;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 12px;
  padding: 4px;
  
  button {
    padding: 8px 12px;
    border: none;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: ${props => props.theme.colors.textMuted};
    
    &.active {
      background: ${props => props.theme.colors.primary};
      color: white;
      box-shadow: 0 2px 4px rgba(139, 69, 19, 0.3);
    }
    
    &:hover:not(.active) {
      background: rgba(139, 69, 19, 0.1);
      color: ${props => props.theme.colors.primary};
    }
    
    svg {
      font-size: 16px;
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SortDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  select {
    appearance: none;
    background: white;
    border: 2px solid ${props => props.theme.colors.backgroundAlt};
    border-radius: 12px;
    padding: 8px 40px 8px 12px;
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.theme.colors.text};
    cursor: pointer;
    min-width: 180px;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
    }
  }
  
  svg {
    position: absolute;
    right: 12px;
    pointer-events: none;
    color: ${props => props.theme.colors.textMuted};
  }
`;

export const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 4px;
  
  span {
    font-size: 14px;
    color: ${props => props.theme.colors.textLight};
    font-weight: 500;
  }
  
  div {
    font-size: 13px;
    color: ${props => props.theme.colors.textMuted};
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`;

export const FilterSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.06);
  position: sticky;
  top: 2rem;
`;

export const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.colors.backgroundAlt};
`;

export const FilterGroup = styled.div`
  margin-bottom: 1.5rem;
  
  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin: 0 0 0.75rem 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const FilterOption = styled.div`
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, #8B4513, #654321)'
    : 'transparent'
  };
  color: ${props => props.$isActive 
    ? 'white' 
    : props.theme.colors.text
  };
  
  &:hover {
    background: ${props => props.$isActive 
      ? 'linear-gradient(135deg, #8B4513, #654321)'
      : props.theme.colors.backgroundAlt
    };
    transform: translateX(4px);
  }
`;

export const PriceRange = styled.div`
  input[type="range"] {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: ${props => props.theme.colors.backgroundAlt};
    outline: none;
    -webkit-appearance: none;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${props => props.theme.colors.primary};
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(139, 69, 19, 0.3);
    }
    
    &::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${props => props.theme.colors.primary};
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 4px rgba(139, 69, 19, 0.3);
    }
  }
`;

export const MobileFilterToggle = styled.button`
  display: none;
  background: ${props => props.$isActive 
    ? props.theme.colors.primary
    : props.theme.colors.white
  };
  color: ${props => props.$isActive ? props.theme.colors.white : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  min-width: 40px;
  transition: all 0.2s ease;

  svg {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const FilterOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  width: 100%;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.textMuted};
    font-size: 1.1rem;
    z-index: 2;
    transition: color 0.2s ease;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.75rem;
    border: 2px solid ${props => props.theme.colors.backgroundAlt};
    border-radius: ${props => props.theme.borderRadius.lg};
    font-size: ${props => props.theme.fontSizes.md};
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.text};
    min-height: 48px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    font-weight: ${props => props.theme.fontWeights.normal};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 2px 8px rgba(139, 69, 19, 0.2), 0 0 0 3px rgba(139, 69, 19, 0.1);
    }

    &:hover {
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    &::placeholder {
      color: ${props => props.theme.colors.textMuted};
      font-weight: ${props => props.theme.fontWeights.normal};
    }
  }

  /* Focus animation */
  &:focus-within svg {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    input {
      padding: 0.875rem 1rem 0.875rem 2.75rem;
      font-size: ${props => props.theme.fontSizes.md};
      min-height: 50px;
    }

    svg {
      font-size: 1.2rem;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    input {
      padding: 0.75rem 0.875rem 0.75rem 2.5rem;
      font-size: ${props => props.theme.fontSizes.sm};
    }

    svg {
      left: 0.875rem;
      font-size: 1rem;
    }
  }

  /* Enhanced mobile input styling */
  @media (hover: none) and (pointer: coarse) {
    input {
      font-size: 16px; /* Prevents zoom on iOS */
      min-height: 50px;
    }
  }
`;

export const MenuSection = styled.div`
  width: 100%;
  
  /* Container for the menu grid and content */
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* Ensure proper spacing */
  margin-top: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 1.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-top: 1rem;
  }
`;

// Remove CategoryTabs and CategoryTab - they're replaced by the filter system

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  width: 100%;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    /* Performance optimizations for mobile */
    contain: layout style;
    will-change: auto;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
    /* Performance optimizations for mobile */
    contain: layout style;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.textMuted};

  p {
    font-size: ${props => props.theme.fontSizes.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 3rem 1.5rem;

    p {
      font-size: ${props => props.theme.fontSizes.md};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem 1rem;

    p {
      font-size: ${props => props.theme.fontSizes.sm};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.5rem 0.75rem;

    p {
      font-size: ${props => props.theme.fontSizes.xs};
    }
  }
`;