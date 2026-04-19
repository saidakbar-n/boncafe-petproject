/**
 * Simple test runner for integration tests
 * Can be run from browser console or as a standalone script
 */

import IntegrationTester from './integration-test.js';

// Function to run tests and display results
export const runIntegrationTests = async () => {
  console.clear();
  console.log('🚀 Starting Django Backend Integration Tests...');
  console.log('This will test all API endpoints and integration points.\n');
  
  const tester = new IntegrationTester();
  const results = await tester.runAllTests();
  
  return results;
};

// Auto-run if in browser environment
if (typeof window !== 'undefined') {
  // Make function available globally
  window.runIntegrationTests = runIntegrationTests;
  
  // Add a button to run tests (for development)
  const addTestButton = () => {
    if (document.getElementById('integration-test-btn')) return;
    
    const button = document.createElement('button');
    button.id = 'integration-test-btn';
    button.innerHTML = '🧪 Run Integration Tests';
    button.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
      padding: 10px 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    
    button.onclick = async () => {
      button.disabled = true;
      button.innerHTML = '🔄 Running Tests...';
      
      try {
        await runIntegrationTests();
        button.innerHTML = '✅ Tests Complete';
        setTimeout(() => {
          button.innerHTML = '🧪 Run Integration Tests';
          button.disabled = false;
        }, 3000);
      } catch (error) {
        button.innerHTML = '❌ Tests Failed';
        console.error('Test execution failed:', error);
        setTimeout(() => {
          button.innerHTML = '🧪 Run Integration Tests';
          button.disabled = false;
        }, 3000);
      }
    };
    
    document.body.appendChild(button);
  };
  
  // Add button when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addTestButton);
  } else {
    addTestButton();
  }
}

export default runIntegrationTests;