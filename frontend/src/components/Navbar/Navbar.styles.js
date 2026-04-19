import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => 
    props.isScrolled 
      ? props.theme.colors.background
      : 'rgba(255, 248, 240, 0.8)'
  };
  border-bottom: ${props => 
    props.isScrolled 
      ? `1px solid ${props.theme.colors.backgroundAlt}` 
      : 'none'
  };
  
  /* Gentle sticky behavior for all devices */
  backdrop-filter: ${props => props.isScrolled ? 'blur(8px)' : 'blur(4px)'};
  box-shadow: ${props => 
    props.isScrolled 
      ? props.theme.shadows.sm
      : 'none'
  };
  
  /* Smooth transitions */
  transition: all 0.3s ease;
  
  /* Mobile optimization - prevent scroll interference */
  @media (max-width: 767px) {
    /* Simpler background for mobile performance */
    backdrop-filter: none;
    background-color: ${props => 
      props.isScrolled 
        ? props.theme.colors.background
        : 'rgba(255, 248, 240, 0.95)'
    };
    transition: none; /* Remove transitions on mobile */
    
    /* Prevent navbar from interfering with scroll */
    touch-action: pan-y;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    
    /* Ensure navbar doesn't block scrolling */
    pointer-events: auto;
    transform: translateZ(0); /* Force hardware acceleration */
  }
`;

export const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.fluidSpacing.sm} ${props => props.theme.fluidSpacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  gap: 0.5rem;
  
  /* Mobile layout adjustments */
  @media (max-width: 768px) {
    min-height: 56px;
    padding: 0.75rem 1rem;
    gap: 0.75rem;
    
    /* Ensure proper spacing between logo, language switcher, and mobile menu */
    > *:last-child {
      margin-left: auto;
    }
  }
  
  @media (max-width: 480px) {
    min-height: 52px;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }
  
  @media (max-width: 360px) {
    padding: 0.4rem 0.5rem;
    gap: 0.25rem;
  }
`;

export const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: ${props => 
    props.isActive 
      ? props.theme.colors.primary 
      : props.theme.colors.text
  };
  font-weight: ${props => 
    props.isActive 
      ? props.theme.fontWeights.semibold 
      : props.theme.fontWeights.normal
  };
  cursor: pointer;
  position: relative;
  text-decoration: none;

  /* Desktop only hover effects */
  @media (min-width: 768px) and (hover: hover) {
    &:hover {
      color: ${props => props.theme.colors.primary};
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: ${props => props.isActive ? '100%' : '0'};
      height: 2px;
      background-color: ${props => props.theme.colors.primary};
      transition: width ${props => props.theme.transitions.normal};
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

export const LanguageSelector = styled.div`
  position: relative;
`;

export const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  background-color: transparent;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
  }

  svg {
    font-size: 1.2rem;
  }

  span {
    font-size: 1.2rem;
  }
`;

export const LanguageDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
  min-width: 150px;

  button {
    width: 100%;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSizes.sm};

    &:hover {
      background-color: ${props => props.theme.colors.backgroundAlt};
    }

    &.active {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
    }

    span {
      font-size: 1rem;
    }
  }
`;



export const MobileMenuButton = styled.button`
  display: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
  }
`;

/* Hide desktop language switcher on mobile when burger menu is visible */
export const DesktopLanguageSwitcher = styled.div`
  display: block;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

export const MobileMenu = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.backgroundAlt};
  padding: 1rem 2rem;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: ${props => props.theme.shadows.lg};
  max-height: calc(100vh - 70px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1rem;
    max-height: calc(100vh - 56px);
  }

  a {
    color: ${props => props.theme.colors.text};
    font-weight: ${props => props.theme.fontWeights.medium};
    padding: 1rem 0.75rem;
    border-radius: ${props => props.theme.borderRadius.lg};
    transition: all ${props => props.theme.transitions.fast};
    min-height: 48px;
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.fontSizes.lg};

    &.active {
      color: ${props => props.theme.colors.primary};
      font-weight: ${props => props.theme.fontWeights.semibold};
      background-color: ${props => props.theme.colors.backgroundAlt};
    }

    /* Desktop only hover effects */
    @media (min-width: 768px) and (hover: hover) {
      &:hover {
        color: ${props => props.theme.colors.primary};
        background-color: ${props => props.theme.colors.backgroundAlt};
      }
    }

    /* Mobile touch feedback */
    @media (max-width: 767px) {
      &:active {
        opacity: 0.7;
        background-color: ${props => props.theme.colors.backgroundAlt};
      }
    }

    /* Enhanced touch targets for mobile */
    @media (hover: none) and (pointer: coarse) {
      min-height: 52px;
      font-size: ${props => props.theme.fontSizes.xl};
    }
  }
`;