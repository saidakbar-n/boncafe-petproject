// Custom commands for authentication
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
  cy.wait('@login');
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('loginAsCustomer', () => {
  const { email, password } = Cypress.env('testUser');
  cy.login(email, password);
});

Cypress.Commands.add('loginAsStaff', () => {
  cy.login('staff@example.com', 'staffpassword123');
});

Cypress.Commands.add('loginAsAdmin', () => {
  cy.login('admin@example.com', 'adminpassword123');
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="logout-button"]').click();
  cy.wait('@logout');
  cy.url().should('include', '/login');
});

// Custom commands for cart operations
Cypress.Commands.add('addToCart', (beverageId, quantity = 1) => {
  cy.get(`[data-testid="beverage-${beverageId}"]`).within(() => {
    if (quantity > 1) {
      cy.get('[data-testid="quantity-input"]').clear().type(quantity.toString());
    }
    cy.get('[data-testid="add-to-cart-button"]').click();
  });
});

Cypress.Commands.add('clearCart', () => {
  cy.get('[data-testid="cart-footer"]').should('be.visible');
  cy.get('[data-testid="cart-clear-button"]').click();
  cy.get('[data-testid="confirm-clear-button"]').click();
});

// Custom commands for profile operations
Cypress.Commands.add('updateProfile', (profileData) => {
  cy.visit('/profile');
  cy.get('[data-testid="personal-info-tab"]').click();
  
  if (profileData.name) {
    cy.get('[data-testid="name-input"]').clear().type(profileData.name);
  }
  
  if (profileData.phone) {
    cy.get('[data-testid="phone-input"]').clear().type(profileData.phone);
  }
  
  cy.get('[data-testid="save-profile-button"]').click();
  cy.get('[data-testid="success-message"]').should('be.visible');
});

// Custom commands for favorites
Cypress.Commands.add('addToFavorites', (beverageId) => {
  cy.get(`[data-testid="beverage-${beverageId}"]`).within(() => {
    cy.get('[data-testid="favorite-button"]').click();
  });
  cy.get('[data-testid="favorite-added-message"]').should('be.visible');
});

Cypress.Commands.add('removeFromFavorites', (beverageId) => {
  cy.get(`[data-testid="beverage-${beverageId}"]`).within(() => {
    cy.get('[data-testid="favorite-button"]').click();
  });
  cy.get('[data-testid="favorite-removed-message"]').should('be.visible');
});

// Custom commands for mobile testing
Cypress.Commands.add('setMobileViewport', () => {
  cy.viewport(375, 667); // iPhone SE dimensions
});

Cypress.Commands.add('setTabletViewport', () => {
  cy.viewport(768, 1024); // iPad dimensions
});

Cypress.Commands.add('setDesktopViewport', () => {
  cy.viewport(1280, 720); // Desktop dimensions
});

// Custom commands for accessibility testing
Cypress.Commands.add('checkA11y', (context, options) => {
  cy.injectAxe();
  cy.checkA11y(context, options);
});

// Custom commands for performance testing
Cypress.Commands.add('measurePageLoad', (url) => {
  cy.visit(url);
  cy.window().then((win) => {
    const performance = win.performance;
    const navigation = performance.getEntriesByType('navigation')[0];
    
    cy.task('log', {
      url,
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
    });
  });
});

// Custom commands for API testing
Cypress.Commands.add('apiLogin', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/api/auth/login/`,
    body: { email, password }
  }).then((response) => {
    expect(response.status).to.eq(200);
    window.localStorage.setItem('access_token', response.body.access_token);
    window.localStorage.setItem('refresh_token', response.body.refresh_token);
  });
});

Cypress.Commands.add('apiRequest', (method, url, body = {}) => {
  const token = window.localStorage.getItem('access_token');
  
  return cy.request({
    method,
    url: `${Cypress.env('apiUrl')}${url}`,
    body,
    headers: {
      'Authorization': token ? `Bearer ${token}` : undefined,
      'Content-Type': 'application/json'
    }
  });
});

// Custom commands for waiting and retrying
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

Cypress.Commands.add('retryUntil', (fn, maxAttempts = 5) => {
  let attempts = 0;
  
  const retry = () => {
    attempts++;
    try {
      fn();
    } catch (error) {
      if (attempts < maxAttempts) {
        cy.wait(1000);
        retry();
      } else {
        throw error;
      }
    }
  };
  
  retry();
});