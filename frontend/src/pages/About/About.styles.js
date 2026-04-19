import styled from 'styled-components';

export const AboutContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  padding-top: 6rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 4rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-top: 3rem;
  }
`;

export const AboutHero = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.background} 0%, 
    ${props => props.theme.colors.backgroundAlt} 100%
  );

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 3rem 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 2.5rem 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.5rem 0.75rem;
  }
`;

export const AboutTitle = styled.h1`
  font-size: clamp(2.5rem, 4vw, 4rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

export const AboutSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const AboutContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const AboutSection = styled.div`
  padding: 4rem 0;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 3vw, 2.5rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
`;

export const SectionText = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  background-color: ${props => props.theme.colors.backgroundAlt};
  margin: 4rem -2rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    padding: 3rem 1.5rem;
    margin: 3rem -1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    padding: 2.5rem 1rem;
    margin: 2.5rem -1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 2rem 1rem;
    margin: 2rem -1rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.5rem 0.75rem;
    margin: 1.5rem -0.75rem;
    max-width: 320px;
  }
`;

export const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  svg {
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.5rem;
    
    svg {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.25rem;
    
    svg {
      font-size: 2.25rem;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1rem;
    
    svg {
      font-size: 2rem;
    }
  }

  /* Enhanced touch targets for mobile */
  @media (hover: none) and (pointer: coarse) {
    min-height: 120px;
    
    &:active {
      transform: scale(0.98);
    }
  }
`;

export const StatNumber = styled.div`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.textLight};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

export const ValueCard = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ValueIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.primaryLight}
  );
  color: ${props => props.theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  svg {
    font-size: 2rem;
  }
`;

export const ValueTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

export const ValueDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`;

export const TeamSection = styled.div`
  padding: 4rem 0;
  text-align: center;
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

export const TeamMember = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
  }
`;

export const MemberImage = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${props => props.theme.colors.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MemberInfo = styled.div`
  text-align: center;
`;

export const MemberName = styled.h4`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const MemberRole = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
`;