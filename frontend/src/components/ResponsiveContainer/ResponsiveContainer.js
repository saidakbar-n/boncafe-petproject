import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useResponsive } from '../../hooks/useResponsive';

const Container = styled(motion.div)`
  width: 100%;
  max-width: ${props => props.$maxWidth || '1280px'};
  margin: 0 auto;
  padding: ${props => props.$padding || '0 2rem'};
  
  @media (max-width: ${props => props.theme.breakpoints.xl}) {
    max-width: 1024px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 768px;
    padding: ${props => props.$padding || '0 1.5rem'};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
    padding: ${props => props.$padding || '0 1rem'};
    
    /* Enhanced mobile optimizations */
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    
    /* Safe area support for devices with notches */
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.$padding || '0 1rem'};
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
    
    /* Optimize for small screens */
    min-height: 0; /* Allow flex shrinking */
  }
  
  /* Performance optimizations for low-end devices */
  &.low-end-device {
    will-change: auto;
    transform: none !important;
    
    * {
      animation: none !important;
      transition: none !important;
    }
  }
  
  &.slow-connection {
    * {
      animation-duration: 0.1s !important;
      transition-duration: 0.1s !important;
    }
  }
  
  /* Mobile-specific optimizations */
  &.mobile-optimized {
    /* Enable hardware acceleration for smooth scrolling */
    transform: translateZ(0);
    backface-visibility: hidden;
    
    /* Optimize touch interactions */
    touch-action: manipulation;
    -webkit-overflow-scrolling: touch;
    
    /* Prevent text selection on touch */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
    /* Allow text selection in input fields */
    input, textarea, [contenteditable] {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }
  }
  
  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    &, * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    border: 1px solid;
  }
`;

const ResponsiveContainer = ({ 
  children, 
  maxWidth, 
  padding, 
  className,
  enablePerformanceOptimizations = true,
  ...motionProps 
}) => {
  const containerRef = useRef(null);
  const { isMobile, deviceInfo } = useResponsive();

  useEffect(() => {
    if (!enablePerformanceOptimizations || !containerRef.current) return;

    const container = containerRef.current;
    
    // Add performance classes based on device capabilities
    if (deviceInfo.isLowEndDevice) {
      container.classList.add('low-end-device');
    }
    
    if (deviceInfo.isSlowConnection) {
      container.classList.add('slow-connection');
    }
    
    if (deviceInfo.prefersReducedMotion) {
      container.classList.add('reduced-motion');
    }
    
    // Optimize for mobile devices
    if (isMobile) {
      container.classList.add('mobile-optimized');
    }
    
    return () => {
      // Cleanup performance optimizations
      if (container) {
        container.classList.remove(
          'low-end-device', 
          'slow-connection', 
          'reduced-motion', 
          'mobile-optimized'
        );
      }
    };
  }, [isMobile, deviceInfo, enablePerformanceOptimizations]);

  // Optimize motion props for mobile
  const optimizedMotionProps = React.useMemo(() => {
    if (isMobile && deviceInfo.isLowEndDevice) {
      // Disable animations on low-end devices
      return {
        initial: false,
        animate: false,
        transition: { duration: 0 }
      };
    }
    
    if (deviceInfo.prefersReducedMotion) {
      // Minimal motion for users who prefer reduced motion
      return {
        ...motionProps,
        transition: { duration: 0.1, ease: 'linear' }
      };
    }
    
    return motionProps;
  }, [isMobile, deviceInfo, motionProps]);

  return (
    <Container
      ref={containerRef}
      $maxWidth={maxWidth}
      $padding={padding}
      className={className}
      {...optimizedMotionProps}
    >
      {children}
    </Container>
  );
};

export default ResponsiveContainer;