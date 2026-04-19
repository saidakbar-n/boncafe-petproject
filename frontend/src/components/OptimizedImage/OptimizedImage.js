import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.borderRadius || '0'};
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  transition: transform ${props => props.theme.transitions.normal};
  
  &.loading {
    opacity: 0;
  }
  
  &.loaded {
    opacity: 1;
  }
  
  &.error {
    opacity: 0.5;
  }
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
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
  
  /* Reduce animation on low-end devices */
  @media (max-width: 768px) {
    .low-end-device & {
      animation: none;
      background: ${props => props.theme.colors.backgroundAlt};
    }
  }
`;

const ErrorPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.fontSizes.sm};
  
  &::before {
    content: '🖼️';
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  
  .progress {
    height: 100%;
    background: ${props => props.theme.colors.primary};
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`;

const OptimizedImage = ({ 
  src, 
  alt, 
  fallback = '/images/placeholder-menu.svg',
  className,
  lazy = true,
  quality = 80,
  showProgress = false,
  objectFit = 'cover',
  borderRadius,
  sizes,
  srcSet,
  priority = false,
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [loadProgress, setLoadProgress] = useState(0);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Enhanced intersection observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Increased for better mobile experience
        threshold: 0.1
      }
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView, priority]);

  // Optimize image URL based on device capabilities
  const getOptimizedSrc = useCallback(() => {
    if (!isInView) return '';
    
    // eslint-disable-next-line no-unused-vars
    const devicePixelRatio = window.devicePixelRatio || 1;
    const isSlowConnection = navigator.connection?.effectiveType === '2g' || 
                            navigator.connection?.effectiveType === 'slow-2g';
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
    
    // Use lower quality for slow connections or low-end devices
    let adjustedQuality = quality;
    if (isSlowConnection) adjustedQuality = Math.max(quality - 30, 30);
    if (isLowEndDevice) adjustedQuality = Math.max(adjustedQuality - 20, 40);
    
    // For now, return the original src
    // In production, you'd modify this to work with your CDN
    return hasError ? fallback : src;
  }, [isInView, hasError, fallback, src, quality]);

  // Generate responsive srcSet if not provided
  const getResponsiveSrcSet = useCallback(() => {
    if (srcSet) return srcSet;
    if (!src || hasError) return '';
    
    // Generate basic responsive srcSet
    // In production, you'd use your CDN's resize capabilities
    return `${src} 1x, ${src} 2x`;
  }, [srcSet, src, hasError]);

  // Generate sizes attribute if not provided
  const getResponsiveSizes = useCallback(() => {
    if (sizes) return sizes;
    
    // Default responsive sizes
    return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }, [sizes]);

  const handleLoad = useCallback((e) => {
    setIsLoaded(true);
    setLoadProgress(100);
    onLoad?.(e);
  }, [onLoad]);

  const handleError = useCallback((e) => {
    setHasError(true);
    setIsLoaded(true);
    onError?.(e);
  }, [onError]);

  const handleProgress = useCallback((e) => {
    if (e.lengthComputable && showProgress) {
      const progress = (e.loaded / e.total) * 100;
      setLoadProgress(progress);
    }
  }, [showProgress]);

  // Preload image for better performance
  useEffect(() => {
    if (!isInView || isLoaded || hasError) return;

    const img = new Image();
    img.onload = handleLoad;
    img.onerror = handleError;
    img.onprogress = handleProgress;
    
    // Set responsive attributes
    img.src = getOptimizedSrc();
    if (getResponsiveSrcSet()) {
      img.srcset = getResponsiveSrcSet();
    }
    if (getResponsiveSizes()) {
      img.sizes = getResponsiveSizes();
    }

    return () => {
      img.onload = null;
      img.onerror = null;
      img.onprogress = null;
    };
  }, [isInView, isLoaded, hasError, getOptimizedSrc, getResponsiveSrcSet, getResponsiveSizes, handleLoad, handleError, handleProgress]);

  return (
    <ImageContainer ref={imgRef} className={className} borderRadius={borderRadius}>
      {!isLoaded && !hasError && (
        <Placeholder>
          {isInView ? 'Loading...' : 'Image'}
        </Placeholder>
      )}
      
      {showProgress && !isLoaded && !hasError && isInView && (
        <ProgressBar progress={loadProgress}>
          <div className="progress"></div>
        </ProgressBar>
      )}
      
      {hasError && (
        <ErrorPlaceholder>
          Image unavailable
        </ErrorPlaceholder>
      )}
      
      {isInView && (
        <Image
          src={getOptimizedSrc()}
          srcSet={getResponsiveSrcSet()}
          sizes={getResponsiveSizes()}
          alt={alt}
          objectFit={objectFit}
          className={`${isLoaded ? 'loaded' : 'loading'} ${hasError ? 'error' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ scale: 1.02, opacity: 0 }}
          animate={{ 
            scale: isLoaded ? 1 : 1.02, 
            opacity: isLoaded ? 1 : 0 
          }}
          transition={{ 
            duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.4,
            ease: 'easeOut' 
          }}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          {...props}
        />
      )}
    </ImageContainer>
  );
};

export default OptimizedImage;