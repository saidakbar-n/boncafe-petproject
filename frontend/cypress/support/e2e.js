// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
Cypress.on('window:before:load', (win) => {
  const originalFetch = win.fetch;
  win.fetch = function (...args) {
    return originalFetch.apply(this, args);
  };
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // for certain expected errors like network issues during development
  if (err.message.includes('Network Error') || 
      err.message.includes('Failed to fetch') ||
      err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});

// Global before hook
beforeEach(() => {
  // Clear localStorage and sessionStorage before each test
  cy.clearLocalStorage();
  cy.clearCookies();
  
  // Set up API interceptors for common endpoints
  cy.intercept('GET', '/api/auth/user/', { fixture: 'user.json' }).as('getCurrentUser');
  cy.intercept('POST', '/api/auth/login/', { fixture: 'loginResponse.json' }).as('login');
  cy.intercept('POST', '/api/auth/logout/', { statusCode: 200, body: { success: true } }).as('logout');
  cy.intercept('GET', '/api/menu/beverages/', { fixture: 'beverages.json' }).as('getBeverages');
  cy.intercept('GET', '/api/orders/', { fixture: 'orders.json' }).as('getOrders');
  cy.intercept('GET', '/api/favorites/', { fixture: 'favorites.json' }).as('getFavorites');
});