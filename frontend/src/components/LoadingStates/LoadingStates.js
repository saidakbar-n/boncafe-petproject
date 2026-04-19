import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: ${props => props.minHeight || '200px'};
  gap: 1rem;
`;

// Unused SkeletonBase component
/*
const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.backgroundAlt} 0px,
    rgba(245, 230, 211, 0.8) 40px,
    ${props => props.theme.colors.backgroundAlt} 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${props => props.theme.borderRadius.md};
`;
*/

const Spinner = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border: 4px solid ${props => props.theme.colors.backgroundAlt};
  border-top: 4px solid ${props => props.color || props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const PulseLoader = styled.div`
  display: flex;
  gap: 0.5rem;
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.color || props.theme.colors.primary};
    animation: ${pulse} 1.4s infinite ease-in-out;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  max-width: 300px;
  height: 4px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 2px;
  overflow: hidden;
  
  .progress {
    height: 100%;
    background: ${props => props.color || props.theme.colors.primary};
    width: ${props => props.progress || 0}%;
    transition: width 0.3s ease;
    border-radius: 2px;
  }
`;

const LoadingText = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.fontSizes.sm};
  margin: 0;
  text-align: center;
`;

// Menu-specific skeleton components
const MenuSkeleton = styled.div`
  .menu-item {
    padding: 1.5rem;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 12px;
    margin-bottom: 1rem;
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      .item-name {
        height: 20px;
        width: 180px;
        background: linear-gradient(
          90deg,
          ${props => props.theme.colors.backgroundAlt} 0px,
          rgba(245, 230, 211, 0.8) 40px,
          ${props => props.theme.colors.backgroundAlt} 80px
        );
        background-size: 200px 100%;
        animation: ${shimmer} 1.5s infinite;
        border-radius: 4px;
      }
      
      .item-price {
        height: 18px;
        width: 60px;
        background: linear-gradient(
          90deg,
          ${props => props.theme.colors.backgroundAlt} 0px,
          rgba(245, 230, 211, 0.8) 40px,
          ${props => props.theme.colors.backgroundAlt} 80px
        );
        background-size: 200px 100%;
        animation: ${shimmer} 1.5s infinite;
        border-radius: 4px;
      }
    }
    
    .item-description {
      height: 16px;
      width: 100%;
      margin-bottom: 0.5rem;
      background: linear-gradient(
        90deg,
        ${props => props.theme.colors.backgroundAlt} 0px,
        rgba(245, 230, 211, 0.8) 40px,
        ${props => props.theme.colors.backgroundAlt} 80px
      );
      background-size: 200px 100%;
      animation: ${shimmer} 1.5s infinite;
      border-radius: 4px;
    }
    
    .item-description-short {
      height: 16px;
      width: 80%;
      background: linear-gradient(
        90deg,
        ${props => props.theme.colors.backgroundAlt} 0px,
        rgba(245, 230, 211, 0.8) 40px,
        ${props => props.theme.colors.backgroundAlt} 80px
      );
      background-size: 200px 100%;
      animation: ${shimmer} 1.5s infinite;
      border-radius: 4px;
    }
  }
`;

// Loading state components
export const LoadingSpinner = ({ size, color, text }) => (
  <LoadingContainer>
    <Spinner size={size} color={color} />
    {text && <LoadingText>{text}</LoadingText>}
  </LoadingContainer>
);

export const LoadingPulse = ({ color, text }) => (
  <LoadingContainer>
    <PulseLoader color={color}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </PulseLoader>
    {text && <LoadingText>{text}</LoadingText>}
  </LoadingContainer>
);

export const LoadingProgress = ({ progress, color, text }) => (
  <LoadingContainer>
    <ProgressBar progress={progress} color={color}>
      <div className="progress"></div>
    </ProgressBar>
    {text && <LoadingText>{text}</LoadingText>}
  </LoadingContainer>
);



export const MenuLoadingSkeleton = () => (
  <MenuSkeleton>
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div key={i} className="menu-item">
        <div className="item-header">
          <div className="item-name"></div>
          <div className="item-price"></div>
        </div>
        <div className="item-description"></div>
        <div className="item-description-short"></div>
      </div>
    ))}
  </MenuSkeleton>
);

export const InlineLoadingSpinner = ({ size = '16px' }) => (
  <Spinner size={size} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
);

const LoadingComponents = {
  LoadingSpinner,
  LoadingPulse,
  LoadingProgress,
  MenuLoadingSkeleton,
  InlineLoadingSpinner
};

export default LoadingComponents;