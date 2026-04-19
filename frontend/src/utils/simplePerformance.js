// Simple, lightweight performance optimizations

// Basic device detection
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isLowEndDevice = () => {
  return navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
};

// Apply basic optimizations on load
export const initBasicOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Add basic classes for CSS optimizations
  if (isMobile()) {
    document.body.classList.add('mobile-device');
  }
  
  if (isLowEndDevice()) {
    document.body.classList.add('low-end-device');
  }

  // Disable smooth scrolling on mobile for better performance
  if (isMobile()) {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  // Add basic CSS optimizations
  const style = document.createElement('style');
  style.textContent = `
    .mobile-device * {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
    }
    
    .low-end-device * {
      will-change: auto !important;
      animation-duration: 0.1s !important;
      transition-duration: 0.1s !important;
    }
    
    .low-end-device img {
      image-rendering: -webkit-optimize-contrast;
    }
  `;
  document.head.appendChild(style);
};

// Simple image optimization
export const optimizeImage = (src, width = 400) => {
  // For now, just return the original src
  // In the future, this could integrate with a CDN
  return src;
};

// Initialize on load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBasicOptimizations);
  } else {
    initBasicOptimizations();
  }
}