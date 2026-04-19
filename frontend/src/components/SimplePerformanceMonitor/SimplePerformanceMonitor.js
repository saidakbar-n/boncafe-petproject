import { useEffect } from 'react';

const SimplePerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime.toFixed(2), 'ms');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime, 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    }

    // Monitor memory usage
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = performance.memory;
        console.log('Memory Usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB'
        });
      }
    };

    // Monitor network information
    if ('connection' in navigator) {
      const connection = navigator.connection;
      console.log('Network:', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink + ' Mbps'
      });
      
      // Optimize for slow connections
      if (['slow-2g', '2g'].includes(connection.effectiveType)) {
        document.body.classList.add('slow-connection');
      }
    }

    // Monitor device capabilities
    const deviceInfo = {
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory || 'unknown',
      pixelRatio: window.devicePixelRatio
    };
    
    console.log('Device Info:', deviceInfo);
    
    // Optimize for low-end devices
    if (navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2) {
      document.body.classList.add('low-end-device');
    }

    // Monitor memory periodically
    const memoryInterval = setInterval(monitorMemory, 30000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  return null;
};

export default SimplePerformanceMonitor;