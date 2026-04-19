import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BranchesContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  padding: 8rem 2rem 4rem;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.xl}) {
    max-width: 1024px;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 6rem 1.5rem 3rem;
    max-width: 768px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 5rem 1rem 2rem;
    max-width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 4rem 1rem 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 3rem 0.75rem 1.5rem;
  }
`;

export const BranchesHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 3rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    margin-bottom: 1.5rem;
  }
`;

export const BranchesTitle = styled.h1`
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

export const BranchesSubtitle = styled.p`
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

export const BranchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  justify-items: center;

  @media (max-width: ${props => props.theme.breakpoints.xl}) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    gap: 0.75rem;
    max-width: 320px;
  }
`;

export const BranchCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all ${props => props.theme.transitions.normal};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  &:hover {
    box-shadow: ${props => props.theme.shadows.xl};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    border-radius: ${props => props.theme.borderRadius.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    border-radius: ${props => props.theme.borderRadius.md};
  }

  /* Enhanced touch interaction */
  @media (hover: none) and (pointer: coarse) {
    &:active {
      transform: scale(0.98);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  }
`;

export const BranchImage = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${props => props.theme.transitions.normal};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const BranchContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BranchName = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const BranchAddress = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.5;

  svg {
    color: ${props => props.theme.colors.primary};
    margin-top: 0.2rem;
    flex-shrink: 0;
  }
`;

export const BranchRating = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .stars {
    display: flex;
    gap: 0.25rem;
    color: ${props => props.theme.colors.gold};
    font-size: 1.2rem;
  }

  .rating-text {
    color: ${props => props.theme.colors.textMuted};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

export const BranchActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 0.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    gap: 0.375rem;
  }
`;

export const ActionButton = styled(motion.a)`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  transition: all ${props => props.theme.transitions.fast};

  ${props => props.$secondary ? `
    background-color: transparent;
    color: ${props.theme.colors.primary};
    border: 2px solid ${props.theme.colors.primary};

    &:hover {
      background-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.white};
    }
  ` : `
    background: linear-gradient(135deg, 
      ${props.theme.colors.primary}, 
      ${props.theme.colors.primaryLight}
    );
    color: ${props.theme.colors.white};
    border: none;

    &:hover {
      opacity: 0.9;
    }
  `}

  svg {
    font-size: 1rem;
  }
`;