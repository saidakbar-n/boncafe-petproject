import { useEffect, useRef, useCallback } from 'react';

export const useTouchGestures = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onTap,
  onDoubleTap,
  onLongPress,
  threshold = 50,
  longPressDelay = 500
}) => {
  const elementRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const lastTapRef = useRef(0);
  const initialDistanceRef = useRef(0);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    // Handle multi-touch for pinch gestures
    if (e.touches.length === 2 && onPinch) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      initialDistanceRef.current = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
    }

    // Start long press timer
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        onLongPress(e);
        // Trigger haptic feedback if available
        if (window.triggerHaptic) {
          window.triggerHaptic('medium');
        }
      }, longPressDelay);
    }
  }, [onPinch, onLongPress, longPressDelay]);

  const handleTouchMove = useCallback((e) => {
    // Clear long press timer on move
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Handle pinch gestures
    if (e.touches.length === 2 && onPinch && initialDistanceRef.current) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const scale = currentDistance / initialDistanceRef.current;
      onPinch({ scale, distance: currentDistance, initialDistance: initialDistanceRef.current });
    }
  }, [onPinch]);

  const handleTouchEnd = useCallback((e) => {
    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Handle tap gestures
    if (distance < 10 && deltaTime < 300) {
      const now = Date.now();
      const timeSinceLastTap = now - lastTapRef.current;
      
      if (timeSinceLastTap < 300 && onDoubleTap) {
        // Double tap
        onDoubleTap(e);
        lastTapRef.current = 0;
        // Trigger haptic feedback
        if (window.triggerHaptic) {
          window.triggerHaptic('light');
        }
      } else if (onTap) {
        // Single tap
        setTimeout(() => {
          if (Date.now() - lastTapRef.current > 300) {
            onTap(e);
          }
        }, 300);
        lastTapRef.current = now;
      }
      return;
    }

    // Handle swipe gestures
    if (distance > threshold) {
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
      
      if (isHorizontal) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight({ deltaX, deltaY, distance, deltaTime });
          // Trigger haptic feedback
          if (window.triggerHaptic) {
            window.triggerHaptic('light');
          }
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft({ deltaX, deltaY, distance, deltaTime });
          // Trigger haptic feedback
          if (window.triggerHaptic) {
            window.triggerHaptic('light');
          }
        }
      } else {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown({ deltaX, deltaY, distance, deltaTime });
          // Trigger haptic feedback
          if (window.triggerHaptic) {
            window.triggerHaptic('light');
          }
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp({ deltaX, deltaY, distance, deltaTime });
          // Trigger haptic feedback
          if (window.triggerHaptic) {
            window.triggerHaptic('light');
          }
        }
      }
    }

    // Reset
    touchStartRef.current = null;
    touchEndRef.current = null;
    initialDistanceRef.current = 0;
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, onDoubleTap, threshold]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add touch event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Prevent context menu on long press
    element.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('contextmenu', (e) => e.preventDefault());
      
      // Clear any pending timers
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return elementRef;
};

export const useSwipeNavigation = (onSwipeLeft, onSwipeRight, threshold = 100) => {
  return useTouchGestures({
    onSwipeLeft,
    onSwipeRight,
    threshold
  });
};

export const usePullToRefresh = (onRefresh, threshold = 80) => {
  const elementRef = useRef(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const isPullingRef = useRef(false);
  const indicatorRef = useRef(null);

  const createIndicator = useCallback(() => {
    if (indicatorRef.current) return indicatorRef.current;
    
    const indicator = document.createElement('div');
    indicator.style.cssText = `
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
      pointer-events: none;
    `;
    indicator.textContent = '↓ Pull to refresh';
    document.body.appendChild(indicator);
    indicatorRef.current = indicator;
    return indicator;
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (window.scrollY === 0) {
      startYRef.current = e.touches[0].clientY;
      isPullingRef.current = true;
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isPullingRef.current || window.scrollY > 0) return;

    currentYRef.current = e.touches[0].clientY;
    const pullDistance = currentYRef.current - startYRef.current;

    if (pullDistance > 0) {
      e.preventDefault();
      const indicator = createIndicator();
      const progress = Math.min(pullDistance / threshold, 1);
      
      indicator.style.top = `${-60 + (progress * 80)}px`;
      
      if (pullDistance > threshold) {
        indicator.textContent = '↑ Release to refresh';
        indicator.style.background = '#28a745';
      } else {
        indicator.textContent = '↓ Pull to refresh';
        indicator.style.background = '#8B4513';
      }
    }
  }, [threshold, createIndicator]);

  const handleTouchEnd = useCallback(() => {
    if (!isPullingRef.current) return;

    const pullDistance = currentYRef.current - startYRef.current;
    const indicator = indicatorRef.current;

    if (pullDistance > threshold && onRefresh) {
      if (indicator) {
        indicator.textContent = '⟳ Refreshing...';
        indicator.style.background = '#007bff';
      }
      
      onRefresh().finally(() => {
        if (indicator) {
          indicator.style.top = '-60px';
        }
      });
    } else if (indicator) {
      indicator.style.top = '-60px';
    }

    isPullingRef.current = false;
    startYRef.current = 0;
    currentYRef.current = 0;
  }, [threshold, onRefresh]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      // Clean up indicator
      if (indicatorRef.current) {
        document.body.removeChild(indicatorRef.current);
        indicatorRef.current = null;
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return elementRef;
};

export default useTouchGestures;