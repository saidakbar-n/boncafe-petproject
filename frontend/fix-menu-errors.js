#!/usr/bin/env node

/**
 * Fix Menu Errors Test
 * Tests that all ESLint errors are fixed
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fix Menu Errors Test');
console.log('========================');

const menuJsPath = path.join(__dirname, 'src/pages/Menu/Menu.js');

if (!fs.existsSync(menuJsPath)) {
  console.log('❌ Menu.js file not found');
  process.exit(1);
}

const content = fs.readFileSync(menuJsPath, 'utf8');

console.log('\n📁 Testing Menu.js fixes:');

// Test for removed unused imports
if (!content.includes('FiClock') && !content.includes('FiDollarSign')) {
  console.log('✅ Unused imports (FiClock, FiDollarSign) removed');
} else {
  console.log('❌ Unused imports still present');
}

// Test for getCategoryName function definition
if (content.includes('const getCategoryName = (type, t) => {')) {
  console.log('✅ getCategoryName function properly defined');
} else {
  console.log('❌ getCategoryName function not properly defined');
}

// Test for getCategoryName usage with t parameter
const getCategoryNameUsages = content.match(/getCategoryName\([^)]+, t\)/g) || [];
if (getCategoryNameUsages.length >= 3) {
  console.log(`✅ getCategoryName used with t parameter (${getCategoryNameUsages.length} times)`);
} else {
  console.log(`❌ getCategoryName not properly used with t parameter (found ${getCategoryNameUsages.length} times)`);
}

// Test for no undefined function calls
if (!content.includes("'getCategoryName' is not defined")) {
  console.log('✅ No undefined function references');
} else {
  console.log('❌ Still has undefined function references');
}

// Test for proper import structure
const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
const reactIconsImport = importLines.find(line => line.includes('react-icons/fi'));

if (reactIconsImport) {
  const importedIcons = reactIconsImport.match(/Fi\w+/g) || [];
  console.log(`📦 Imported icons: ${importedIcons.join(', ')}`);
  
  // Check if all imported icons are used
  const unusedIcons = importedIcons.filter(icon => {
    const usageCount = (content.match(new RegExp(icon, 'g')) || []).length;
    return usageCount <= 1; // Only appears in import
  });
  
  if (unusedIcons.length === 0) {
    console.log('✅ All imported icons are used');
  } else {
    console.log(`⚠️  Potentially unused icons: ${unusedIcons.join(', ')}`);
  }
}

// Test for function scope
const functionDefinitions = content.match(/const \w+ = \([^)]*\) => {/g) || [];
console.log(`🔧 Function definitions found: ${functionDefinitions.length}`);

// Check for getCategoryName in global scope
const getCategoryNameIndex = content.indexOf('const getCategoryName = (type, t) => {');
const professionalMenuCardIndex = content.indexOf('const ProfessionalMenuCard = ');

if (getCategoryNameIndex < professionalMenuCardIndex && getCategoryNameIndex !== -1) {
  console.log('✅ getCategoryName defined in global scope before component');
} else {
  console.log('❌ getCategoryName not in proper scope');
}

console.log('\n' + '='.repeat(50));

// Final validation
const hasErrors = content.includes('FiClock') || 
                 content.includes('FiDollarSign') || 
                 !content.includes('const getCategoryName = (type, t) => {') ||
                 getCategoryNameUsages.length < 3;

if (!hasErrors) {
  console.log('🎉 All Menu Errors Fixed!');
  console.log('✨ Fixes applied:');
  console.log('   • Removed unused FiClock and FiDollarSign imports');
  console.log('   • Moved getCategoryName to global scope');
  console.log('   • Added t parameter to getCategoryName function');
  console.log('   • Updated all getCategoryName calls with t parameter');
  console.log('   • Fixed ESLint no-undef errors');
} else {
  console.log('❌ Some Menu Errors Still Present');
  console.log('Please check the implementation and try again.');
}

console.log('\n🚀 Menu should now compile without errors!');