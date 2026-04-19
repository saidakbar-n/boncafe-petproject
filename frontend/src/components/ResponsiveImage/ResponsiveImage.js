import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${props => props.theme.transitions.normal};
  
  &.loading {
    opacity: 0;
  }
  
  &.loaded {
    opacity: 1;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.backgroundAlt} 0%,
    rgba(245, 230, 211, 0.8) 50%,
    ${props => props.theme.colors.backgroundAlt} 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.fontSizes.sm};

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const ResponsiveImage = ({ 
  src, 
  alt, 
  fallback = '/images/placeholder-menu.svg',
  className,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <ImageContainer className={className}>
      {!isLoaded && <Placeholder>Loading...</Placeholder>}
      <Image
        src={hasError ? fallback : src}
        alt={alt}
        className={isLoaded ? 'loaded' : 'loading'}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        {...props}
      />
    </ImageContainer>
  );
};

export default ResponsiveImage;