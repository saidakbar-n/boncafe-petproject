// Mobile-specific optimizations and utilities

export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isAndroid = () => {
  return /Android/.test(navigator.userAgent);
};

// Prevent iOS bounce scrolling
export const preventIOSBounce = () => {
  if (isIOS()) {
    document.addEventListener('touchmove', (e) => {
      if (e.target.closest('.scrollable')) return;
      e.preventDefault();
    }, { passive: false });
  }
};

// Optimize touch events for better performance
export const optimizeTouchEvents = () => {
  // Use passive listeners for better scroll performance
  const passiveEvents = ['touchstart', 'touchmove', 'wheel'];
  
  passiveEvents.forEach(eventType => {
    document.addEventListener(eventType, () => {}, { passive: true });
  });
};

// Handle safe area insets for devices with notches
export const handleSafeAreaInsets = () => {
  const root = document.documentElement;
  
  // Set CSS custom properties for safe area insets
  if (CSS.supports('padding: env(safe-area-inset-top)')) {
    root.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
    root.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
    root.style.setProperty('--safe-area-left', 'env(safe-area-inset-left)');
    root.style.setProperty('--safe-area-right', 'env(safe-area-inset-right)');
  } else {
    root.style.setProperty('--safe-area-top', '0px');
    root.style.setProperty('--safe-area-bottom', '0px');
    root.style.setProperty('--safe-area-left', '0px');
    root.style.setProperty('--safe-area-right', '0px');
  }
};

// Optimize for different screen densities
export const optimizeForScreenDensity = () => {
  const pixelRatio = window.devicePixelRatio || 1;
  
  if (pixelRatio > 2) {
    // High DPI screen - can use higher quality images
    document.body.classList.add('high-dpi');
  } else if (pixelRatio < 1.5) {
    // Lower DPI screen - optimize for performance
    document.body.classList.add('low-dpi');
  }
};

// Handle orientation changes with debouncing
export const handleOrientationChange = () => {
  let resizeTimer;
  
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Update viewport height for mobile browsers
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Update container query support
      const vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty('--vw', `${vw}px`);
    }, 150);
  };

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('orientationchange', () => {
    setTimeout(handleResize, 200);
  }, { passive: true });
  
  // Initial call
  handleResize();
};

// Optimize scrolling performance
export const optimizeScrolling = () => {
  let ticking = false;
  
  const updateScrollPosition = () => {
    // Update scroll-dependent elements
    const scrollY = window.pageYOffset;
    document.documentElement.style.setProperty('--scroll-y', scrollY);
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });
};

// Enhanced gesture support for mobile
export const addGestureSupport = () => {
  let startX, startY, currentX, currentY;
  let isSwipeGesture = false;
  
  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwipeGesture = false;
  };
  
  const handleTouchMove = (e) => {
    if (!startX || !startY) return;
    
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
    
    const diffX = Math.abs(currentX - startX);
    const diffY = Math.abs(currentY - startY);
    
    // Detect horizontal swipe
    if (diffX > diffY && diffX > 50) {
      isSwipeGesture = true;
      const direction = currentX > startX ? 'right' : 'left';
      
      // Dispatch custom swipe event
      const swipeEvent = new CustomEvent('swipe', {
        detail: { direction, startX, startY, currentX, currentY }
      });
      e.target.dispatchEvent(swipeEvent);
    }
  };
  
  const handleTouchEnd = () => {
    startX = startY = currentX = currentY = null;
    isSwipeGesture = false;
  };
  
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
};

// Enhanced pull-to-refresh functionality
export const addPullToRefresh = (callback) => {
  let startY = 0;
  let currentY = 0;
  let isPulling = false;
  let pullDistance = 0;
  const threshold = 80;
  
  const pullIndicator = document.createElement('div');
  pullIndicator.className = 'pull-to-refresh-indicator';
  pullIndicator.innerHTML = '↓ Pull to refresh';
  pullIndicator.style.cssText = `
    position: fixed;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    background: #8B4513;
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 14px;
    z-index: 1000;
    transition: top 0.3s ease;
  `;
  document.body.appendChild(pullIndicator);
  
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      startY = e.touches[0].clientY;
      isPulling = true;
    }
  };
  
  const handleTouchMove = (e) => {
    if (!isPulling || window.scrollY > 0) return;
    
    currentY = e.touches[0].clientY;
    pullDistance = currentY - startY;
    
    if (pullDistance > 0) {
      e.preventDefault();
      const progress = Math.min(pullDistance / threshold, 1);
      pullIndicator.style.top = `${-60 + (progress * 80)}px`;
      
      if (pullDistance > threshold) {
        pullIndicator.innerHTML = '↑ Release to refresh';
        pullIndicator.style.background = '#28a745';
      } else {
        pullIndicator.innerHTML = '↓ Pull to refresh';
        pullIndicator.style.background = '#8B4513';
      }
    }
  };
  
  const handleTouchEnd = () => {
    if (isPulling && pullDistance > threshold) {
      pullIndicator.innerHTML = '⟳ Refreshing...';
      pullIndicator.style.background = '#007bff';
      callback();
      
      setTimeout(() => {
        pullIndicator.style.top = '-60px';
      }, 1000);
    } else {
      pullIndicator.style.top = '-60px';
    }
    
    isPulling = false;
    pullDistance = 0;
    startY = currentY = 0;
  };
  
  document.addEventListener('touchstart', handleTouchStart, { passive: false });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
};

// Enhanced haptic feedback
export const addHapticFeedback = () => {
  const triggerHaptic = (type = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30],
        success: [10, 50, 10],
        error: [50, 100, 50]
      };
      navigator.vibrate(patterns[type] || patterns.light);
    }
  };
  
  // Add haptic feedback to buttons
  document.addEventListener('click', (e) => {
    if (e.target.matches('button, .button, [role="button"]')) {
      triggerHaptic('light');
    }
  });
  
  // Add haptic feedback to form submissions
  document.addEventListener('submit', () => {
    triggerHaptic('medium');
  });
  
  // Expose globally for custom usage
  window.triggerHaptic = triggerHaptic;
};

// Initialize all mobile optimizations
export const initializeMobileOptimizations = () => {
  if (isMobileDevice()) {
    preventIOSBounce();
    optimizeTouchEvents();
    handleSafeAreaInsets();
    optimizeForScreenDensity();
    handleOrientationChange();
    optimizeScrolling();
    addGestureSupport();
    addHapticFeedback();
    
    // Add mobile class to body
    document.body.classList.add('mobile-device');
    
    if (isIOS()) {
      document.body.classList.add('ios-device');
    }
    
    if (isAndroid()) {
      document.body.classList.add('android-device');
    }
    
    // Add CSS for mobile optimizations
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
      .mobile-device {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }
      
      .mobile-device button,
      .mobile-device .button,
      .mobile-device [role="button"] {
        min-height: 44px;
        min-width: 44px;
        touch-action: manipulation;
      }
      
      .mobile-device input,
      .mobile-device textarea,
      .mobile-device select {
        font-size: 16px; /* Prevent zoom on iOS */
      }
      
      .ios-device {
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
      }
      
      @media (max-width: 768px) {
        .mobile-optimized * {
          box-shadow: none !important;
          text-shadow: none !important;
        }
        
        .mobile-optimized img {
          image-rendering: -webkit-optimize-contrast;
        }
      }
    `;
    document.head.appendChild(mobileStyles);
  }
};