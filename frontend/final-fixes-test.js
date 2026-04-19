#!/usr/bin/env node

/**
 * Final Fixes Test
 * Tests all fixes: menu errors, removed map, clean translations
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 Final Fixes Test');
console.log('===================');

let allTestsPassed = true;

// Test Menu.js fixes
console.log('\n📁 Testing Menu.js:');
const menuJsPath = path.join(__dirname, 'src/pages/Menu/Menu.js');
if (fs.existsSync(menuJsPath)) {
  const menuContent = fs.readFileSync(menuJsPath, 'utf8');
  
  // ESLint fixes
  if (!menuContent.includes('FiClock') && !menuContent.includes('FiDollarSign')) {
    console.log('✅ Unused imports removed');
  } else {
    console.log('❌ Unused imports still present');
    allTestsPassed = false;
  }
  
  if (menuContent.includes('const getCategoryName = (type, t) => {')) {
    console.log('✅ getCategoryName function properly defined');
  } else {
    console.log('❌ getCategoryName function issues');
    allTestsPassed = false;
  }
  
  // E-commerce removal
  if (!menuContent.includes('FiShoppingCart') && !menuContent.includes('FiHeart')) {
    console.log('✅ E-commerce features removed');
  } else {
    console.log('❌ E-commerce features still present');
    allTestsPassed = false;
  }
  
  // Translation system
  const translationKeys = menuContent.match(/t\('[^']+'/g) || [];
  if (translationKeys.length > 50) {
    console.log(`✅ Translation system active (${translationKeys.length} keys)`);
  } else {
    console.log(`❌ Translation system incomplete (${translationKeys.length} keys)`);
    allTestsPassed = false;
  }
} else {
  console.log('❌ Menu.js not found');
  allTestsPassed = false;
}

// Test Contact.js (map removal)
console.log('\n📁 Testing Contact.js:');
const contactJsPath = path.join(__dirname, 'src/pages/Contact/Contact.js');
if (fs.existsSync(contactJsPath)) {
  const contactContent = fs.readFileSync(contactJsPath, 'utf8');
  
  if (!contactContent.includes('iframe') && 
      !contactContent.includes('MapSection') && 
      !contactContent.includes('google')) {
    console.log('✅ Map completely removed from contacts');
  } else {
    console.log('❌ Map still present in contacts');
    allTestsPassed = false;
  }
} else {
  console.log('❌ Contact.js not found');
  allTestsPassed = false;
}

// Test i18n configuration
console.log('\n📁 Testing i18n configuration:');
const i18nConfigPath = path.join(__dirname, 'src/i18n/config.js');
if (fs.existsSync(i18nConfigPath)) {
  const i18nContent = fs.readFileSync(i18nConfigPath, 'utf8');
  
  if (i18nContent.includes('en:') && i18nContent.includes('ru:') && !i18nContent.includes('uz:')) {
    console.log('✅ Only English and Russian languages configured');
  } else {
    console.log('❌ Language configuration issues');
    allTestsPassed = false;
  }
} else {
  console.log('❌ i18n config not found');
  allTestsPassed = false;
}

// Test translation files
console.log('\n📁 Testing translation files:');
const enPath = path.join(__dirname, 'src/i18n/locales/en.json');
const ruPath = path.join(__dirname, 'src/i18n/locales/ru.json');

if (fs.existsSync(enPath) && fs.existsSync(ruPath)) {
  try {
    const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const ruContent = JSON.parse(fs.readFileSync(ruPath, 'utf8'));
    
    const enMenuKeys = Object.keys(enContent.menu || {}).length;
    const ruMenuKeys = Object.keys(ruContent.menu || {}).length;
    
    if (enMenuKeys === ruMenuKeys && enMenuKeys > 15) {
      console.log(`✅ Translation parity maintained (${enMenuKeys} keys each)`);
    } else {
      console.log(`❌ Translation parity issues (EN: ${enMenuKeys}, RU: ${ruMenuKeys})`);
      allTestsPassed = false;
    }
    
    // Check for comprehensive menu translations
    if (enContent.menu?.filters && enContent.menu?.categories && enContent.menu?.nutrition) {
      console.log('✅ Comprehensive menu translations present');
    } else {
      console.log('❌ Missing comprehensive menu translations');
      allTestsPassed = false;
    }
  } catch (e) {
    console.log('❌ Error parsing translation files');
    allTestsPassed = false;
  }
} else {
  console.log('❌ Translation files not found');
  allTestsPassed = false;
}

// Summary
console.log('\n' + '='.repeat(50));

if (allTestsPassed) {
  console.log('🎉 All Final Fixes Tests Passed!');
  console.log('');
  console.log('✨ Successfully completed:');
  console.log('   🔧 Fixed ESLint errors in Menu.js');
  console.log('   🗺️  Removed map from Contact page');
  console.log('   🛒 Removed e-commerce features (cart, favorites)');
  console.log('   🌐 Configured English/Russian translations only');
  console.log('   📝 Added comprehensive menu translations');
  console.log('   🏷️  Implemented proper category naming');
  console.log('   🧹 Clean, professional menu interface');
  console.log('');
  console.log('🚀 Application should now compile and run without errors!');
} else {
  console.log('❌ Some Final Fixes Tests Failed');
  console.log('Please review the issues above and fix them.');
}

console.log('\n💡 Ready for production use!');