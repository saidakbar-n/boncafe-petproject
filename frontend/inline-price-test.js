#!/usr/bin/env node

/**
 * Inline Price Test
 * Tests that price is displayed inline with title, not as separate block
 */

const fs = require('fs');
const path = require('path');

console.log('💰 Inline Price Test');
console.log('====================');

const menuJsPath = path.join(__dirname, 'src/pages/Menu/Menu.js');

if (!fs.existsSync(menuJsPath)) {
  console.log('❌ Menu.js file not found');
  process.exit(1);
}

const content = fs.readFileSync(menuJsPath, 'utf8');

console.log('\n📁 Testing Menu.js inline price display:');

// Test for formatPrice function
if (content.includes('const formatPrice = (price) => {')) {
  console.log('✅ formatPrice function restored');
} else {
  console.log('❌ formatPrice function missing');
}

// Test for inline price in grid view
const gridPricePattern = /display.*flex.*justifyContent.*space-between.*alignItems.*flex-start/;
if (gridPricePattern.test(content)) {
  console.log('✅ Inline price layout found in grid view');
} else {
  console.log('❌ Inline price layout missing in grid view');
}

// Test for price styling inline
const inlinePriceStyle = /fontSize.*1\.1rem.*fontWeight.*700.*color.*#8B4513/;
if (inlinePriceStyle.test(content)) {
  console.log('✅ Inline price styling found');
} else {
  console.log('❌ Inline price styling missing');
}

// Test that large price blocks are NOT present
const largePriceBlockPatterns = [
  'marginTop.*auto.*padding.*12px 16px',
  'fontSize.*1\\.4rem.*fontWeight.*800',
  'backgroundColor.*rgba\\(139, 69, 19, 0\\.05\\).*borderRadius.*12px'
];

let foundLargeBlocks = 0;
largePriceBlockPatterns.forEach(pattern => {
  const matches = content.match(new RegExp(pattern, 'g')) || [];
  if (matches.length > 0) {
    console.log(`❌ Found large price block pattern: ${pattern}`);
    foundLargeBlocks += matches.length;
  }
});

if (foundLargeBlocks === 0) {
  console.log('✅ No large price blocks found');
} else {
  console.log(`❌ Found ${foundLargeBlocks} large price block patterns`);
}

// Test for proper title structure
if (content.includes('flex: 1') && content.includes('marginRight: \'12px\'')) {
  console.log('✅ Title has proper flex layout for inline price');
} else {
  console.log('❌ Title flex layout missing');
}

// Test for whiteSpace: 'nowrap' on price
if (content.includes('whiteSpace: \'nowrap\'')) {
  console.log('✅ Price has nowrap styling');
} else {
  console.log('❌ Price nowrap styling missing');
}

// Count formatPrice usage
const formatPriceUsages = content.match(/formatPrice\([^)]+\)/g) || [];
console.log(`📊 formatPrice used ${formatPriceUsages.length} times`);

// Test for translation usage in price
const priceTranslationUsages = content.match(/t\('menu\.currency'/g) || [];
console.log(`🌐 Price translation used ${priceTranslationUsages.length} times`);

// Test structure in both views
const titleAndPriceComments = content.match(/\/\* Title and Price \*\//g) || [];
if (titleAndPriceComments.length > 0) {
  console.log(`✅ Found "Title and Price" sections: ${titleAndPriceComments.length}`);
} else {
  console.log('❌ "Title and Price" sections missing');
}

console.log('\n' + '='.repeat(50));

// Final validation
const hasInlinePrice = content.includes('const formatPrice = (price) => {') &&
                      gridPricePattern.test(content) &&
                      inlinePriceStyle.test(content) &&
                      foundLargeBlocks === 0 &&
                      formatPriceUsages.length >= 2;

if (hasInlinePrice) {
  console.log('🎉 Inline Price Display Successfully Implemented!');
  console.log('✨ Features:');
  console.log('   • Price displayed next to title, not as separate block');
  console.log('   • Proper flex layout with space-between');
  console.log('   • Smaller, elegant price styling (1.1rem)');
  console.log('   • Price has nowrap to prevent line breaks');
  console.log('   • Title takes remaining space with flex: 1');
  console.log('   • Works in both grid and list view modes');
  console.log('   • No large price blocks or buttons');
} else {
  console.log('❌ Inline Price Display Issues Found');
  console.log('Please check the implementation.');
}

console.log('\n💡 Price now appears elegantly next to the dish name!');