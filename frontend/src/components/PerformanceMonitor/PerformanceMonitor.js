import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime.toFixed(2), 'ms');
          
          // Send to analytics if needed
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(lastEntry.startTime),
              event_category: 'Performance'
            });
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime, 'ms');
            
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                name: 'FID',
                value: Math.round(entry.processingStart - entry.startTime),
                event_category: 'Performance'
              });
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log('CLS:', clsValue.toFixed(4));
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'CLS',
              value: Math.round(clsValue * 1000),
              event_category: 'Performance'
            });
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }
    };

    // Monitor memory usage
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = performance.memory;
        console.log('Memory Usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
        });
      }
    };

    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        console.log('FPS:', fps);
        
        // Warn if FPS is low
        if (fps < 30) {
          console.warn('Low FPS detected:', fps);
          document.body.classList.add('low-performance');
        } else {
          document.body.classList.remove('low-performance');
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    // Monitor network information
    const monitorNetwork = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection;
        console.log('Network:', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink + ' Mbps',
          rtt: connection.rtt + ' ms',
          saveData: connection.saveData
        });
        
        // Optimize for slow connections
        if (['slow-2g', '2g'].includes(connection.effectiveType)) {
          document.body.classList.add('slow-connection');
        }
        
        // Optimize for data saver mode
        if (connection.saveData) {
          document.body.classList.add('save-data');
        }
      }
    };

    // Monitor device capabilities
    const monitorDevice = () => {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigator.deviceMemory || 'unknown',
        pixelRatio: window.devicePixelRatio,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`
      };
      
      console.log('Device Info:', deviceInfo);
      
      // Optimize for low-end devices
      if (navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2) {
        document.body.classList.add('low-end-device');
      }
    };

    // Initialize monitoring
    observeWebVitals();
    monitorMemory();
    measureFPS();
    monitorNetwork();
    monitorDevice();

    // Monitor memory periodically
    const memoryInterval = setInterval(monitorMemory, 30000);

    // Cleanup
    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;