import styled from 'styled-components';

export const AboutContainer = styled.section`
  padding: 6rem 2rem;
  background-color: ${props => props.theme.colors.backgroundAlt};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 3rem 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.5rem 0.75rem;
  }
`;

export const AboutContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.xl}) {
    max-width: 1024px;
    gap: 3rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    max-width: 768px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 2rem;
    max-width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    gap: 1rem;
  }
`;

export const AboutText = styled.div`
  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: ${props => props.theme.colors.primary};
    margin: 2rem 0 1.5rem 0;
  }
`;

export const AboutTitle = styled.h2`
  font-size: clamp(1.75rem, 5vw, 3rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  text-align: left;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    text-align: center;
    margin-bottom: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
    margin-bottom: 0.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: clamp(1.25rem, 7vw, 2rem);
  }
`;

export const AboutDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.7;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.md};
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.sm};
    margin-bottom: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: ${props => props.theme.fontSizes.xs};
    line-height: 1.5;
  }
`;

export const AboutValues = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 0.75rem;
  }
`;

export const ValueCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: transform ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.25rem;
    gap: 0.875rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1rem;
    gap: 0.75rem;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  /* Enhanced touch targets for mobile */
  @media (hover: none) and (pointer: coarse) {
    min-height: 60px;
    
    &:active {
      transform: scale(0.98);
    }
  }
`;

export const ValueIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.primaryLight}
  );
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 2.5rem;
    height: 2.5rem;
    
    svg {
      font-size: 1.25rem;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 2.25rem;
    height: 2.25rem;
    
    svg {
      font-size: 1.125rem;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 2rem;
    height: 2rem;
    
    svg {
      font-size: 1rem;
    }
  }
`;

export const ValueTitle = styled.h4`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.text};
  margin: 0 0 0.5rem 0;
`;

export const ValueDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  margin: 0;
`;

export const AboutImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: ${props => props.theme.borderRadius['2xl']};
    box-shadow: ${props => props.theme.shadows.xl};
    object-fit: cover;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    order: -1;
  }
`;