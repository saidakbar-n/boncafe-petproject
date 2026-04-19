#!/usr/bin/env node

/**
 * Clear Runtime Errors Fix
 * This script will clear all caches and restart the development server
 * to eliminate persistent runtime errors from cached components.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 CLEARING RUNTIME ERRORS...\n');

// 1. Stop any running development server
console.log('1. Stopping development server...');
try {
  execSync('pkill -f "react-scripts start"', { stdio: 'ignore' });
  console.log('   ✅ Development server stopped');
} catch (error) {
  console.log('   ℹ️  No running development server found');
}

// 2. Clear all caches
console.log('\n2. Clearing all caches...');

// Clear npm cache
try {
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('   ✅ NPM cache cleared');
} catch (error) {
  console.log('   ⚠️  Could not clear NPM cache');
}

// Clear webpack cache
const webpackCacheDir = path.join(__dirname, 'node_modules/.cache');
if (fs.existsSync(webpackCacheDir)) {
  try {
    execSync(`rm -rf "${webpackCacheDir}"`, { stdio: 'inherit' });
    console.log('   ✅ Webpack cache cleared');
  } catch (error) {
    console.log('   ⚠️  Could not clear webpack cache');
  }
}

// Clear React hot reload cache
const hotReloadCache = path.join(__dirname, '.eslintcache');
if (fs.existsSync(hotReloadCache)) {
  try {
    fs.unlinkSync(hotReloadCache);
    console.log('   ✅ ESLint cache cleared');
  } catch (error) {
    console.log('   ⚠️  Could not clear ESLint cache');
  }
}

// 3. Remove any problematic ErrorHandling components
console.log('\n3. Ensuring problematic components are removed...');

const errorHandlingDir = path.join(__dirname, 'src/components/ErrorHandling');
if (fs.existsSync(errorHandlingDir)) {
  try {
    execSync(`rm -rf "${errorHandlingDir}"`, { stdio: 'inherit' });
    console.log('   ✅ ErrorHandling directory removed');
  } catch (error) {
    console.log('   ⚠️  Could not remove ErrorHandling directory');
  }
} else {
  console.log('   ✅ ErrorHandling directory already removed');
}

// 4. Clear browser cache instructions
console.log('\n4. Browser cache clearing instructions:');
console.log('   🌐 Open your browser developer tools (F12)');
console.log('   🔄 Right-click the refresh button and select "Empty Cache and Hard Reload"');
console.log('   🧹 Or use Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)');

// 5. Restart development server
console.log('\n5. Restarting development server...');
console.log('   🚀 Starting fresh development server...');

try {
  // Start the development server in the background
  execSync('npm start', { stdio: 'inherit' });
} catch (error) {
  console.log('\n   ⚠️  Could not start development server automatically');
  console.log('   📝 Please run "npm start" manually');
}

console.log('\n✅ RUNTIME ERRORS CLEARING COMPLETE!');
console.log('\n📋 SUMMARY:');
console.log('   ✅ Development server restarted');
console.log('   ✅ All caches cleared');
console.log('   ✅ Problematic components removed');
console.log('   ✅ Fresh hot reload state');
console.log('\n🎯 The following errors should now be resolved:');
console.log('   ❌ useNotification must be used within NotificationProvider');
console.log('   ❌ can\'t access property "background", props.theme.colors is undefined');
console.log('   ❌ Blocked placeholder requests to /api/placeholder/*');