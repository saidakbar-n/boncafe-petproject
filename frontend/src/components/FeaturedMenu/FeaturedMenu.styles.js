import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FeaturedContainer = styled.section`
  padding: 6rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.background};

  @media (max-width: ${props => props.theme.breakpoints.xl}) {
    max-width: 1024px;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 4rem 1.5rem;
    max-width: 768px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 3rem 1rem;
    max-width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.5rem 0.75rem;
  }
`;

export const FeaturedHeader = styled.div`
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

export const FeaturedTitle = styled.h2`
  font-size: clamp(1.75rem, 5vw, 3rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
    margin-bottom: 0.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: clamp(1.25rem, 7vw, 2rem);
    margin-bottom: 0.5rem;
  }
`;

export const FeaturedSubtitle = styled.p`
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

export const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  justify-items: center;

  @media (max-width: ${props => props.theme.breakpoints.xl}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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

export const ViewAllButton = styled(motion.div)`
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
  gap: 0.5rem;
  box-shadow: ${props => props.theme.shadows.lg};
  text-decoration: none;

  &:hover {
    box-shadow: ${props => props.theme.shadows.xl};
  }

  svg {
    transition: transform ${props => props.theme.transitions.fast};
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;