// Performance monitoring utilities for better mobile experience

export const measurePerformance = () => {
  if ('performance' in window) {
    // Measure page load time
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
    });

    // Measure largest contentful paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('Largest Contentful Paint:', lastEntry.startTime, 'ms');
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }
};

// Optimize images for different screen densities
export const getOptimizedImageUrl = (baseUrl, width = 400, quality = 80) => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const optimizedWidth = Math.round(width * devicePixelRatio);
  
  // If using a CDN like Cloudinary or similar, you can add query parameters
  // Example: return `${baseUrl}?w=${optimizedWidth}&q=${quality}&f=auto`;
  // For now, return the base URL (optimizedWidth will be used when CDN is implemented)
  console.log(`Image optimization: ${optimizedWidth}px width for ${devicePixelRatio}x display`);
  return baseUrl;
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/images/placeholder-hero.svg', // Hero image
    '/images/placeholder-menu.svg'  // Menu card placeholder
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Lazy load images when they come into viewport
export const setupIntersectionObserver = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Detect slow connections and adjust accordingly
export const detectConnection = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    const slowConnections = ['slow-2g', '2g', '3g'];
    
    if (slowConnections.includes(connection.effectiveType)) {
      // Reduce image quality, disable animations, etc.
      document.body.classList.add('slow-connection');
      return 'slow';
    }
  }
  return 'fast';
};

// Optimize for battery level
export const optimizeForBattery = () => {
  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      if (battery.level < 0.2) {
        // Reduce animations and effects when battery is low
        document.body.classList.add('low-battery');
      }
    });
  }
};