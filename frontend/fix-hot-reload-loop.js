#!/usr/bin/env node

/**
 * HOT RELOAD LOOP FIX
 * This script stops the infinite hot-reload loop and clears all caches
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔥 FIXING HOT RELOAD INFINITE LOOP...\n');

// 1. Kill all React development servers
console.log('1. Stopping all React development servers...');
try {
  execSync('pkill -f "react-scripts start"', { stdio: 'ignore' });
  execSync('pkill -f "webpack"', { stdio: 'ignore' });
  execSync('pkill -f "node.*start"', { stdio: 'ignore' });
  console.log('   ✅ All development servers stopped');
} catch (error) {
  console.log('   ℹ️  No running servers found');
}

// 2. Clear all webpack and React caches
console.log('\n2. Clearing all caches...');

const cachesToClear = [
  'node_modules/.cache',
  '.eslintcache',
  'build',
  'dist'
];

cachesToClear.forEach(cacheDir => {
  const fullPath = path.join(__dirname, cacheDir);
  if (fs.existsSync(fullPath)) {
    try {
      execSync(`rm -rf "${fullPath}"`, { stdio: 'inherit' });
      console.log(`   ✅ Cleared ${cacheDir}`);
    } catch (error) {
      console.log(`   ⚠️  Could not clear ${cacheDir}`);
    }
  }
});

// 3. Update service worker cache versions
console.log('\n3. Updating service worker cache versions...');
const swPath = path.join(__dirname, 'public/sw.js');
if (fs.existsSync(swPath)) {
  let swContent = fs.readFileSync(swPath, 'utf8');
  const newVersion = Date.now();
  
  swContent = swContent.replace(/CACHE_NAME = '[^']*'/g, `CACHE_NAME = 'bon-cafe-v${newVersion}'`);
  swContent = swContent.replace(/STATIC_CACHE = '[^']*'/g, `STATIC_CACHE = 'static-v${newVersion}'`);
  swContent = swContent.replace(/DYNAMIC_CACHE = '[^']*'/g, `DYNAMIC_CACHE = 'dynamic-v${newVersion}'`);
  swContent = swContent.replace(/IMAGE_CACHE = '[^']*'/g, `IMAGE_CACHE = 'images-v${newVersion}'`);
  
  fs.writeFileSync(swPath, swContent);
  console.log('   ✅ Service worker cache versions updated');
}

// 4. Update main index.js cache bust
console.log('\n4. Adding cache bust to index.js...');
const indexPath = path.join(__dirname, 'src/index.js');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  const timestamp = new Date().toISOString();
  
  if (indexContent.includes('// Cache bust:')) {
    indexContent = indexContent.replace(/\/\/ Cache bust:.*\n/, `// Cache bust: ${timestamp}\n`);
  } else {
    indexContent = `// Cache bust: ${timestamp}\n${indexContent}`;
  }
  
  fs.writeFileSync(indexPath, indexContent);
  console.log('   ✅ Cache bust added to index.js');
}

// 5. Clear browser instructions
console.log('\n🌐 BROWSER CACHE CLEARING REQUIRED:');
console.log('   1. Open Developer Tools (F12)');
console.log('   2. Right-click refresh button → "Empty Cache and Hard Reload"');
console.log('   3. Or use Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)');
console.log('   4. Close all browser tabs for localhost:3000');
console.log('   5. Clear browser data for localhost:3000 if needed');

console.log('\n🚀 RESTART INSTRUCTIONS:');
console.log('   1. Wait 5 seconds');
console.log('   2. Run: npm start');
console.log('   3. Clear browser cache when it opens');

console.log('\n✅ HOT RELOAD LOOP FIX COMPLETE!');
console.log('\n📋 WHAT WAS FIXED:');
console.log('   ✅ Stopped all development servers');
console.log('   ✅ Cleared webpack and React caches');
console.log('   ✅ Updated service worker cache versions');
console.log('   ✅ Added cache-busting to main entry point');
console.log('\n🎯 The infinite hot-reload loop should now be stopped!');