import { useState, useEffect, useCallback } from 'react';

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  const [deviceInfo, setDeviceInfo] = useState({});

  const detectDeviceCapabilities = useCallback(() => {
    const info = {
      isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      isLowEndDevice: navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2,
      isSlowConnection: navigator.connection?.effectiveType === '2g' || navigator.connection?.effectiveType === 'slow-2g',
      pixelRatio: window.devicePixelRatio || 1,
      isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
      isAndroid: /Android/.test(navigator.userAgent),
      supportsWebP: false,
      supportsAvif: false,
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches
    };

    // Test WebP support
    const webpCanvas = document.createElement('canvas');
    webpCanvas.width = 1;
    webpCanvas.height = 1;
    info.supportsWebP = webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

    // Test AVIF support
    const avifCanvas = document.createElement('canvas');
    avifCanvas.width = 1;
    avifCanvas.height = 1;
    try {
      info.supportsAvif = avifCanvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    } catch (e) {
      info.supportsAvif = false;
    }

    setDeviceInfo(info);
    setIsTouchDevice(info.isTouchDevice);
  }, []);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setScreenSize({ width, height });
    setIsMobile(width < 768);
    setIsTablet(width >= 768 && width < 1024);
    setIsDesktop(width >= 1024);
    setOrientation(width > height ? 'landscape' : 'portrait');

    // Update CSS custom properties for responsive design
    document.documentElement.style.setProperty('--vw', `${width * 0.01}px`);
    document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
  }, []);

  useEffect(() => {
    detectDeviceCapabilities();
    handleResize();

    // Debounced resize handler for better performance
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });
    window.addEventListener('orientationchange', () => {
      // Delay to ensure accurate measurements after orientation change
      setTimeout(handleResize, 200);
    }, { passive: true });

    // Listen for connection changes
    if (navigator.connection) {
      const updateConnection = () => {
        setDeviceInfo(prev => ({
          ...prev,
          isSlowConnection: navigator.connection?.effectiveType === '2g' || navigator.connection?.effectiveType === 'slow-2g'
        }));
      };
      
      navigator.connection.addEventListener('change', updateConnection);
      
      return () => {
        window.removeEventListener('resize', debouncedResize);
        navigator.connection.removeEventListener('change', updateConnection);
        clearTimeout(resizeTimer);
      };
    }

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [detectDeviceCapabilities, handleResize]);

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    orientation,
    deviceInfo,
    breakpoints: {
      xs: screenSize.width < 480,
      sm: screenSize.width >= 480 && screenSize.width < 768,
      md: screenSize.width >= 768 && screenSize.width < 1024,
      lg: screenSize.width >= 1024 && screenSize.width < 1280,
      xl: screenSize.width >= 1280,
    },
    // Utility functions
    isBreakpoint: (breakpoint) => {
      const breakpoints = {
        xs: screenSize.width < 480,
        sm: screenSize.width >= 480 && screenSize.width < 768,
        md: screenSize.width >= 768 && screenSize.width < 1024,
        lg: screenSize.width >= 1024 && screenSize.width < 1280,
        xl: screenSize.width >= 1280,
      };
      return breakpoints[breakpoint];
    },
    isMinBreakpoint: (breakpoint) => {
      const breakpoints = {
        xs: screenSize.width >= 0,
        sm: screenSize.width >= 480,
        md: screenSize.width >= 768,
        lg: screenSize.width >= 1024,
        xl: screenSize.width >= 1280,
      };
      return breakpoints[breakpoint];
    }
  };
};

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      
      setScrollY(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection]);

  return { scrollDirection, scrollY };
};