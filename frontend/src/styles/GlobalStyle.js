import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /* Disable smooth scroll on mobile for better performance */
    scroll-behavior: auto;
    -webkit-overflow-scrolling: touch;
    /* Enable hardware acceleration */
    transform: translateZ(0);
    
    /* Prevent white background on overscroll */
    background-color: ${props => props.theme.colors.text};
  }

  @media (min-width: 768px) {
    html {
      scroll-behavior: smooth;
    }
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    
    /* Mobile performance optimizations */
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    
    /* CRITICAL: Ensure scrolling works on mobile */
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    
    /* Mobile-specific overscroll fix */
    @media (max-width: 767px) {
      /* Set body background to footer color on mobile to prevent white flash */
      background-color: ${props => props.theme.colors.text};
      /* IMPORTANT: Don't disable user-select completely as it can break scrolling */
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
      
      /* Remove transforms that can interfere with scrolling */
      transform: none !important;
      backface-visibility: visible;
      perspective: none;
    }
    
    /* Desktop optimizations */
    @media (min-width: 768px) {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      transform: translateZ(0);
      backface-visibility: hidden;
      perspective: 1000px;
    }
  }

  html {
    overflow-x: hidden;
    
    /* Ensure proper scrolling on mobile */
    @media (max-width: 767px) {
      overflow-y: auto !important;
      height: 100% !important;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fontWeights.semibold};
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundAlt};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.primaryLight};
  }

  /* Selection color */
  ::selection {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }

  /* Focus styles */
  button:focus,
  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  *:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Smooth transitions - ONLY on desktop for performance */
  @media (min-width: 768px) and (hover: hover) {
    button, a, input, select {
      transition: color ${props => props.theme.transitions.fast},
                  background-color ${props => props.theme.transitions.fast},
                  border-color ${props => props.theme.transitions.fast};
    }
  }

  /* NO transitions on mobile for maximum performance */
  @media (max-width: 767px), (hover: none) {
    *, *::before, *::after {
      transition: none !important;
      animation-duration: 0.01ms !important;
      animation-delay: 0.01ms !important;
    }
  }

  /* Enhanced mobile touch targets */
  @media (hover: none) and (pointer: coarse) {
    button, a, input, textarea, select {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* Performance optimizations */
  .slow-connection * {
    animation-duration: 0.1s !important;
    transition-duration: 0.1s !important;
  }

  .low-battery * {
    animation: none !important;
    transition: none !important;
  }

  .low-performance * {
    animation: none !important;
    transition: none !important;
  }

  .low-end-device * {
    box-shadow: none !important;
    text-shadow: none !important;
    filter: none !important;
  }

  .low-end-device .floating-element {
    display: none !important;
  }

  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* GPU acceleration for smooth animations */
  .gpu-accelerated {
    transform: translateZ(0);
    will-change: transform;
  }

  /* Optimize for different connection speeds */
  .save-data img {
    filter: blur(0.5px);
  }

  .save-data video {
    display: none;
  }

  /* Print styles */
  @media print {
    * {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
    }
    
    .no-print {
      display: none !important;
    }
  }

  /* Focus management for keyboard navigation */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  /* Optimize for very small screens */
  @media (max-width: 320px) {
    .container {
      padding: 0.5rem !important;
    }
  }

  /* Optimize for very large screens */
  @media (min-width: 1920px) {
    .container {
      max-width: 1600px;
    }
  }



  /* MOBILE PERFORMANCE OPTIMIZATIONS - SCROLLING SAFE */
  @media (max-width: 767px) {
    /* Disable expensive visual effects but keep scrolling working */
    * {
      box-shadow: none !important;
      text-shadow: none !important;
      filter: none !important;
      backdrop-filter: none !important;
      animation: none !important;
      transition: none !important;
    }

    /* CRITICAL: Prevent scroll interruption */
    html, body {
      transform: none !important;
      overflow-x: hidden;
      overflow-y: scroll !important; /* Force scroll instead of auto */
      -webkit-overflow-scrolling: touch !important;
      scroll-behavior: auto !important;
      height: 100% !important;
      min-height: 100vh;
      
      /* Prevent scroll momentum loss */
      overscroll-behavior: contain;
      -webkit-overscroll-behavior: contain;
      
      /* Ensure continuous scrolling */
      touch-action: pan-y !important;
      -ms-touch-action: pan-y !important;
    }

    /* Ensure scrollable containers work without interruption */
    .scrollable, main, [role="main"], .App {
      overflow-y: scroll !important; /* Force scroll instead of auto */
      -webkit-overflow-scrolling: touch !important;
      touch-action: pan-y !important;
      -ms-touch-action: pan-y !important;
      
      /* Prevent scroll blocking */
      overscroll-behavior: contain;
      -webkit-overscroll-behavior: contain;
    }

    /* Fix for scroll interruption on interactive elements */
    button, a, input, select, textarea, [role="button"] {
      border-radius: 8px !important;
      touch-action: manipulation !important;
      -ms-touch-action: manipulation !important;
      
      /* Prevent scroll blocking on touch */
      pointer-events: auto;
      -webkit-user-select: none;
      user-select: none;
    }

    /* Optimize images for mobile */
    img {
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      touch-action: pan-y !important;
      pointer-events: none; /* Prevent image drag from blocking scroll */
    }

    /* Remove hover effects completely */
    *:hover {
      box-shadow: none !important;
      background-color: inherit !important;
    }

    /* Ensure touch scrolling works everywhere without interruption */
    * {
      -webkit-overflow-scrolling: touch;
      
      /* Prevent accidental scroll blocking */
      -webkit-touch-callout: none;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
    }

    /* Special handling for dropdowns and modals */
    .dropdown-menu, .modal, .popup {
      touch-action: pan-y !important;
      -webkit-overflow-scrolling: touch !important;
    }
  }

  /* COZY PROFESSIONAL ENHANCEMENTS */
  .cozy-atmosphere {
    /* Warm, inviting shadows */
    --cozy-shadow: 0 2px 8px rgba(111, 78, 55, 0.08);
    --cozy-shadow-hover: 0 4px 16px rgba(111, 78, 55, 0.12);
    
    /* Soft, rounded corners */
    --cozy-radius: 12px;
    --cozy-radius-large: 20px;
    
    /* Warm spacing */
    --cozy-spacing: 1.5rem;
  }

  /* Professional typography */
  .professional-text {
    font-weight: 400;
    letter-spacing: 0.01em;
    line-height: 1.6;
  }

  /* Cozy button styles */
  .cozy-button {
    background: linear-gradient(135deg, #6F4E37, #8B6F47);
    border-radius: var(--cozy-radius);
    box-shadow: var(--cozy-shadow);
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  @media (min-width: 768px) {
    .cozy-button:hover {
      box-shadow: var(--cozy-shadow-hover);
      transform: translateY(-1px);
    }
  }

  /* Touch-friendly interactions */
  @media (hover: none) and (pointer: coarse) {
    button, a, [role="button"] {
      min-height: 48px;
      min-width: 48px;
      padding: 12px 16px;
      
      /* Immediate visual feedback */
      &:active {
        opacity: 0.7;
        transform: scale(0.98);
      }
    }
  }
`;

export default GlobalStyle;