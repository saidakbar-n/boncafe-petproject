// Mobile scroll fix utility to prevent scroll interruption

let isScrolling = false;
let scrollTimeout;

// Prevent scroll interruption on mobile
export const initScrollFix = () => {
  if (typeof window === 'undefined') return;

  // Detect mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (!isMobile) return;

  // Add scroll momentum preservation
  const preserveScrollMomentum = () => {
    document.body.style.webkitOverflowScrolling = 'touch';
    document.documentElement.style.webkitOverflowScrolling = 'touch';
  };

  // Handle touch events to prevent scroll blocking
  const handleTouchStart = (e) => {
    isScrolling = true;
    clearTimeout(scrollTimeout);
  };

  const handleTouchMove = (e) => {
    if (!isScrolling) return;
    
    // Allow scrolling on the main content area
    const target = e.target;
    const scrollableParent = target.closest('.scrollable, main, body, .App');
    
    if (scrollableParent) {
      // Don't prevent default for scrollable areas
      return;
    }
  };

  const handleTouchEnd = () => {
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 100);
  };

  // Handle scroll events to maintain momentum
  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Re-enable scroll momentum after scroll ends
      preserveScrollMomentum();
    }, 150);
  };

  // Prevent scroll interruption from focus events
  const handleFocus = (e) => {
    // Prevent viewport jumping on input focus
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      setTimeout(() => {
        if (document.activeElement === e.target) {
          e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  };

  // Add event listeners with passive option for better performance
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  document.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('focus', handleFocus, true);

  // Initial setup
  preserveScrollMomentum();

  // Fix iOS Safari scroll issues
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    // Prevent elastic scrolling issues
    document.body.addEventListener('touchmove', (e) => {
      if (e.target === document.body) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Cleanup function
  return () => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('scroll', handleScroll);
    document.removeEventListener('focus', handleFocus);
  };
};

// Force scroll restoration after component updates
export const restoreScroll = () => {
  if (typeof window === 'undefined') return;
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Force re-enable touch scrolling
    document.body.style.webkitOverflowScrolling = 'touch';
    document.documentElement.style.webkitOverflowScrolling = 'touch';
    
    // Ensure overflow is correct
    document.body.style.overflowY = 'scroll';
    document.documentElement.style.overflowY = 'scroll';
  }
};

// Initialize on load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollFix);
  } else {
    initScrollFix();
  }
}