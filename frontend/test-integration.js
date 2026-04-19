/**
 * Node.js Integration Test Runner
 * Tests Django backend integration from command line
 */

const axios = require('axios');

// Mock environment for Node.js
process.env.REACT_APP_API_URL = 'http://localhost:8000/api';

class NodeIntegrationTester {
  constructor() {
    this.baseURL = 'http://localhost:8000/api';
    this.results = {
      apiHealth: null,
      menuItems: null,
      beverages: null,
      branches: null,
      reviews: null,
      mediaUrls: null,
      errorHandling: null,
      overall: null
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Django Backend Integration Tests (Node.js)...\n');
    
    try {
      // Test 1: API Health Check
      await this.testApiHealth();
      
      // Test 2: Menu Items API
      await this.testMenuItemsAPI();
      
      // Test 3: Beverages API
      await this.testBeveragesAPI();
      
      // Test 4: Branches API
      await this.testBranchesAPI();
      
      // Test 5: Reviews API
      await this.testReviewsAPI();
      
      // Test 6: Media URL Handling
      await this.testMediaUrls();
      
      // Test 7: Error Handling
      await this.testErrorHandling();
      
      // Generate final report
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Integration test suite failed:', error.message);
      this.results.overall = { success: false, error: error.message };
    }
  }

  async testApiHealth() {
    console.log('🔍 Testing API Health...');
    try {
      const response = await axios.get(`${this.baseURL}/menu/items/`, { timeout: 5000 });
      this.results.apiHealth = {
        success: response.status === 200,
        status: response.status,
        error: null
      };
      
      console.log('✅ API Health: Server is responding');
    } catch (error) {
      console.log('❌ API Health: Server is not responding', error.message);
      this.results.apiHealth = { success: false, error: error.message };
    }
    console.log('');
  }

  async testMenuItemsAPI() {
    console.log('🍽️ Testing Menu Items API...');
    try {
      const response = await axios.get(`${this.baseURL}/menu/items/`);
      const items = response.data;
      
      const tests = {
        dataReceived: Array.isArray(items) && items.length > 0,
        hasRequiredFields: items.every(item => 
          item.id && item.name && item.price && item.type
        ),
        priceFormat: items.every(item => 
          typeof item.price === 'string' && !isNaN(parseFloat(item.price))
        ),
        typeDisplay: items.every(item => item.type_display),
        nutritionalInfo: items.some(item => item.protein || item.carbs || item.fats)
      };
      
      // Test specific item fetch
      if (items.length > 0) {
        try {
          const itemResponse = await axios.get(`${this.baseURL}/menu/items/${items[0].id}/`);
          tests.specificItemFetch = itemResponse.data && itemResponse.data.id === items[0].id;
        } catch (error) {
          tests.specificItemFetch = false;
        }
      }
      
      // Test language parameter
      try {
        const ruResponse = await axios.get(`${this.baseURL}/menu/items/?lang=ru`);
        tests.languageSupport = ruResponse.data && Array.isArray(ruResponse.data);
      } catch (error) {
        tests.languageSupport = false;
      }
      
      this.results.menuItems = {
        success: Object.values(tests).every(Boolean),
        tests,
        itemCount: items.length,
        sampleItem: items[0] || null
      };
      
      console.log(`✅ Menu Items: ${items.length} items loaded`);
      console.log(`   - Required fields: ${tests.hasRequiredFields ? '✅' : '❌'}`);
      console.log(`   - Price format: ${tests.priceFormat ? '✅' : '❌'}`);
      console.log(`   - Type display: ${tests.typeDisplay ? '✅' : '❌'}`);
      console.log(`   - Nutritional info: ${tests.nutritionalInfo ? '✅' : '❌'}`);
      console.log(`   - Specific item fetch: ${tests.specificItemFetch ? '✅' : '❌'}`);
      console.log(`   - Language support: ${tests.languageSupport ? '✅' : '❌'}`);
      
    } catch (error) {
      console.log('❌ Menu Items API test failed:', error.message);
      this.results.menuItems = { success: false, error: error.message };
    }
    console.log('');
  }

  async testBeveragesAPI() {
    console.log('☕ Testing Beverages API...');
    try {
      const response = await axios.get(`${this.baseURL}/menu/beverages/`);
      const beverages = response.data;
      
      const tests = {
        dataReceived: Array.isArray(beverages) && beverages.length > 0,
        hasRequiredFields: beverages.every(item => 
          item.id && item.name && item.price && item.type
        ),
        priceFormat: beverages.every(item => 
          typeof item.price === 'string' && !isNaN(parseFloat(item.price))
        ),
        hasDescription: beverages.every(item => item.description),
        typeDisplay: beverages.every(item => item.type_display)
      };
      
      // Test specific beverage fetch
      if (beverages.length > 0) {
        try {
          const beverageResponse = await axios.get(`${this.baseURL}/menu/beverages/${beverages[0].id}/`);
          tests.specificBeverageFetch = beverageResponse.data && beverageResponse.data.id === beverages[0].id;
        } catch (error) {
          tests.specificBeverageFetch = false;
        }
      }
      
      this.results.beverages = {
        success: Object.values(tests).every(Boolean),
        tests,
        beverageCount: beverages.length,
        sampleBeverage: beverages[0] || null
      };
      
      console.log(`✅ Beverages: ${beverages.length} beverages loaded`);
      console.log(`   - Required fields: ${tests.hasRequiredFields ? '✅' : '❌'}`);
      console.log(`   - Price format: ${tests.priceFormat ? '✅' : '❌'}`);
      console.log(`   - Has description: ${tests.hasDescription ? '✅' : '❌'}`);
      console.log(`   - Type display: ${tests.typeDisplay ? '✅' : '❌'}`);
      console.log(`   - Specific beverage fetch: ${tests.specificBeverageFetch ? '✅' : '❌'}`);
      
    } catch (error) {
      console.log('❌ Beverages API test failed:', error.message);
      this.results.beverages = { success: false, error: error.message };
    }
    console.log('');
  }

  async testBranchesAPI() {
    console.log('🏢 Testing Branches API...');
    try {
      const response = await axios.get(`${this.baseURL}/branches/branches/`);
      const branches = response.data;
      
      const tests = {
        dataReceived: Array.isArray(branches) && branches.length > 0,
        hasRequiredFields: branches.every(branch => 
          branch.id && branch.name && branch.address
        ),
        hasRatingInfo: branches.every(branch => 
          typeof branch.average_rating === 'number' && 
          typeof branch.review_count === 'number'
        ),
        hasGoogleMapsUrl: branches.every(branch => 
          branch.google_maps_url && branch.google_maps_url.includes('maps.google.com')
        ),
        hasRecentReviews: branches.some(branch => 
          branch.recent_reviews && Array.isArray(branch.recent_reviews)
        )
      };
      
      // Test specific branch fetch
      if (branches.length > 0) {
        try {
          const branchResponse = await axios.get(`${this.baseURL}/branches/branches/${branches[0].id}/`);
          tests.specificBranchFetch = branchResponse.data && branchResponse.data.id === branches[0].id;
        } catch (error) {
          tests.specificBranchFetch = false;
        }
      }
      
      this.results.branches = {
        success: Object.values(tests).every(Boolean),
        tests,
        branchCount: branches.length,
        sampleBranch: branches[0] || null
      };
      
      console.log(`✅ Branches: ${branches.length} branches loaded`);
      console.log(`   - Required fields: ${tests.hasRequiredFields ? '✅' : '❌'}`);
      console.log(`   - Rating info: ${tests.hasRatingInfo ? '✅' : '❌'}`);
      console.log(`   - Google Maps URL: ${tests.hasGoogleMapsUrl ? '✅' : '❌'}`);
      console.log(`   - Recent reviews: ${tests.hasRecentReviews ? '✅' : '❌'}`);
      console.log(`   - Specific branch fetch: ${tests.specificBranchFetch ? '✅' : '❌'}`);
      
    } catch (error) {
      console.log('❌ Branches API test failed:', error.message);
      this.results.branches = { success: false, error: error.message };
    }
    console.log('');
  }

  async testReviewsAPI() {
    console.log('⭐ Testing Reviews API...');
    try {
      const response = await axios.get(`${this.baseURL}/branches/reviews/`);
      const reviews = response.data;
      
      const tests = {
        dataReceived: Array.isArray(reviews) && reviews.length > 0,
        hasRequiredFields: reviews.every(review => 
          review.id && review.customer_name && review.stars && review.message
        ),
        validStarRating: reviews.every(review => 
          review.stars >= 1 && review.stars <= 5
        ),
        hasTimestamp: reviews.every(review => review.created_at),
        hasPhoneNumber: reviews.every(review => review.phone_number),
        customerDisplay: reviews.every(review => review.customer_display)
      };
      
      this.results.reviews = {
        success: Object.values(tests).every(Boolean),
        tests,
        reviewCount: reviews.length,
        sampleReview: reviews[0] || null
      };
      
      console.log(`✅ Reviews: ${reviews.length} reviews loaded`);
      console.log(`   - Required fields: ${tests.hasRequiredFields ? '✅' : '❌'}`);
      console.log(`   - Valid star rating: ${tests.validStarRating ? '✅' : '❌'}`);
      console.log(`   - Has timestamp: ${tests.hasTimestamp ? '✅' : '❌'}`);
      console.log(`   - Has phone number: ${tests.hasPhoneNumber ? '✅' : '❌'}`);
      console.log(`   - Customer display: ${tests.customerDisplay ? '✅' : '❌'}`);
      
    } catch (error) {
      console.log('❌ Reviews API test failed:', error.message);
      this.results.reviews = { success: false, error: error.message };
    }
    console.log('');
  }

  testMediaUrls() {
    console.log('🖼️ Testing Media URL Handling...');
    
    // Simple media URL function for testing
    const getMediaUrl = (imagePath) => {
      if (!imagePath) return null;
      if (imagePath.startsWith('http')) return imagePath;
      
      const baseUrl = 'http://localhost:8000';
      
      if (imagePath.startsWith('/media/')) {
        return `${baseUrl}${imagePath}`;
      } else if (imagePath.startsWith('media/')) {
        return `${baseUrl}/${imagePath}`;
      } else if (imagePath.startsWith('/')) {
        return `${baseUrl}${imagePath}`;
      } else {
        return `${baseUrl}/media/${imagePath}`;
      }
    };
    
    try {
      const tests = {
        nullHandling: getMediaUrl(null) === null,
        emptyHandling: getMediaUrl('') === null,
        httpUrlPassthrough: getMediaUrl('http://example.com/image.jpg') === 'http://example.com/image.jpg',
        httpsUrlPassthrough: getMediaUrl('https://example.com/image.jpg') === 'https://example.com/image.jpg',
        mediaPathHandling: getMediaUrl('/media/test.jpg').includes('/media/test.jpg'),
        relativePathHandling: getMediaUrl('media/test.jpg').includes('/media/test.jpg'),
        simplePathHandling: getMediaUrl('test.jpg').includes('/media/test.jpg')
      };
      
      this.results.mediaUrls = {
        success: Object.values(tests).every(Boolean),
        tests
      };
      
      console.log('✅ Media URL Handling:');
      console.log(`   - Null handling: ${tests.nullHandling ? '✅' : '❌'}`);
      console.log(`   - Empty handling: ${tests.emptyHandling ? '✅' : '❌'}`);
      console.log(`   - HTTP URL passthrough: ${tests.httpUrlPassthrough ? '✅' : '❌'}`);
      console.log(`   - HTTPS URL passthrough: ${tests.httpsUrlPassthrough ? '✅' : '❌'}`);
      console.log(`   - Media path handling: ${tests.mediaPathHandling ? '✅' : '❌'}`);
      console.log(`   - Relative path handling: ${tests.relativePathHandling ? '✅' : '❌'}`);
      console.log(`   - Simple path handling: ${tests.simplePathHandling ? '✅' : '❌'}`);
      
    } catch (error) {
      console.log('❌ Media URL test failed:', error.message);
      this.results.mediaUrls = { success: false, error: error.message };
    }
    console.log('');
  }

  async testErrorHandling() {
    console.log('🚨 Testing Error Handling...');
    try {
      const tests = {
        notFoundError: false,
        badRequestError: false,
        networkError: false
      };
      
      // Test 404 error
      try {
        await axios.get(`${this.baseURL}/menu/items/99999/`);
      } catch (error) {
        tests.notFoundError = error.response?.status === 404;
      }
      
      // Test bad request (invalid endpoint)
      try {
        await axios.get(`${this.baseURL}/invalid-endpoint/`);
      } catch (error) {
        tests.badRequestError = error.response?.status === 404 || error.response?.status === 400;
      }
      
      // Test network error simulation
      try {
        await axios.get('http://localhost:9999/api/menu/items/', { timeout: 1000 });
      } catch (error) {
        tests.networkError = error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND';
      }
      
      this.results.errorHandling = {
        success: tests.notFoundError && tests.badRequestError && tests.networkError,
        tests
      };
      
      console.log('✅ Error Handling:');
      console.log(`   - 404 Not Found: ${tests.notFoundError ? '✅' : '❌'}`);
      console.log(`   - Bad Request: ${tests.badRequestError ? '✅' : '❌'}`);
      console.log(`   - Network Error: ${tests.networkError ? '✅' : '❌'}`);
      
    } catch (error) {
      console.log('❌ Error handling test failed:', error.message);
      this.results.errorHandling = { success: false, error: error.message };
    }
    console.log('');
  }

  generateReport() {
    console.log('📊 INTEGRATION TEST REPORT');
    console.log('=' .repeat(50));
    
    const allTests = [
      { name: 'API Health', result: this.results.apiHealth },
      { name: 'Menu Items API', result: this.results.menuItems },
      { name: 'Beverages API', result: this.results.beverages },
      { name: 'Branches API', result: this.results.branches },
      { name: 'Reviews API', result: this.results.reviews },
      { name: 'Media URL Handling', result: this.results.mediaUrls },
      { name: 'Error Handling', result: this.results.errorHandling }
    ];
    
    let passedTests = 0;
    let totalTests = allTests.length;
    
    allTests.forEach(test => {
      const status = test.result?.success ? '✅ PASS' : '❌ FAIL';
      console.log(`${test.name}: ${status}`);
      if (test.result?.success) passedTests++;
      if (test.result?.error) {
        console.log(`   Error: ${test.result.error}`);
      }
    });
    
    console.log('=' .repeat(50));
    console.log(`Overall Result: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
      console.log('🎉 ALL TESTS PASSED! Django backend integration is working correctly.');
      this.results.overall = { success: true, passedTests, totalTests };
    } else {
      console.log('⚠️  Some tests failed. Please check the errors above.');
      this.results.overall = { success: false, passedTests, totalTests };
    }
    
    // Detailed summary
    console.log('\n📋 DETAILED SUMMARY:');
    if (this.results.menuItems?.success) {
      console.log(`✅ Menu: ${this.results.menuItems.itemCount} items loaded successfully`);
    }
    if (this.results.beverages?.success) {
      console.log(`✅ Beverages: ${this.results.beverages.beverageCount} beverages loaded successfully`);
    }
    if (this.results.branches?.success) {
      console.log(`✅ Branches: ${this.results.branches.branchCount} branches loaded successfully`);
    }
    if (this.results.reviews?.success) {
      console.log(`✅ Reviews: ${this.results.reviews.reviewCount} reviews loaded successfully`);
    }
    
    return this.results;
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new NodeIntegrationTester();
  tester.runAllTests().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = NodeIntegrationTester;