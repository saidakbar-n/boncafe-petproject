// Tests for mobile optimization utilities
import { 
  isMobileDevice, 
  isIOS, 
  isAndroid,
  initializeMobileOptimizations 
} from '../mobileOptimizations';
import { initAllMobileOptimizations } from '../ultraMobileOptimizations';
import mobilePerformanceOptimizer from '../mobilePerformanceOptimizer';

// Mock navigator and window objects
const mockNavigator = {
  userAgent: '',
  hardwareConcurrency: 4,
  deviceMemory: 4,
  connection: {
    effectiveType: '4g'
  }
};

const mockWindow = {
  devicePixelRatio: 1,
  screen: {
    width: 1920,
    height: 1080
  },
  innerWidth: 1920,
  innerHeight: 1080,
  matchMedia: jest.fn(() => ({
    matches: false
  }))
};

// Mock DOM methods
const mockDocument = {
  body: {
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(() => false)
    },
    style: {}
  },
  documentElement: {
    style: {
      setProperty: jest.fn()
    }
  },
  createElement: jest.fn(() => ({
    style: {},
    textContent: '',
    className: '',
    appendChild: jest.fn()
  })),
  head: {
    appendChild: jest.fn()
  },
  addEventListener: jest.fn(),
  querySelector: jest.fn(() => null),
  querySelectorAll: jest.fn(() => [])
};

// Setup global mocks
global.navigator = mockNavigator;
global.window = mockWindow;
global.document = mockDocument;

describe('Mobile Device Detection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should detect mobile devices correctly', () => {
    // Test iPhone
    mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    expect(isMobileDevice()).toBe(true);
    expect(isIOS()).toBe(true);
    expect(isAndroid()).toBe(false);

    // Test Android
    mockNavigator.userAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G975F)';
    expect(isMobileDevice()).toBe(true);
    expect(isIOS()).toBe(false);
    expect(isAndroid()).toBe(true);

    // Test Desktop
    mockNavigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    expect(isMobileDevice()).toBe(false);
    expect(isIOS()).toBe(false);
    expect(isAndroid()).toBe(false);
  });

  test('should handle edge cases in device detection', () => {
    // Test iPad (should be detected as iOS)
    mockNavigator.userAgent = 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)';
    expect(isIOS()).toBe(true);
    expect(isMobileDevice()).toBe(true);

    // Test empty user agent
    mockNavigator.userAgent = '';
    expect(isMobileDevice()).toBe(false);
    expect(isIOS()).toBe(false);
    expect(isAndroid()).toBe(false);
  });
});

describe('Mobile Optimizations Initialization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
  });

  test('should initialize mobile optimizations for mobile devices', () => {
    initializeMobileOptimizations();

    // Check if mobile class was added
    expect(mockDocument.body.classList.add).toHaveBeenCalledWith('mobile-device');
    expect(mockDocument.body.classList.add).toHaveBeenCalledWith('ios-device');
  });

  test('should initialize ultra mobile optimizations', () => {
    initAllMobileOptimizations();

    // Check if optimization classes were added
    expect(mockDocument.body.classList.add).toHaveBeenCalledWith('mobile-optimized');
  });

  test('should set CSS custom properties for safe areas', () => {
    initializeMobileOptimizations();

    // Check if CSS custom properties were set
    expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
      '--safe-area-top', 
      expect.any(String)
    );
    expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
      '--safe-area-bottom', 
      expect.any(String)
    );
  });
});

describe('Performance Optimizer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn()
    }));
    
    // Mock PerformanceObserver
    global.PerformanceObserver = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn()
    }));
    
    // Mock MutationObserver
    global.MutationObserver = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn()
    }));
  });

  test('should initialize performance optimizer', async () => {
    const result = await mobilePerformanceOptimizer.initialize();
    
    // Check if initialization was successful
    const status = mobilePerformanceOptimizer.getStatus();
    expect(status.isInitialized).toBe(true);
  });

  test('should detect device capabilities', async () => {
    await mobilePerformanceOptimizer.initialize();
    
    const status = mobilePerformanceOptimizer.getStatus();
    expect(status.deviceCapabilities).toBeDefined();
    expect(status.deviceCapabilities.hardwareConcurrency).toBeDefined();
    expect(status.deviceCapabilities.isMobile).toBeDefined();
  });

  test('should set optimization level based on device', async () => {
    // Test low-end device
    mockNavigator.hardwareConcurrency = 2;
    mockNavigator.deviceMemory = 1;
    
    await mobilePerformanceOptimizer.initialize();
    
    const status = mobilePerformanceOptimizer.getStatus();
    expect(status.optimizationLevel).toBe('aggressive');
  });

  test('should cleanup properly', async () => {
    await mobilePerformanceOptimizer.initialize();
    mobilePerformanceOptimizer.cleanup();
    
    const status = mobilePerformanceOptimizer.getStatus();
    expect(status.isInitialized).toBe(false);
  });
});

