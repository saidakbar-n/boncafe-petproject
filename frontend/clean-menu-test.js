#!/usr/bin/env node

/**
 * Clean Menu Test
 * Tests the cleaned menu without cart/favorites and with proper translations
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Clean Menu Test');
console.log('==================');

// Test files to check
const testFiles = [
  'src/pages/Menu/Menu.js',
  'src/i18n/locales/en.json',
  'src/i18n/locales/ru.json',
  'src/i18n/config.js'
];

let allTestsPassed = true;

// Check if clean menu features are implemented
testFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${file}`);
    allTestsPassed = false;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`\n📁 Testing ${file}:`);
  
  if (file.includes('Menu.js')) {
    // Test for removed e-commerce features
    if (!content.includes('FiShoppingCart') && !content.includes('FiHeart')) {
      console.log('✅ Shopping cart and favorites removed');
    } else {
      console.log('❌ Shopping cart or favorites still present');
      allTestsPassed = false;
    }
    
    // Test for removed functions
    if (!content.includes('handleAddToCart') && !content.includes('handleToggleFavorite')) {
      console.log('✅ Cart and favorite handlers removed');
    } else {
      console.log('❌ Cart or favorite handlers still present');
      allTestsPassed = false;
    }
    
    // Test for translation usage
    if (content.includes('t(\'menu.') && content.includes('getCategoryName')) {
      console.log('✅ Translation system implemented');
    } else {
      console.log('❌ Translation system missing');
      allTestsPassed = false;
    }
    
    // Test for proper category naming
    if (content.includes('getCategoryName(item.type)')) {
      console.log('✅ Proper category naming implemented');
    } else {
      console.log('❌ Proper category naming missing');
      allTestsPassed = false;
    }
    
    // Test for ingredient translation
    if (content.includes('t(`menu.ingredients.${item.id}`')) {
      console.log('✅ Ingredient translation system found');
    } else {
      console.log('❌ Ingredient translation system missing');
      allTestsPassed = false;
    }
  }
  
  if (file.includes('en.json') || file.includes('ru.json')) {
    // Test for comprehensive menu translations
    if (content.includes('filters') && content.includes('categories') && content.includes('nutrition')) {
      console.log('✅ Comprehensive menu translations found');
    } else {
      console.log('❌ Comprehensive menu translations missing');
      allTestsPassed = false;
    }
    
    // Test for removed cart/favorites translations
    if (!content.includes('addToCart') && !content.includes('addToFavorites')) {
      console.log('✅ Cart and favorites translations removed');
    } else {
      console.log('❌ Cart and favorites translations still present');
      allTestsPassed = false;
    }
  }
  
  if (file.includes('config.js')) {
    // Test for removed Uzbek language
    if (!content.includes('uz') && !content.includes('uzbek')) {
      console.log('✅ Uzbek language removed');
    } else {
      console.log('❌ Uzbek language still present');
      allTestsPassed = false;
    }
    
    // Test for English and Russian only
    if (content.includes('en:') && content.includes('ru:') && content.split(':').length === 4) {
      console.log('✅ Only English and Russian languages configured');
    } else {
      console.log('❌ Language configuration incorrect');
      allTestsPassed = false;
    }
  }
});

console.log('\n🔍 Feature Analysis:');
console.log('===================');

// Check Menu.js for specific clean features
const menuJsPath = path.join(__dirname, 'src/pages/Menu/Menu.js');
if (fs.existsSync(menuJsPath)) {
  const menuContent = fs.readFileSync(menuJsPath, 'utf8');
  
  // Count translation keys
  const translationKeys = menuContent.match(/t\('[^']+'/g) || [];
  console.log(`🌐 Translation keys used: ${translationKeys.length}`);
  
  // Check for removed features
  const removedFeatures = [
    'FiShoppingCart',
    'FiHeart', 
    'handleAddToCart',
    'handleToggleFavorite',
    'isFavorite',
    'Add to Cart',
    'Добавить в корзину'
  ];
  const foundRemovedFeatures = removedFeatures.filter(feature => menuContent.includes(feature));
  if (foundRemovedFeatures.length === 0) {
    console.log('✅ All e-commerce features successfully removed');
  } else {
    console.log(`❌ Still found: ${foundRemovedFeatures.join(', ')}`);
  }
  
  // Check for clean features
  const cleanFeatures = [
    'getCategoryName',
    'menu.nutrition',
    'menu.categories',
    'menu.filters'
  ];
  const foundCleanFeatures = cleanFeatures.filter(feature => menuContent.includes(feature));
  console.log(`🧹 Clean features implemented: ${foundCleanFeatures.join(', ')}`);
}

console.log('\n🌐 Translation System Check:');
console.log('============================');

// Check translation files
const enPath = path.join(__dirname, 'src/i18n/locales/en.json');
const ruPath = path.join(__dirname, 'src/i18n/locales/ru.json');

if (fs.existsSync(enPath) && fs.existsSync(ruPath)) {
  const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const ruContent = JSON.parse(fs.readFileSync(ruPath, 'utf8'));
  
  // Count menu translation keys
  const enMenuKeys = Object.keys(enContent.menu || {}).length;
  const ruMenuKeys = Object.keys(ruContent.menu || {}).length;
  
  console.log(`🇺🇸 English menu keys: ${enMenuKeys}`);
  console.log(`🇷🇺 Russian menu keys: ${ruMenuKeys}`);
  
  if (enMenuKeys === ruMenuKeys && enMenuKeys > 10) {
    console.log('✅ Translation parity maintained');
  } else {
    console.log('❌ Translation parity issues detected');
  }
  
  // Check for comprehensive categories
  const enCategories = Object.keys(enContent.menu?.categories || {}).length;
  const ruCategories = Object.keys(ruContent.menu?.categories || {}).length;
  
  console.log(`📂 Category translations: EN(${enCategories}) RU(${ruCategories})`);
}

console.log('\n' + '='.repeat(50));

if (allTestsPassed) {
  console.log('🎉 All Clean Menu Tests Passed!');
  console.log('✨ Clean features implemented:');
  console.log('   • Removed shopping cart functionality');
  console.log('   • Removed favorites/heart buttons');
  console.log('   • Comprehensive English/Russian translations');
  console.log('   • Proper category naming system');
  console.log('   • Clean ingredient translation support');
  console.log('   • Professional filter and sort translations');
  console.log('   • Removed Uzbek language support');
} else {
  console.log('❌ Some Clean Menu Tests Failed');
  console.log('Please check the implementation and try again.');
}

console.log('\n🚀 Ready for clean, professional menu experience!');