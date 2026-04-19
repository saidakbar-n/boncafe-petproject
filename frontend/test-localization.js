// Test script to verify localization is working
const testLocalization = async () => {
  console.log('🧪 Testing Localization System...\n');

  const languages = ['ru', 'en', 'uz'];
  const baseUrl = 'http://localhost:8000/api/menu';

  for (const lang of languages) {
    console.log(`📍 Testing ${lang.toUpperCase()} language:`);
    
    try {
      // Test menu items
      const itemsResponse = await fetch(`${baseUrl}/items/?lang=${lang}`);
      const items = await itemsResponse.json();
      
      if (items.length > 0) {
        const firstItem = items[0];
        console.log(`  ✅ Menu Item: "${firstItem.name}" (${firstItem.type_display})`);
        console.log(`     Ingredients: "${firstItem.ingredients}"`);
      }

      // Test beverages
      const beveragesResponse = await fetch(`${baseUrl}/beverages/?lang=${lang}`);
      const beverages = await beveragesResponse.json();
      
      if (beverages.length > 0) {
        const firstBeverage = beverages[0];
        console.log(`  ✅ Beverage: "${firstBeverage.name}" (${firstBeverage.type_display})`);
        console.log(`     Description: "${firstBeverage.description}"`);
      }

    } catch (error) {
      console.log(`  ❌ Error testing ${lang}: ${error.message}`);
    }
    
    console.log('');
  }

  console.log('🎉 Localization test completed!');
};

// Run the test
testLocalization();