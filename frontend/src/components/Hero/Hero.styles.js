import styled from 'styled-components';

export const HeroContainer = styled.section`
  min-height: 100vh;
  min-height: 100svh; /* Small viewport height for better mobile support */
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.fluidSpacing['2xl']} ${props => props.theme.fluidSpacing.md} ${props => props.theme.fluidSpacing.lg};
  position: relative;
  
  /* Optimized background for performance */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      transparent 0%, 
      rgba(139, 69, 19, 0.03) 50%, 
      transparent 100%
    );
    pointer-events: none;
    will-change: auto;
  }
  
  @media (max-width: 768px) {
    min-height: calc(100vh - 56px);
    padding-top: 4rem;
  }
  
  @media (max-width: 480px) {
    min-height: calc(100vh - 52px);
    padding-top: 3rem;
  }
`;

export const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.fluidSpacing.xl};
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.fluidSpacing.lg};
    text-align: center;
  }
  
  @container (max-width: 768px) {
    gap: 2rem;
  }
  
  @container (max-width: 480px) {
    gap: 1.5rem;
  }
`;

export const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    order: 2;
  }
`;

export const HeroSubtitle = styled.p`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  line-height: 1.1;
  margin: 0;
`;

export const HeroDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.7;
  max-width: 500px;
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }
`;

export const PrimaryButton = styled.div`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.primaryLight}
  );
  color: ${props => props.theme.colors.white};
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: ${props => props.theme.shadows.lg};
  border: none;
  min-height: 48px;
  white-space: nowrap;
  text-decoration: none;

  /* Desktop only hover effects */
  @media (min-width: 768px) and (hover: hover) {
    &:hover {
      box-shadow: ${props => props.theme.shadows.xl};
    }

    svg {
      transition: transform ${props => props.theme.transitions.fast};
    }

    &:hover svg {
      transform: translateX(4px);
    }
  }

  /* Mobile touch feedback */
  @media (max-width: 767px) {
    &:active {
      opacity: 0.9;
      transform: scale(0.98);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    max-width: 280px;
    padding: 1.25rem 2rem;
    font-size: ${props => props.theme.fontSizes.xl};
    min-height: 52px;
  }

  /* Enhanced touch targets */
  @media (hover: none) and (pointer: coarse) {
    min-height: 52px;
    padding: 1.25rem 2rem;
  }
`;

export const SecondaryButton = styled.div`
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
  white-space: nowrap;
  text-decoration: none;

  /* Desktop only hover effects */
  @media (min-width: 768px) and (hover: hover) {
    &:hover {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
    }
  }

  /* Mobile touch feedback */
  @media (max-width: 767px) {
    &:active {
      opacity: 0.9;
      transform: scale(0.98);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    max-width: 280px;
    padding: 1.25rem 2rem;
    font-size: ${props => props.theme.fontSizes.xl};
    min-height: 52px;
  }

  /* Enhanced touch targets */
  @media (hover: none) and (pointer: coarse) {
    min-height: 52px;
    padding: 1.25rem 2rem;
  }
`;

export const HeroImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    order: 1;
  }

  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: ${props => props.theme.borderRadius['2xl']};
    box-shadow: ${props => props.theme.shadows.xl};
    object-fit: cover;
  }
`;

export const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

export const FloatingElement = styled.div`
  position: absolute;
  font-size: 2rem;
  opacity: 0.7;
  z-index: 2;
`;