/**
 * Mobile Performance Optimizer
 * Utilities for optimizing performance on mobile devices
 */

// Debounce function for performance optimization
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll and resize events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Check if device is mobile
export const isMobileDevice = () => {
  return window.innerWidth <= 768 || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Check if device supports touch
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Optimize images for mobile
export const optimizeImageForMobile = (imageUrl, isMobile = false) => {
  if (!imageUrl) return null;
  
  // Add mobile-specific image parameters if needed
  if (isMobile && imageUrl.includes('http')) {
    // Add quality and size parameters for mobile
    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}w=400&q=75&f=webp`;
  }
  
  return imageUrl;
};

// Reduce motion for users who prefer it
export const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get optimized animation props based on device
export const getOptimizedAnimationProps = (isMobile = false, index = 0) => {
  if (shouldReduceMotion()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.1 }
    };
  }
  
  if (isMobile) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.15 }
    };
  }
  
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: Math.min(index * 0.03, 0.2) }
  };
};

// Get optimized hover props
export const getOptimizedHoverProps = (isMobile = false) => {
  if (isMobile || isTouchDevice() || shouldReduceMotion()) {
    return {};
  }
  
  return {
    whileHover: { 
      y: -4,
      transition: { duration: 0.15, ease: "easeOut" }
    }
  };
};

// Optimize scroll behavior for mobile
export const optimizeScrollBehavior = () => {
  if (isMobileDevice()) {
    // Add momentum scrolling for iOS
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Prevent scroll bounce on iOS
    document.addEventListener('touchmove', (e) => {
      if (e.target === document.body) {
        e.preventDefault();
      }
    }, { passive: false });
  }
};

// Lazy load images with intersection observer
export const createLazyImageObserver = (callback) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    return null;
  }
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.1
  });
};

// Optimize touch events
export const optimizeTouchEvents = () => {
  // Add passive event listeners for better scroll performance
  const passiveEvents = ['touchstart', 'touchmove', 'wheel'];
  
  passiveEvents.forEach(event => {
    document.addEventListener(event, () => {}, { passive: true });
  });
};

// Memory management for mobile
export const cleanupUnusedResources = () => {
  // Force garbage collection if available (Chrome DevTools)
  if (window.gc && typeof window.gc === 'function') {
    window.gc();
  }
  
  // Clear unused images from memory
  const images = document.querySelectorAll('img[data-loaded="false"]');
  images.forEach(img => {
    if (!img.getBoundingClientRect().top < window.innerHeight + 200) {
      img.src = '';
    }
  });
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  if (!performance.mark) return fn();
  
  const startMark = `${name}-start`;
  const endMark = `${name}-end`;
  const measureName = `${name}-measure`;
  
  performance.mark(startMark);
  const result = fn();
  performance.mark(endMark);
  performance.measure(measureName, startMark, endMark);
  
  const measure = performance.getEntriesByName(measureName)[0];
  console.log(`${name} took ${measure.duration.toFixed(2)}ms`);
  
  return result;
};

// Initialize mobile optimizations
export const initializeMobileOptimizations = () => {
  if (isMobileDevice()) {
    optimizeScrollBehavior();
    optimizeTouchEvents();
    
    // Cleanup resources periodically
    setInterval(cleanupUnusedResources, 30000); // Every 30 seconds
    
    // Add mobile-specific CSS classes
    document.body.classList.add('mobile-device');
    
    if (isTouchDevice()) {
      document.body.classList.add('touch-device');
    }
  }
};

// Export all utilities
export default {
  debounce,
  throttle,
  isMobileDevice,
  isTouchDevice,
  optimizeImageForMobile,
  shouldReduceMotion,
  getOptimizedAnimationProps,
  getOptimizedHoverProps,
  optimizeScrollBehavior,
  createLazyImageObserver,
  optimizeTouchEvents,
  cleanupUnusedResources,
  measurePerformance,
  initializeMobileOptimizations
};