import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.white};
  padding: 4rem 2rem 2rem;
  position: relative;
  
  /* Mobile-specific overscroll protection */
  @media (max-width: 767px) {
    /* Extend footer background for mobile overscroll */
    &::before {
      content: '';
      position: absolute;
      top: -100px;
      left: -100px;
      right: -100px;
      bottom: -100px;
      background-color: ${props => props.theme.colors.text};
      z-index: -1;
    }
    
    /* Ensure footer extends beyond viewport */
    margin-bottom: -50px;
    padding-bottom: calc(2rem + 50px);
  }
  


  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 3rem 1.5rem 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 2.5rem 1rem 1.25rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem 1rem 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.5rem 0.75rem 0.75rem;
  }
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 1.5rem;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 0.875rem;
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 0.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    gap: 0.625rem;
  }
`;

export const FooterLogo = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const FooterDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const FooterTitle = styled.h4`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* Desktop only hover effects */
  @media (min-width: 768px) and (hover: hover) {
    transition: color ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }

  /* Mobile touch feedback */
  @media (max-width: 767px) {
    &:active {
      color: ${props => props.theme.colors.primary};
      opacity: 0.8;
    }
  }

  svg {
    font-size: 1rem;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SocialLink = styled.a`
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;

  /* Desktop only hover effects */
  @media (min-width: 768px) and (hover: hover) {
    transition: all ${props => props.theme.transitions.fast};
    
    &:hover {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
    }
  }

  /* Mobile touch feedback */
  @media (max-width: 767px) {
    /* Larger touch targets for mobile */
    width: 3rem;
    height: 3rem;
    
    &:active {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
      opacity: 0.9;
    }
  }

  svg {
    font-size: 1.2rem;
  }
`;



export const FooterBottom = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

export const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: ${props => props.theme.fontSizes.sm};
`;