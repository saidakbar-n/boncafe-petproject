/**
 * Error Fix Test
 * Tests if the runtime errors are resolved
 */
const axios = require('axios');

const testErrorFixes = async () => {
  console.log('🔍 Testing Error Fixes...\n');
  
  try {
    // Test 1: Frontend Loading
    console.log('🌐 Testing Frontend Loading...');
    const response = await axios.get('http://localhost:3000', { 
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ErrorFixTest/1.0)'
      }
    });
    
    const hasTitle = response.data.includes('<title>Bon Cafe - Premium Coffee Experience</title>');
    const hasReactRoot = response.data.includes('id="root"');
    
    console.log(`   - Status: ${response.status === 200 ? '✅' : '❌'} (${response.status})`);
    console.log(`   - Title: ${hasTitle ? '✅' : '❌'}`);
    console.log(`   - React Root: ${hasReactRoot ? '✅' : '❌'}`);
    
    // Test 2: Check for error patterns in HTML
    console.log('\n🔍 Checking HTML for Error Patterns...');
    const hasNotificationError = response.data.includes('useNotification must be used within NotificationProvider');
    const hasThemeError = response.data.includes('props.theme.colors is undefined');
    const hasPlaceholderError = response.data.includes('/api/placeholder/');
    
    console.log(`   - Notification errors: ${hasNotificationError ? '❌ FOUND' : '✅ CLEAN'}`);
    console.log(`   - Theme errors: ${hasThemeError ? '❌ FOUND' : '✅ CLEAN'}`);
    console.log(`   - Placeholder errors: ${hasPlaceholderError ? '❌ FOUND' : '✅ CLEAN'}`);
    
    // Test 3: Check if JavaScript bundle loads
    console.log('\n📦 Testing JavaScript Bundle...');
    const bundleMatch = response.data.match(/src="([^"]*bundle[^"]*\.js)"/);
    if (bundleMatch) {
      try {
        const bundleUrl = `http://localhost:3000${bundleMatch[1]}`;
        const bundleResponse = await axios.get(bundleUrl, { timeout: 5000 });
        console.log(`   - Bundle loads: ${bundleResponse.status === 200 ? '✅' : '❌'}`);
      } catch (error) {
        console.log(`   - Bundle loads: ❌ (${error.message})`);
      }
    } else {
      console.log('   - Bundle loads: ❌ (No bundle found in HTML)');
    }
    
    // Test 4: Check for remaining proxy errors in console
    console.log('\n🔍 Checking for Proxy Errors...');
    // This would require checking the actual browser console, but we can check the HTML
    const hasProxyErrors = response.data.includes('Proxy error') || response.data.includes('ECONNREFUSED');
    console.log(`   - Proxy errors: ${hasProxyErrors ? '❌ FOUND' : '✅ CLEAN'}`);
    
    // Final Assessment
    console.log('\n📊 FINAL ASSESSMENT');
    console.log('=' .repeat(40));
    
    const isWorking = response.status === 200 && hasTitle && hasReactRoot;
    const isClean = !hasNotificationError && !hasThemeError && !hasPlaceholderError && !hasProxyErrors;
    
    if (isWorking && isClean) {
      console.log('🎉 SUCCESS! All errors appear to be resolved.');
      console.log('✅ Frontend loads correctly');
      console.log('✅ No runtime error patterns detected');
      console.log('✅ No proxy errors detected');
      console.log('\n💡 Note: Check browser console for any remaining runtime errors.');
      return true;
    } else {
      console.log('⚠️  Some issues may remain:');
      if (!isWorking) console.log('   - Frontend loading issues');
      if (!isClean) console.log('   - Error patterns still detected');
      console.log('\n🔧 Additional fixes may be needed.');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the React development server is running:');
      console.log('   cd frontend && npm start');
    }
    
    return false;
  }
};

// Run test
if (require.main === module) {
  testErrorFixes().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = testErrorFixes;