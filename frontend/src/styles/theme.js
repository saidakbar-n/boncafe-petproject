export const theme = {
  colors: {
    primary: '#6F4E37', // Coffee Bean - rich, warm coffee color
    primaryLight: '#8B6F47', // Lighter coffee
    primaryDark: '#5D4037', // Dark coffee
    secondary: '#D2B48C', // Tan - warm cream color
    accent: '#DEB887', // Burlywood - cozy accent
    background: '#FFFEF7', // Warm white - cozy background
    backgroundAlt: '#F7F3E9', // Warm beige
    text: '#3E2723', // Dark brown - professional text
    textLight: '#5D4037', // Medium brown
    textMuted: '#8D6E63', // Light brown
    white: '#FFFFFF',
    lightGray: '#F5F5F5', // Light gray for borders and backgrounds
    cream: '#FFF8DC', // Cornsilk - warmer cream
    gold: '#B8860B', // Dark goldenrod - elegant accent
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#D32F2F',
    shadow: 'rgba(62, 39, 35, 0.08)',
    shadowDark: 'rgba(62, 39, 35, 0.15)'
  },
  fonts: {
    primary: "'Inter', sans-serif",
    heading: "'Playfair Display', serif"
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem'
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(62, 39, 35, 0.06)',
    md: '0 4px 8px -2px rgba(62, 39, 35, 0.08), 0 2px 4px -1px rgba(62, 39, 35, 0.04)',
    lg: '0 8px 16px -4px rgba(62, 39, 35, 0.1), 0 4px 8px -2px rgba(62, 39, 35, 0.06)',
    xl: '0 16px 32px -8px rgba(62, 39, 35, 0.12), 0 8px 16px -4px rgba(62, 39, 35, 0.08)'
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
    '3xl': '1920px'
  },
  
  // Fluid spacing system
  fluidSpacing: {
    xs: 'clamp(0.25rem, 2vw, 0.5rem)',
    sm: 'clamp(0.5rem, 3vw, 1rem)',
    md: 'clamp(1rem, 4vw, 2rem)',
    lg: 'clamp(1.5rem, 5vw, 3rem)',
    xl: 'clamp(2rem, 6vw, 4rem)',
    '2xl': 'clamp(3rem, 8vw, 6rem)'
  },
  transitions: {
    fast: '0.1s ease-out',
    normal: '0.15s ease-out',
    slow: '0.2s ease-out',
    bounce: '0.3s ease-out'
  },
  
  // Animation easing
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
  }
};