/**
 * Responsive Design Test
 * Tests responsive behavior and mobile optimizations
 */

const testResponsiveDesign = () => {
  console.log('🔍 Testing Responsive Design...\n');
  
  const results = {
    viewport: null,
    mobileDetection: null,
    cssVariables: null,
    mediaQueries: null,
    touchSupport: null,
    performance: null
  };
  
  // Test 1: Viewport Configuration
  console.log('📱 Testing Viewport Configuration...');
  const viewport = document.querySelector('meta[name="viewport"]');
  results.viewport = {
    exists: !!viewport,
    content: viewport?.getAttribute('content') || null,
    hasUserScalable: viewport?.getAttribute('content')?.includes('user-scalable') || false,
    hasInitialScale: viewport?.getAttribute('content')?.includes('initial-scale') || false
  };
  
  console.log(`   - Viewport meta exists: ${results.viewport.exists ? '✅' : '❌'}`);
  console.log(`   - Has initial-scale: ${results.viewport.hasInitialScale ? '✅' : '❌'}`);
  console.log(`   - Content: ${results.viewport.content || 'Not found'}`);
  
  // Test 2: Mobile Device Detection
  console.log('\n📱 Testing Mobile Device Detection...');
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasMobileClass = document.documentElement.classList.contains('mobile-device');
  const hasLowEndClass = document.documentElement.classList.contains('low-end-device');
  
  results.mobileDetection = {
    userAgentMobile: isMobile,
    hasMobileClass,
    hasLowEndClass,
    hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
    deviceMemory: navigator.deviceMemory || 'unknown'
  };
  
  console.log(`   - Mobile user agent: ${isMobile ? '✅' : '❌'}`);
  console.log(`   - Mobile CSS class: ${hasMobileClass ? '✅' : '❌'}`);
  console.log(`   - Low-end device class: ${hasLowEndClass ? '✅' : '❌'}`);
  console.log(`   - Hardware concurrency: ${navigator.hardwareConcurrency || 'unknown'}`);
  console.log(`   - Device memory: ${navigator.deviceMemory || 'unknown'}GB`);
  
  // Test 3: CSS Custom Properties (Variables)
  console.log('\n🎨 Testing CSS Variables...');
  const rootStyles = getComputedStyle(document.documentElement);
  const vhVariable = rootStyles.getPropertyValue('--vh');
  
  results.cssVariables = {
    vhExists: !!vhVariable,
    vhValue: vhVariable || null
  };
  
  console.log(`   - --vh variable exists: ${results.cssVariables.vhExists ? '✅' : '❌'}`);
  console.log(`   - --vh value: ${vhVariable || 'Not set'}`);
  
  // Test 4: Media Queries Support
  console.log('\n📺 Testing Media Queries...');
  const mediaQueries = {
    mobile: window.matchMedia('(max-width: 768px)').matches,
    tablet: window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches,
    desktop: window.matchMedia('(min-width: 1025px)').matches,
    touchDevice: window.matchMedia('(pointer: coarse)').matches,
    hoverSupport: window.matchMedia('(hover: hover)').matches,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };
  
  results.mediaQueries = mediaQueries;
  
  console.log(`   - Mobile breakpoint: ${mediaQueries.mobile ? '✅' : '❌'}`);
  console.log(`   - Tablet breakpoint: ${mediaQueries.tablet ? '✅' : '❌'}`);
  console.log(`   - Desktop breakpoint: ${mediaQueries.desktop ? '✅' : '❌'}`);
  console.log(`   - Touch device: ${mediaQueries.touchDevice ? '✅' : '❌'}`);
  console.log(`   - Hover support: ${mediaQueries.hoverSupport ? '✅' : '❌'}`);
  console.log(`   - Prefers reduced motion: ${mediaQueries.prefersReducedMotion ? '✅' : '❌'}`);
  
  // Test 5: Touch Support
  console.log('\n👆 Testing Touch Support...');
  const touchSupport = {
    touchEvents: 'ontouchstart' in window,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    msMaxTouchPoints: navigator.msMaxTouchPoints || 0,
    touchAction: CSS.supports('touch-action', 'manipulation')
  };
  
  results.touchSupport = touchSupport;
  
  console.log(`   - Touch events: ${touchSupport.touchEvents ? '✅' : '❌'}`);
  console.log(`   - Max touch points: ${touchSupport.maxTouchPoints}`);
  console.log(`   - Touch-action support: ${touchSupport.touchAction ? '✅' : '❌'}`);
  
  // Test 6: Performance Optimizations
  console.log('\n⚡ Testing Performance Optimizations...');
  const performance = {
    scrollBehavior: rootStyles.getPropertyValue('scroll-behavior'),
    willChange: CSS.supports('will-change', 'transform'),
    transform3d: CSS.supports('transform', 'translate3d(0,0,0)'),
    backfaceVisibility: CSS.supports('backface-visibility', 'hidden'),
    loadedClass: document.body.classList.contains('loaded')
  };
  
  results.performance = performance;
  
  console.log(`   - Scroll behavior: ${performance.scrollBehavior || 'auto'}`);
  console.log(`   - Will-change support: ${performance.willChange ? '✅' : '❌'}`);
  console.log(`   - 3D transforms: ${performance.transform3d ? '✅' : '❌'}`);
  console.log(`   - Backface visibility: ${performance.backfaceVisibility ? '✅' : '❌'}`);
  console.log(`   - Loaded class: ${performance.loadedClass ? '✅' : '❌'}`);
  
  // Test 7: Navigation Responsiveness
  console.log('\n🧭 Testing Navigation Responsiveness...');
  const navbar = document.querySelector('nav') || document.querySelector('[role="navigation"]');
  const mobileMenuButton = document.querySelector('[aria-label*="menu"]') || 
                           document.querySelector('button[class*="mobile"]') ||
                           document.querySelector('button[class*="Menu"]');
  
  const navigation = {
    navbarExists: !!navbar,
    mobileMenuExists: !!mobileMenuButton,
    navbarHeight: navbar ? navbar.offsetHeight : 0,
    isFixed: navbar ? getComputedStyle(navbar).position === 'fixed' : false
  };
  
  results.navigation = navigation;
  
  console.log(`   - Navbar exists: ${navigation.navbarExists ? '✅' : '❌'}`);
  console.log(`   - Mobile menu button: ${navigation.mobileMenuExists ? '✅' : '❌'}`);
  console.log(`   - Navbar height: ${navigation.navbarHeight}px`);
  console.log(`   - Fixed positioning: ${navigation.isFixed ? '✅' : '❌'}`);
  
  // Generate Report
  console.log('\n📊 RESPONSIVE DESIGN TEST REPORT');
  console.log('=' .repeat(50));
  
  const tests = [
    { name: 'Viewport Configuration', result: results.viewport.exists && results.viewport.hasInitialScale },
    { name: 'Mobile Detection', result: results.mobileDetection.userAgentMobile === results.mobileDetection.hasMobileClass },
    { name: 'CSS Variables', result: results.cssVariables.vhExists },
    { name: 'Media Queries', result: results.mediaQueries.mobile || results.mediaQueries.tablet || results.mediaQueries.desktop },
    { name: 'Touch Support', result: results.touchSupport.touchEvents },
    { name: 'Performance Optimizations', result: results.performance.transform3d && results.performance.willChange },
    { name: 'Navigation', result: results.navigation.navbarExists && results.navigation.mobileMenuExists }
  ];
  
  let passedTests = 0;
  tests.forEach(test => {
    const status = test.result ? '✅ PASS' : '❌ FAIL';
    console.log(`${test.name}: ${status}`);
    if (test.result) passedTests++;
  });
  
  console.log('=' .repeat(50));
  console.log(`Overall Result: ${passedTests}/${tests.length} tests passed`);
  
  if (passedTests === tests.length) {
    console.log('🎉 ALL RESPONSIVE TESTS PASSED! The site is mobile-ready.');
  } else {
    console.log('⚠️  Some responsive tests failed. Check the details above.');
  }
  
  return results;
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testResponsiveDesign = testResponsiveDesign;
  
  // Auto-run test
  console.log('Responsive Design Test loaded. Run testResponsiveDesign() to execute tests.');
}

export default testResponsiveDesign;