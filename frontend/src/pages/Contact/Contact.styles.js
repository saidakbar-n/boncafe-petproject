import styled from 'styled-components';

export const ContactContainer = styled.div`
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

export const ContactHeader = styled.div`
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

export const ContactTitle = styled.h1`
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

export const ContactSubtitle = styled.p`
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

export const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 2rem;
    margin-bottom: 3rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 1.25rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    gap: 0.75rem;
  }
`;

export const InfoCard = styled.div`
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
    padding: 0.875rem;
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

export const InfoIcon = styled.div`
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
`;

export const InfoTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const InfoText = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.5;
`;

export const ContactForm = styled.form`
  background-color: ${props => props.theme.colors.white};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.75rem;
    gap: 1.25rem;
    border-radius: ${props => props.theme.borderRadius.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.5rem;
    gap: 1rem;
    border-radius: ${props => props.theme.borderRadius.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.25rem;
    gap: 0.875rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormLabel = styled.label`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const FormInput = styled.input`
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.background};
  transition: border-color ${props => props.theme.transitions.fast};
  min-height: 48px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1rem;
    font-size: ${props => props.theme.fontSizes.lg};
    min-height: 52px;
  }

  /* Enhanced mobile input styling */
  @media (hover: none) and (pointer: coarse) {
    font-size: 16px; /* Prevents zoom on iOS */
    min-height: 52px;
  }
`;

export const FormTextarea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.background};
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color ${props => props.theme.transitions.fast};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1rem;
    font-size: ${props => props.theme.fontSizes.lg};
    min-height: 140px;
  }

  /* Enhanced mobile textarea styling */
  @media (hover: none) and (pointer: coarse) {
    font-size: 16px; /* Prevents zoom on iOS */
    min-height: 140px;
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.primaryLight}
  );
  color: ${props => props.theme.colors.white};
  padding: 1rem 2rem;
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  box-shadow: ${props => props.theme.shadows.md};

  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const ReviewSection = styled.div`
  margin-top: 4rem;
  padding-top: 4rem;
  border-top: 2px solid ${props => props.theme.colors.backgroundAlt};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 3rem;
    padding-top: 3rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-top: 2rem;
    padding-top: 2rem;
  }
`;

export const ReviewHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 2rem;
  }
`;

export const ReviewTitle = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  svg {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const ReviewSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.md};
    max-width: 400px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.sm};
    max-width: 300px;
  }
`;

export const ReviewForm = styled.form`
  background-color: ${props => props.theme.colors.white};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  border: 2px solid ${props => props.theme.colors.primary}20;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.75rem;
    gap: 1.25rem;
    border-radius: ${props => props.theme.borderRadius.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.5rem;
    gap: 1rem;
    border-radius: ${props => props.theme.borderRadius.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.25rem;
    gap: 0.875rem;
  }
`;

export const FormSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.background};
  transition: border-color ${props => props.theme.transitions.fast};
  min-height: 48px;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1rem;
    font-size: ${props => props.theme.fontSizes.lg};
    min-height: 52px;
  }

  /* Enhanced mobile select styling */
  @media (hover: none) and (pointer: coarse) {
    font-size: 16px; /* Prevents zoom on iOS */
    min-height: 52px;
  }
`;

export const RatingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RatingStars = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 0.75rem;
  }
`;

export const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.fast};
  color: ${props => props.$filled ? '#fbbf24' : props.theme.colors.textMuted};
  
  &:hover {
    transform: scale(1.1);
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  svg {
    font-size: 1.5rem;
    fill: ${props => props.$filled ? 'currentColor' : 'none'};
    stroke: currentColor;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.75rem;
    
    svg {
      font-size: 1.75rem;
    }
  }
`;

export const RatingLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  margin-top: 0.5rem;
`;

export const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    font-size: 1.2rem;
  }
`;

export const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: 1rem;
`;

