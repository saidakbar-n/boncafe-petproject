import { useState, useEffect } from 'react';

export const useSimpleResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width < 768);
    };

    handleResize(); // Set initial values

    // Throttled resize handler
    let resizeTimer;
    const throttledResize = () => {
      if (!resizeTimer) {
        resizeTimer = setTimeout(() => {
          handleResize();
          resizeTimer = null;
        }, 100);
      }
    };

    window.addEventListener('resize', throttledResize, { passive: true });
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  return {
    isMobile,
    screenWidth,
    isTablet: screenWidth >= 768 && screenWidth < 1024,
    isDesktop: screenWidth >= 1024
  };
};