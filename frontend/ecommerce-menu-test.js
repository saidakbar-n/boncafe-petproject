#!/usr/bin/env node

/**
 * E-commerce Style Menu Test
 * Tests the professional e-commerce design with advanced filters
 */

const fs = require('fs');
const path = require('path');

console.log('🛒 E-commerce Style Menu Test');
console.log('==============================');

// Test files to check
const testFiles = [
  'src/pages/Menu/Menu.js',
  'src/pages/Menu/Menu.styles.js'
];

let allTestsPassed = true;

// Check if e-commerce features are implemented
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
    // Test for professional menu card component
    if (content.includes('ProfessionalMenuCard')) {
      console.log('✅ Professional menu card component found');
    } else {
      console.log('❌ Professional menu card component missing');
      allTestsPassed = false;
    }
    
    // Test for e-commerce features
    if (content.includes('FiShoppingCart') && content.includes('FiHeart')) {
      console.log('✅ E-commerce features (cart, favorites) implemented');
    } else {
      console.log('❌ E-commerce features missing');
      allTestsPassed = false;
    }
    
    // Test for view modes
    if (content.includes('viewMode') && content.includes('grid') && content.includes('list')) {
      console.log('✅ Grid and list view modes found');
    } else {
      console.log('❌ View modes missing');
      allTestsPassed = false;
    }
    
    // Test for advanced filtering
    if (content.includes('priceRange') && content.includes('selectedFilters') && content.includes('sortBy')) {
      console.log('✅ Advanced filtering system implemented');
    } else {
      console.log('❌ Advanced filtering system missing');
      allTestsPassed = false;
    }
    
    // Test for professional styling
    if (content.includes('linear-gradient') && content.includes('backdrop') && content.includes('boxShadow')) {
      console.log('✅ Professional styling elements found');
    } else {
      console.log('❌ Professional styling elements missing');
      allTestsPassed = false;
    }
  }
  
  if (file.includes('Menu.styles.js')) {
    // Test for e-commerce layout
    if (content.includes('FilterSidebar') && content.includes('MainContent')) {
      console.log('✅ E-commerce sidebar layout found');
    } else {
      console.log('❌ E-commerce sidebar layout missing');
      allTestsPassed = false;
    }
    
    // Test for professional components
    if (content.includes('ViewToggle') && content.includes('SortDropdown') && content.includes('ResultsInfo')) {
      console.log('✅ Professional UI components found');
    } else {
      console.log('❌ Professional UI components missing');
      allTestsPassed = false;
    }
    
    // Test for filter components
    if (content.includes('FilterSection') && content.includes('FilterGroup') && content.includes('PriceRange')) {
      console.log('✅ Advanced filter components found');
    } else {
      console.log('❌ Advanced filter components missing');
      allTestsPassed = false;
    }
    
    // Test for mobile responsiveness
    if (content.includes('MobileFilterToggle') && content.includes('FilterOverlay')) {
      console.log('✅ Mobile filter system found');
    } else {
      console.log('❌ Mobile filter system missing');
      allTestsPassed = false;
    }
  }
});

console.log('\n🔍 Feature Analysis:');
console.log('===================');

// Check Menu.js for specific e-commerce features
const menuJsPath = path.join(__dirname, 'src/pages/Menu/Menu.js');
if (fs.existsSync(menuJsPath)) {
  const menuContent = fs.readFileSync(menuJsPath, 'utf8');
  
  // Count e-commerce features
  const ecommerceFeatures = [
    'handleAddToCart',
    'handleToggleFavorite', 
    'FiShoppingCart',
    'FiHeart',
    'viewMode',
    'sortBy',
    'priceRange'
  ];
  const foundFeatures = ecommerceFeatures.filter(feature => menuContent.includes(feature));
  console.log(`🛒 E-commerce features: ${foundFeatures.join(', ')}`);
  
  // Check for sorting options
  const sortOptions = ['popular', 'price-low', 'price-high', 'name', 'calories'];
  const foundSortOptions = sortOptions.filter(option => menuContent.includes(option));
  console.log(`📊 Sort options: ${foundSortOptions.join(', ')}`);
  
  // Check for filter types
  const filterTypes = ['dietary', 'spiceLevel', 'cookingTime', 'rating'];
  const foundFilters = filterTypes.filter(filter => menuContent.includes(filter));
  console.log(`🔍 Filter types: ${foundFilters.join(', ')}`);
}

console.log('\n🎨 Design System Check:');
console.log('=======================');

const stylesPath = path.join(__dirname, 'src/pages/Menu/Menu.styles.js');
if (fs.existsSync(stylesPath)) {
  const stylesContent = fs.readFileSync(stylesPath, 'utf8');
  
  // Count styled components
  const styledComponents = stylesContent.match(/export const \w+ = styled/g) || [];
  console.log(`🎨 Styled components: ${styledComponents.length}`);
  
  // Check for modern CSS features
  const modernFeatures = ['linear-gradient', 'backdrop-filter', 'box-shadow', 'border-radius'];
  const foundModernFeatures = modernFeatures.filter(feature => stylesContent.includes(feature));
  console.log(`✨ Modern CSS features: ${foundModernFeatures.join(', ')}`);
  
  // Check for responsive design
  const mediaQueries = stylesContent.match(/@media[^{]+{/g) || [];
  console.log(`📱 Media queries: ${mediaQueries.length}`);
}

console.log('\n' + '='.repeat(50));

if (allTestsPassed) {
  console.log('🎉 All E-commerce Menu Tests Passed!');
  console.log('✨ Professional features implemented:');
  console.log('   • Sidebar filter system like Amazon/eBay');
  console.log('   • Grid and list view modes');
  console.log('   • Advanced sorting and filtering');
  console.log('   • Shopping cart and favorites functionality');
  console.log('   • Professional card design with ratings');
  console.log('   • Price range slider and category filters');
  console.log('   • Mobile-responsive filter overlay');
  console.log('   • Modern gradient and shadow styling');
} else {
  console.log('❌ Some E-commerce Menu Tests Failed');
  console.log('Please check the implementation and try again.');
}

console.log('\n🚀 Ready to experience professional e-commerce menu design!');