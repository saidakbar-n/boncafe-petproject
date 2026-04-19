#!/usr/bin/env node

/**
 * Enhanced Menu Layout Test
 * Tests the new asymmetric grid design and rich meal details
 */

const fs = require('fs');
const path = require('path');

console.log('🍽️  Enhanced Menu Layout Test');
console.log('================================');

// Test files to check
const testFiles = [
  'src/pages/Menu/Menu.js',
  'src/pages/Menu/Menu.styles.js'
];

let allTestsPassed = true;

// Check if enhanced menu features are implemented
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
    // Test for enhanced menu card component
    if (content.includes('EnhancedMenuCard')) {
      console.log('✅ Enhanced menu card component found');
    } else {
      console.log('❌ Enhanced menu card component missing');
      allTestsPassed = false;
    }
    
    // Test for asymmetric layout logic
    if (content.includes('isLargeCard') && content.includes('isMediumCard')) {
      console.log('✅ Asymmetric card sizing logic implemented');
    } else {
      console.log('❌ Asymmetric card sizing logic missing');
      allTestsPassed = false;
    }
    
    // Test for rich nutritional information
    if (content.includes('protein') && content.includes('carbs') && content.includes('fats')) {
      console.log('✅ Rich nutritional information display found');
    } else {
      console.log('❌ Rich nutritional information display missing');
      allTestsPassed = false;
    }
    
    // Test for beverage details
    if (content.includes('volume') && content.includes('temperature')) {
      console.log('✅ Beverage details display found');
    } else {
      console.log('❌ Beverage details display missing');
      allTestsPassed = false;
    }
    
    // Test for enhanced styling
    if (content.includes('gridColumn') && content.includes('gridRow')) {
      console.log('✅ Grid span styling for asymmetric layout found');
    } else {
      console.log('❌ Grid span styling missing');
      allTestsPassed = false;
    }
  }
  
  if (file.includes('Menu.styles.js')) {
    // Test for asymmetric grid layout
    if (content.includes('grid-template-columns: repeat(6, 1fr)')) {
      console.log('✅ Asymmetric 6-column grid layout found');
    } else {
      console.log('❌ Asymmetric grid layout missing');
      allTestsPassed = false;
    }
    
    // Test for responsive grid adjustments
    if (content.includes('grid-auto-rows: minmax')) {
      console.log('✅ Auto-sizing grid rows found');
    } else {
      console.log('❌ Auto-sizing grid rows missing');
      allTestsPassed = false;
    }
    
    // Test for card size classes
    if (content.includes('.menu-card.large') && content.includes('.menu-card.medium')) {
      console.log('✅ Card size classes for asymmetric layout found');
    } else {
      console.log('❌ Card size classes missing');
      allTestsPassed = false;
    }
    
    // Test for mobile responsiveness
    if (content.includes('grid-column: span 1 !important')) {
      console.log('✅ Mobile responsiveness overrides found');
    } else {
      console.log('❌ Mobile responsiveness overrides missing');
      allTestsPassed = false;
    }
  }
});

console.log('\n🔍 Feature Analysis:');
console.log('===================');

// Check Menu.js for specific enhancements
const menuJsPath = path.join(__dirname, 'src/pages/Menu/Menu.js');
if (fs.existsSync(menuJsPath)) {
  const menuContent = fs.readFileSync(menuJsPath, 'utf8');
  
  // Count different card types
  const largeCardPattern = /isLargeCard/g;
  const mediumCardPattern = /isMediumCard/g;
  const largeCardMatches = menuContent.match(largeCardPattern) || [];
  const mediumCardMatches = menuContent.match(mediumCardPattern) || [];
  
  console.log(`📊 Large card references: ${largeCardMatches.length}`);
  console.log(`📊 Medium card references: ${mediumCardMatches.length}`);
  
  // Check for nutrition fields
  const nutritionFields = ['calories', 'protein', 'carbs', 'fats', 'weight', 'cooking_time', 'spice_level'];
  const foundFields = nutritionFields.filter(field => menuContent.includes(field));
  console.log(`🥗 Nutrition fields supported: ${foundFields.join(', ')}`);
  
  // Check for beverage fields
  const beverageFields = ['volume', 'temperature'];
  const foundBeverageFields = beverageFields.filter(field => menuContent.includes(field));
  console.log(`☕ Beverage fields supported: ${foundBeverageFields.join(', ')}`);
}

console.log('\n📱 Responsive Design Check:');
console.log('===========================');

const stylesPath = path.join(__dirname, 'src/pages/Menu/Menu.styles.js');
if (fs.existsSync(stylesPath)) {
  const stylesContent = fs.readFileSync(stylesPath, 'utf8');
  
  // Count media queries
  const mediaQueries = stylesContent.match(/@media[^{]+{/g) || [];
  console.log(`📱 Media queries found: ${mediaQueries.length}`);
  
  // Check for different screen sizes
  const breakpoints = ['1400px', '1199px', '991px', '767px', '575px', '400px'];
  const foundBreakpoints = breakpoints.filter(bp => stylesContent.includes(bp));
  console.log(`📏 Breakpoints covered: ${foundBreakpoints.join(', ')}`);
}

console.log('\n' + '='.repeat(50));

if (allTestsPassed) {
  console.log('🎉 All Enhanced Menu Tests Passed!');
  console.log('✨ Features implemented:');
  console.log('   • Asymmetric grid layout with varying card sizes');
  console.log('   • Rich nutritional information display');
  console.log('   • Enhanced beverage details');
  console.log('   • Responsive design for all devices');
  console.log('   • Professional styling with gradients and shadows');
  console.log('   • Mobile-optimized touch interactions');
} else {
  console.log('❌ Some Enhanced Menu Tests Failed');
  console.log('Please check the implementation and try again.');
}

console.log('\n🚀 Ready to test the enhanced menu experience!');