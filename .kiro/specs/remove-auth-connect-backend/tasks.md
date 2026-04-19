# Implementation Plan

- [x] 1. Remove authentication infrastructure and dependencies
  - Remove AuthContext, AuthProvider, and all authentication state management
  - Delete authentication services (authService, googleAuth) and related utilities
  - Remove authentication-related components (Login, Register, Profile pages)
  - Clean up authentication imports and dependencies from package.json
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 2. Simplify API service for Django backend integration
  - Remove authentication interceptors and token management from api.js
  - Update API base URL configuration for Django backend
  - Implement proper Django media URL handling for images
  - Remove authentication-related API endpoints and keep only public endpoints
  - _Requirements: 4.1, 4.2, 4.3, 1.2, 2.1_

- [x] 3. Update App.js and routing structure
  - Remove AuthProvider wrapper from App.js
  - Simplify routing to only include public routes (Home, Menu, Branches, About, Contact)
  - Remove ProtectedRoute components and authentication guards
  - Update imports to remove authentication dependencies
  - _Requirements: 5.3, 5.4, 3.2_

- [x] 4. Update Navbar component for public navigation
  - Remove login/logout buttons and authentication-related UI elements
  - Keep only public navigation links (Home, Menu, Branches, About, Contact)
  - Maintain language selector functionality
  - Remove authentication state dependencies
  - _Requirements: 5.1, 5.2, 3.4_

- [x] 5. Update Menu page to connect with Django API
  - Modify Menu component to fetch data from Django `/api/menu/items/` and `/api/menu/beverages/`
  - Implement proper error handling for Django API responses
  - Update image rendering to use Django media URLs
  - Remove any authentication-dependent features
  - _Requirements: 1.1, 1.2, 1.3, 4.2, 4.3_

- [x] 6. Update Branches page to connect with Django API
  - Modify Branches component to fetch data from Django `/api/branches/branches/`
  - Implement branch reviews display from `/api/branches/reviews/`
  - Update image rendering for branch photos using Django media URLs
  - Remove authentication requirements for viewing branches and reviews
  - _Requirements: 2.1, 2.2, 2.3, 4.2, 4.3_

- [x] 7. Clean up unused components and files
  - Delete authentication-related component directories (Login, Register, Profile, etc.)
  - Remove role-based access components (RoleGuard, RoleBasedAuth, etc.)
  - Delete authentication utilities (roleUtils, sessionSecurity, etc.)
  - Remove authentication test files and update remaining tests
  - _Requirements: 3.1, 3.2, 6.1, 6.4_

- [x] 8. Update environment configuration and dependencies
  - Update .env.example with Django backend URL configuration
  - Remove authentication-related environment variables
  - Clean up package.json to remove unused authentication dependencies
  - Update build configuration to exclude authentication code
  - _Requirements: 4.1, 6.1, 6.4_

- [x] 9. Update error handling for public API
  - Remove authentication-specific error handling (401, 403 token refresh)
  - Implement user-friendly error messages for public API failures
  - Update error boundaries to handle only general application errors
  - Test error scenarios with Django API endpoints
  - _Requirements: 4.4, 6.2_

- [x] 10. Test and verify Django backend integration
  - Test all API endpoints work correctly with Django backend
  - Verify menu items and beverages display properly with Django data
  - Test branch information and reviews load correctly
  - Verify image URLs work properly with Django media configuration
  - Test responsive design and navigation without authentication
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 4.1, 4.2, 4.3, 5.1, 5.2_