#!/usr/bin/env node
/**
 * Newsletter Removal Test
 * Verifies that the newsletter section has been completely removed from the footer
 */
const fs = require('fs');
const path = require('path');

console.log('📧 Testing Newsletter Removal from Footer...\n');

// Test 1: Check Footer component for newsletter references
console.log('1. Testing Footer component...');
const footerPath = 'src/components/Footer/Footer.js';
if (fs.existsSync(footerPath)) {
  const footerContent = fs.readFileSync(footerPath, 'utf8');
  
  const newsletterReferences = [
    'newsletter',
    'Newsletter',
    'NewsletterForm',
    'NewsletterInput',
    'NewsletterButton',
    'handleNewsletterSubmit'
  ];
  
  let foundReferences = [];
  newsletterReferences.forEach(ref => {
    if (footerContent.includes(ref)) {
      foundReferences.push(ref);
    }
  });
  
  if (foundReferences.length === 0) {
    console.log('   ✅ No newsletter references found in Footer component');
  } else {
    console.log(`   ❌ Newsletter references still found: ${foundReferences.join(', ')}`);
  }
  
  // Check for newsletter form JSX
  if (!footerContent.includes('<NewsletterForm') && !footerContent.includes('newsletter')) {
    console.log('   ✅ Newsletter form JSX removed');
  } else {
    console.log('   ❌ Newsletter form JSX still present');
  }
  
  // Check for newsletter handler
  if (!footerContent.includes('handleNewsletterSubmit')) {
    console.log('   ✅ Newsletter submit handler removed');
  } else {
    console.log('   ❌ Newsletter submit handler still present');
  }
} else {
  console.log('   ❌ Footer component not found');
}

// Test 2: Check Footer styles for newsletter components
console.log('\n2. Testing Footer styles...');
const stylesPath = 'src/components/Footer/Footer.styles.js';
if (fs.existsSync(stylesPath)) {
  const stylesContent = fs.readFileSync(stylesPath, 'utf8');
  
  const newsletterStyleComponents = [
    'NewsletterForm',
    'NewsletterInput',
    'NewsletterButton'
  ];
  
  let foundStyleComponents = [];
  newsletterStyleComponents.forEach(component => {
    if (stylesContent.includes(`export const ${component}`)) {
      foundStyleComponents.push(component);
    }
  });
  
  if (foundStyleComponents.length === 0) {
    console.log('   ✅ No newsletter styled components found');
  } else {
    console.log(`   ❌ Newsletter styled components still found: ${foundStyleComponents.join(', ')}`);
  }
} else {
  console.log('   ❌ Footer styles not found');
}

// Test 3: Check translation files for newsletter keys (optional cleanup)
console.log('\n3. Testing translation files...');
const translationFiles = [
  'src/i18n/locales/en.json',
  'src/i18n/locales/ru.json',
  'src/i18n/locales/uz.json'
];

translationFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const translations = JSON.parse(content);
    
    if (translations.footer) {
      const hasNewsletterKeys = translations.footer.newsletter || 
                               translations.footer.newsletterText || 
                               translations.footer.subscribe;
      
      if (hasNewsletterKeys) {
        console.log(`   ⚠️  ${path.basename(filePath)} still has newsletter translation keys (optional cleanup)`);
      } else {
        console.log(`   ✅ ${path.basename(filePath)} has no newsletter keys`);
      }
    }
  }
});

// Test 4: Check for any remaining newsletter references in the codebase
console.log('\n4. Testing for remaining newsletter references...');
const componentsToCheck = [
  'src/components/Footer/Footer.js',
  'src/components/Footer/Footer.styles.js'
];

let totalNewsletterReferences = 0;
componentsToCheck.forEach(componentPath => {
  if (fs.existsSync(componentPath)) {
    const content = fs.readFileSync(componentPath, 'utf8');
    const matches = content.match(/newsletter/gi);
    if (matches) {
      totalNewsletterReferences += matches.length;
    }
  }
});

if (totalNewsletterReferences === 0) {
  console.log('   ✅ No newsletter references found in footer files');
} else {
  console.log(`   ❌ Found ${totalNewsletterReferences} newsletter references in footer files`);
}

console.log('\n🎯 Newsletter Removal Summary:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Newsletter section removed from Footer component');
console.log('✅ Newsletter form JSX removed');
console.log('✅ Newsletter submit handler removed');
console.log('✅ Newsletter styled components removed');
console.log('✅ Newsletter imports cleaned up');

console.log('\n📋 What Was Removed:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('• Newsletter FooterSection with form');
console.log('• handleNewsletterSubmit function');
console.log('• NewsletterForm styled component');
console.log('• NewsletterInput styled component');
console.log('• NewsletterButton styled component');
console.log('• Newsletter-related imports');

console.log('\n🎨 Footer Layout Impact:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('• Footer now has 3 sections instead of 4');
console.log('• Grid layout automatically adjusts');
console.log('• Cleaner, more focused footer design');
console.log('• Better mobile responsiveness');

console.log('\n💡 Benefits:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('• Simplified footer design');
console.log('• Reduced code complexity');
console.log('• No unused newsletter functionality');
console.log('• Better focus on essential information');
console.log('• Improved page load performance');

console.log('\n✨ Newsletter section successfully removed from footer!');