import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CardContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.06);
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 340px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    transform: translateY(-2px);
  }

  /* Optimized touch interaction */
  @media (hover: none) and (pointer: coarse) {
    &:active {
      transform: scale(0.98);
      transition: transform 0.1s ease;
    }
    
    /* Remove hover effects on touch devices */
    &:hover {
      transform: none;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }
  }
  
  @media (max-width: 576px) {
    border-radius: 12px;
    min-height: 320px;
  }

  @media (max-width: 400px) {
    border-radius: 10px;
    min-height: 300px;
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background: #f8fafc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  /* Subtle gradient overlay for better text readability */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(transparent, rgba(0,0,0,0.2));
    pointer-events: none;
  }

  @media (max-width: 576px) {
    height: 160px;
  }

  @media (max-width: 400px) {
    height: 140px;
  }
`;

export const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  gap: 8px;

  @media (max-width: 576px) {
    padding: 16px;
  }

  @media (max-width: 400px) {
    padding: 14px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
  line-height: 1.4;
  font-weight: 600;
  font-family: "'Inter', sans-serif";
  
  @media (max-width: 576px) {
    font-size: 1.1rem;
  }

  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

export const CardDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 576px) {
    font-size: 0.8rem;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 400px) {
    font-size: 0.75rem;
    -webkit-line-clamp: 1;
  }
`;

export const NutritionInfo = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const NutritionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.xs};

  span:first-child {
    color: ${props => props.theme.colors.textMuted};
    text-transform: uppercase;
    font-weight: ${props => props.theme.fontWeights.medium};
  }

  span:last-child {
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeights.semibold};
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding-top: 8px;
  min-height: 20px; /* Maintain consistent spacing even when empty */
`;

export const CardPrice = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`;

export const AddButton = styled(motion.button)`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.primaryLight}
  );
  color: ${props => props.theme.colors.white};
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
  min-height: 44px;
  flex: 1;

  svg {
    font-size: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    padding: 1rem;
    font-size: ${props => props.theme.fontSizes.md};
    min-height: 48px;
  }

  /* Enhanced touch targets */
  @media (hover: none) and (pointer: coarse) {
    min-height: 48px;
    padding: 1rem;
  }
`;

export const InfoButton = styled(motion.button)`
  background-color: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.primary};
  padding: 0.75rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;

  svg {
    font-size: 1rem;
  }

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

export const FavoriteButton = styled(motion.button)`
  background-color: ${props => props.isFavorited ? props.theme.colors.error : props.theme.colors.backgroundAlt};
  color: ${props => props.isFavorited ? props.theme.colors.white : props.theme.colors.error};
  padding: 0.75rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  transition: all ${props => props.theme.transitions.fast};

  svg {
    font-size: 1rem;
    fill: ${props => props.isFavorited ? 'currentColor' : 'none'};
    stroke: currentColor;
    transition: fill ${props => props.theme.transitions.fast};
  }

  &:hover {
    background-color: ${props => props.theme.colors.error};
    color: ${props => props.theme.colors.white};
    
    svg {
      fill: currentColor;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.5rem;
    padding-top: 1rem;
  }
`;

export const ModalContent = styled(motion.div)`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  max-width: 600px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-height: 90vh;
    border-radius: ${props => props.theme.borderRadius.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-height: 95vh;
    border-radius: ${props => props.theme.borderRadius.md};
    margin: 0;
  }

  /* Custom scrollbar for modal */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 3px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.backgroundAlt};

  h3 {
    margin: 0;
    color: ${props => props.theme.colors.text};
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: ${props => props.theme.borderRadius.lg};
    margin-bottom: 1.5rem;
  }

  h4 {
    color: ${props => props.theme.colors.primary};
    margin: 1rem 0 0.5rem 0;
    font-size: ${props => props.theme.fontSizes.lg};
  }

  p {
    color: ${props => props.theme.colors.textLight};
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 0.25rem;
  min-height: 44px;

  @media (hover: none) and (pointer: coarse) {
    min-height: 48px;
  }
`;

export const QuantityButton = styled(motion.button)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  @media (hover: none) and (pointer: coarse) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

export const QuantityDisplay = styled.span`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  min-width: 2rem;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.md};
`;