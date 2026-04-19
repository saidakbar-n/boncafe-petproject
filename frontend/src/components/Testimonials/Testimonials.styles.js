import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TestimonialsContainer = styled.section`
  padding: 6rem 2rem;
  background-color: ${props => props.theme.colors.background};
  max-width: 1280px;
  margin: 0 auto;

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

export const TestimonialsHeader = styled.div`
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

export const TestimonialsTitle = styled.h2`
  font-size: clamp(1.75rem, 5vw, 3rem);
  color: ${props => props.theme.colors.text};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: clamp(1.25rem, 7vw, 2rem);
  }
`;

export const TestimonialsCarousel = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  touch-action: pan-y pinch-zoom;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 600px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin: 0 1rem;
    max-width: 500px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin: 0 0.5rem;
    max-width: 400px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    margin: 0 0.25rem;
    max-width: 320px;
  }
`;

export const TestimonialCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 3rem;
  box-shadow: ${props => props.theme.shadows.lg};
  text-align: center;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 2.5rem;
    border-radius: ${props => props.theme.borderRadius.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem;
    margin: 0 0.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.5rem;
  }
`;

export const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const TestimonialRating = styled.div`
  display: flex;
  gap: 0.25rem;
  color: ${props => props.theme.colors.gold};
  font-size: 1.5rem;
`;

export const TestimonialText = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.7;
  font-style: italic;
  max-width: 600px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.md};
    line-height: 1.6;
    max-width: 500px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.5;
    max-width: 400px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: ${props => props.theme.fontSizes.xs};
    line-height: 1.4;
    max-width: 300px;
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  strong {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSizes.lg};

    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes.md};
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.fontSizes.sm};
    }

    @media (max-width: ${props => props.theme.breakpoints.xs}) {
      font-size: ${props => props.theme.fontSizes.xs};
    }
  }

  span {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fontSizes.sm};

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.fontSizes.xs};
    }
  }
`;

export const CarouselControls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  pointer-events: none;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const CarouselButton = styled(motion.button)`
  width: 3rem;
  height: 3rem;
  background-color: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;
  box-shadow: ${props => props.theme.shadows.md};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }

  svg {
    font-size: 1.5rem;
  }
`;

export const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
`;

export const CarouselDot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => 
    props.$isActive 
      ? props.theme.colors.primary 
      : props.theme.colors.backgroundAlt
  };
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;