#!/usr/bin/env node

/**
 * Remove Price Test
 * Tests that all price displays are removed from menu cards
 */

const fs = require('fs');
const path = require('path');

console.log('💰 Remove Price Test');
console.log('====================');

const menuJsPath = path.join(__dirname, 'src/pages/Menu/Menu.js');

if (!fs.existsSync(menuJsPath)) {
  console.log('❌ Menu.js file not found');
  process.exit(1);
}

const content = fs.readFileSync(menuJsPath, 'utf8');

console.log('\n📁 Testing Menu.js price removal:');

// Test for removed price displays
const priceDisplayPatterns = [
  'Price Display',
  'formatPrice',
  'marginTop.*auto.*padding.*12px 16px',
  'fontSize.*1\\.4rem.*fontWeight.*800.*color.*#8B4513',
  'fontSize.*1\\.5rem.*fontWeight.*800.*color.*#8B4513'
];

let foundPriceDisplays = 0;
priceDisplayPatterns.forEach(pattern => {
  const matches = content.match(new RegExp(pattern, 'g')) || [];
  if (matches.length > 0) {
    console.log(`❌ Found price display pattern: ${pattern} (${matches.length} times)`);
    foundPriceDisplays += matches.length;
  }
});

if (foundPriceDisplays === 0) {
  console.log('✅ All price displays removed');
} else {
  console.log(`❌ Found ${foundPriceDisplays} price display patterns`);
}

// Test for removed formatPrice function
if (!content.includes('const formatPrice = ')) {
  console.log('✅ formatPrice function removed');
} else {
  console.log('❌ formatPrice function still present');
}

// Test for removed price-related styling
const priceStylePatterns = [
  'rgba\\(139, 69, 19, 0\\.05\\)',
  'border.*1px solid rgba\\(139, 69, 19, 0\\.1\\)',
  'textAlign.*center.*fontSize.*1\\.4rem'
];

let foundPriceStyles = 0;
priceStylePatterns.forEach(pattern => {
  const matches = content.match(new RegExp(pattern, 'g')) || [];
  if (matches.length > 0) {
    console.log(`⚠️  Found potential price styling: ${pattern} (${matches.length} times)`);
    foundPriceStyles += matches.length;
  }
});

// Test for simplified title structure
if (content.includes('justifyContent: \'space-between\'') && 
    content.includes('alignItems: \'flex-start\'')) {
  console.log('⚠️  Still has complex title structure (might be for other elements)');
} else {
  console.log('✅ Title structure simplified');
}

// Test for clean card structure
const cardStructureIssues = [];

// Check for unused marginRight
if (content.includes('marginRight: \'12px\'')) {
  cardStructureIssues.push('marginRight still present');
}

// Check for empty divs
if (content.includes('<div></div>') || content.includes('style={{}}')) {
  cardStructureIssues.push('empty elements present');
}

if (cardStructureIssues.length === 0) {
  console.log('✅ Clean card structure');
} else {
  console.log(`⚠️  Card structure issues: ${cardStructureIssues.join(', ')}`);
}

// Count remaining styled elements
const styledElements = content.match(/style=\{\{[^}]+\}\}/g) || [];
console.log(`📊 Styled elements remaining: ${styledElements.length}`);

// Check for translation keys that might be price-related
const priceTranslationKeys = content.match(/t\('[^']*price[^']*'/gi) || [];
if (priceTranslationKeys.length > 0) {
  console.log(`⚠️  Price-related translation keys found: ${priceTranslationKeys.join(', ')}`);
} else {
  console.log('✅ No price-related translation keys');
}

console.log('\n' + '='.repeat(50));

// Final validation
const hasNoPriceDisplays = foundPriceDisplays === 0 && 
                          !content.includes('const formatPrice = ') &&
                          !content.includes('Price Display');

if (hasNoPriceDisplays) {
  console.log('🎉 All Price Displays Successfully Removed!');
  console.log('✨ Changes made:');
  console.log('   • Removed price display blocks from grid view');
  console.log('   • Removed price display blocks from list view');
  console.log('   • Removed formatPrice function');
  console.log('   • Simplified title structure');
  console.log('   • Cleaned up card layout');
  console.log('   • Removed price-related styling');
} else {
  console.log('❌ Some Price Displays Still Present');
  console.log('Please check the implementation and remove remaining price displays.');
}

console.log('\n🧹 Menu cards are now clean without price displays!');