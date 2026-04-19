// Advanced animation utilities for smooth, performant animations

export const easeInOutCubic = [0.4, 0, 0.2, 1];
export const easeOutQuart = [0.25, 1, 0.5, 1];
export const easeInOutQuart = [0.76, 0, 0.24, 1];

// Stagger animation variants
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.6,
      ease: easeInOutCubic
    }
  }
};

export const staggerItem = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOutQuart
    }
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeInOutCubic
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: easeInOutCubic
    }
  }
};

// Smooth hover animations
export const hoverScale = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: easeOutQuart }
  },
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const hoverLift = {
  whileHover: { 
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(44, 24, 16, 0.15), 0 10px 10px -5px rgba(44, 24, 16, 0.08)",
    transition: { duration: 0.3, ease: easeOutQuart }
  }
};

// Loading animations
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Slide animations
export const slideInFromLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutQuart }
  }
};

export const slideInFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutQuart }
  }
};

// Fade animations with blur
export const fadeInBlur = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeInOutCubic }
  }
};

// Floating animation for decorative elements
export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Modal animations
export const modalAnimation = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    y: 50
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOutQuart
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2,
      ease: easeInOutCubic
    }
  }
};

// Navbar animations
export const navbarAnimation = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easeOutQuart
    }
  }
};

// Card reveal animation
export const cardReveal = {
  initial: { 
    opacity: 0, 
    y: 50,
    rotateX: -15
  },
  animate: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: easeOutQuart
    }
  }
};

// Text reveal animation
export const textReveal = {
  initial: { 
    opacity: 0, 
    y: 20,
    clipPath: "inset(100% 0 0 0)"
  },
  animate: { 
    opacity: 1, 
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.8,
      ease: easeOutQuart
    }
  }
};

// Performance-optimized animation settings
export const reducedMotionSettings = {
  duration: 0.01,
  ease: "linear"
};

// Check for reduced motion preference
export const getAnimationSettings = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion ? reducedMotionSettings : {};
};