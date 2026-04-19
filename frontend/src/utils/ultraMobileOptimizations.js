// Simplified mobile optimizations - no heavy processing

export const initUltraMobileOptimizations = () => {
  // Basic mobile detection without heavy processing
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    document.body.classList.add('mobile-optimized');
  }
};

export const optimizeForConnection = () => {
  // No-op - removed heavy connection monitoring
};

export const optimizeForBattery = () => {
  // No-op - removed battery monitoring
};

export const initAllMobileOptimizations = () => {
  initUltraMobileOptimizations();
};