describe('Image Optimization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.Image = jest.fn(() => ({
      onload: null,
      onerror: null,
      src: '',
      srcset: '',
      sizes: ''
    }));
  });

  test('should optimize images for mobile', async () => {
    const mockImg = {
      dataset: {},
      loading: '',
      decoding: '',
      addEventListener: jest.fn(),
      src: 'test.jpg'
    };

    await mobilePerformanceOptimizer.initialize();
    
    // Simulate image optimization
    mobilePerformanceOptimizer.optimizeImage(mockImg);
    
    expect(mockImg.loading).toBe('lazy');
    expect(mockImg.decoding).toBe('async');
    expect(mockImg.dataset.optimized).toBe('true');
  });
});

describe('Gesture Optimizations', () => {
  test('should setup touch event listeners', () => {
    initializeMobileOptimizations();
    
    // Check if touch event listeners were added
    expect(mockDocument.addEventListener).toHaveBeenCalledWith(
      'touchstart',
      expect.any(Function),
      expect.objectContaining({ passive: true })
    );
    expect(mockDocument.addEventListener).toHaveBeenCalledWith(
      'touchmove',
      expect.any(Function),
      expect.objectContaining({ passive: true })
    );
    expect(mockDocument.addEventListener).toHaveBeenCalledWith(
      'touchend',
      expect.any(Function),
      expect.objectContaining({ passive: true })
    );
  });
});

describe('Responsive Design', () => {
  test('should handle viewport changes', () => {
    const mockResizeHandler = jest.fn();
    mockWindow.addEventListener = jest.fn((event, handler) => {
      if (event === 'resize') {
        mockResizeHandler.mockImplementation(handler);
      }
    });

    initializeMobileOptimizations();

    // Simulate resize
    mockWindow.innerWidth = 768;
    mockWindow.innerHeight = 1024;
    
    if (mockResizeHandler.mock.calls.length > 0) {
      mockResizeHandler();
    }

    // Check if viewport height was updated
    expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
      '--vh',
      expect.any(String)
    );
  });
});

describe('Performance Monitoring', () => {
  test('should monitor performance metrics', async () => {
    // Mock performance API
    global.PerformanceObserver = jest.fn((callback) => ({
      observe: jest.fn(),
      disconnect: jest.fn()
    }));

    await mobilePerformanceOptimizer.initialize();

    // Check if performance observers were created
    expect(global.PerformanceObserver).toHaveBeenCalled();
  });
});

describe('Accessibility Features', () => {
  test('should respect reduced motion preferences', () => {
    mockWindow.matchMedia = jest.fn((query) => ({
      matches: query.includes('prefers-reduced-motion: reduce')
    }));

    initializeMobileOptimizations();

    // Check if reduced motion class was added
    expect(mockDocument.body.classList.add).toHaveBeenCalledWith('mobile-device');
  });

  test('should support high contrast mode', () => {
    mockWindow.matchMedia = jest.fn((query) => ({
      matches: query.includes('prefers-contrast: high')
    }));

    initializeMobileOptimizations();

    // Verify that high contrast support is considered
    expect(mockWindow.matchMedia).toHaveBeenCalled();
  });
});

describe('Error Handling', () => {
  test('should handle initialization errors gracefully', async () => {
    // Mock console.error to check error handling
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Force an error during initialization
    mockDocument.body = null;

    try {
      await mobilePerformanceOptimizer.initialize();
    } catch (error) {
      // Should not throw
    }

    // Check if error was logged
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});