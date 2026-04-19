import { useState, useEffect, useCallback } from 'react';
import { 
  isMobileDevice, 
  isTouchDevice, 
  shouldReduceMotion,
  getOptimizedAnimationProps,
  getOptimizedHoverProps,
  throttle,
  debounce
} from '../utils/mobilePerformanceOptimizer';

/**
 * Hook for mobile optimization
 * Provides mobile-specific states and optimized props
 */
export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(isMobileDevice());
  const [isTouch, setIsTouch] = useState(isTouchDevice());
  const [reduceMotion, setReduceMotion] = useState(shouldReduceMotion());
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Throttled resize handler for better performance
  const handleResize = useCallback(
    throttle(() => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      setIsMobile(newWidth <= 768);
      setScreenSize({ width: newWidth, height: newHeight });
    }, 100),
    []
  );

  // Debounced orientation change handler
  const handleOrientationChange = useCallback(
    debounce(() => {
      // Small delay to ensure dimensions are updated
      setTimeout(() => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 100);
    }, 150),
    []
  );

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handleMotionChange = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Add orientation change listener for mobile
    if (isMobile) {
      window.addEventListener('orientationchange', handleOrientationChange);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [handleResize, handleOrientationChange, isMobile]);

  // Get optimized animation props
  const getAnimationProps = useCallback((index = 0) => {
    return getOptimizedAnimationProps(isMobile || reduceMotion, index);
  }, [isMobile, reduceMotion]);

  // Get optimized hover props
  const getHoverProps = useCallback(() => {
    return getOptimizedHoverProps(isMobile || isTouch || reduceMotion);
  }, [isMobile, isTouch, reduceMotion]);

  // Get mobile-specific styles
  const getMobileStyles = useCallback((desktopStyles, mobileStyles) => {
    return isMobile ? { ...desktopStyles, ...mobileStyles } : desktopStyles;
  }, [isMobile]);

  // Get responsive font size
  const getResponsiveFontSize = useCallback((desktop, mobile) => {
    return isMobile ? mobile : desktop;
  }, [isMobile]);

  // Get responsive spacing
  const getResponsiveSpacing = useCallback((desktop, mobile) => {
    return isMobile ? mobile : desktop;
  }, [isMobile]);

  // Check if device is in landscape mode
  const isLandscape = screenSize.width > screenSize.height;

  // Get device type
  const deviceType = isMobile ? (screenSize.width <= 480 ? 'mobile-small' : 'mobile') : 'desktop';

  return {
    // Device states
    isMobile,
    isTouch,
    reduceMotion,
    isLandscape,
    deviceType,
    screenSize,
    
    // Optimization functions
    getAnimationProps,
    getHoverProps,
    getMobileStyles,
    getResponsiveFontSize,
    getResponsiveSpacing,
    
    // Breakpoint helpers
    isSmallMobile: screenSize.width <= 480,
    isMediumMobile: screenSize.width > 480 && screenSize.width <= 768,
    isTablet: screenSize.width > 768 && screenSize.width <= 1024,
    isDesktop: screenSize.width > 1024
  };
};

export default useMobileOptimization;