# Design Document

## Overview

This design outlines the complete removal of authentication functionality from the React frontend and proper integration with the existing Django REST API. The application will be transformed from an authenticated user system to a public-facing cafe website that showcases menu items, branch locations, and general information without requiring user accounts.

## Architecture

### Current State Analysis
- The application currently has extensive authentication infrastructure including AuthContext, login/register pages, protected routes, and role-based access control
- API service includes authentication interceptors and token management
- Multiple components depend on authentication state

### Target Architecture
- **Public API Integration**: Direct connection to Django REST endpoints without authentication
- **Simplified State Management**: Remove AuthContext and authentication-related state
- **Clean Component Structure**: Remove all auth-dependent components and simplify existing ones
- **Direct Django Integration**: Proper handling of Django's response formats and media URLs

## Components and Interfaces

### API Service Refactoring
```javascript
// Simplified API configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Remove authentication interceptors
// Keep only basic error handling and logging
```

### Core API Endpoints
Based on Django backend analysis:
- **Menu API**: `/api/menu/items/` and `/api/menu/beverages/`
- **Branches API**: `/api/branches/branches/` and `/api/branches/reviews/`
- **Media URLs**: Proper handling of Django's `MEDIA_URL` for images

### Component Modifications

#### App.js
- Remove AuthProvider wrapper
- Simplify routing to only public routes
- Remove any authentication checks

#### Navbar.js
- Remove login/logout buttons
- Keep only public navigation links
- Maintain language selector functionality

#### Pages to Keep (Simplified)
- **Home**: Featured menu items and cafe introduction
- **Menu**: Full menu display with categories
- **Branches**: Location information and reviews
- **About**: Cafe information and story
- **Contact**: Contact information and form

#### Components to Remove
- All authentication-related components (Login, Register, Profile, etc.)
- ProtectedRoute components
- Role-based access components
- Authentication error boundaries

## Data Models

### Menu Item Structure (from Django API)
```javascript
{
  id: number,
  name: string,
  description: string,
  price: number,
  category: string,
  image: string, // Django media URL
  is_available: boolean,
  created_at: string,
  updated_at: string
}
```

### Branch Structure (from Django API)
```javascript
{
  id: number,
  name: string,
  address: string,
  phone: string,
  email: string,
  opening_hours: object,
  latitude: number,
  longitude: number,
  image: string, // Django media URL
  is_active: boolean
}
```

### Review Structure (from Django API)
```javascript
{
  id: number,
  branch: number,
  customer_name: string,
  rating: number,
  comment: string,
  created_at: string
}
```

## Error Handling

### API Error Management
- Remove authentication-specific error handling (401, 403 token refresh)
- Keep general HTTP error handling (404, 500, network errors)
- Implement user-friendly error messages for public users

### Error Boundary Strategy
- Simplify error boundaries to handle only general application errors
- Remove authentication-specific error recovery

## Testing Strategy

### Unit Tests to Update
- Remove all authentication-related tests
- Update API service tests to remove auth interceptors
- Modify component tests to remove authentication dependencies

### Integration Tests
- Test Django API integration without authentication
- Verify proper media URL handling
- Test error scenarios for public API endpoints

### E2E Tests
- Remove login/logout flows
- Test public navigation and data display
- Verify responsive design on public pages

## Implementation Plan

### Phase 1: Remove Authentication Infrastructure
1. Remove AuthContext and AuthProvider
2. Delete authentication services and utilities
3. Remove authentication-related components
4. Clean up unused imports and dependencies

### Phase 2: Simplify API Service
1. Remove authentication interceptors
2. Update API endpoints to match Django structure
3. Implement proper Django media URL handling
4. Update error handling for public API

### Phase 3: Update Components and Pages
1. Simplify App.js routing
2. Update Navbar to remove auth elements
3. Modify existing pages to work without authentication
4. Remove protected routes and role guards

### Phase 4: Clean Up and Optimize
1. Remove unused dependencies from package.json
2. Update environment variables
3. Clean up dead code and unused imports
4. Update documentation and README

## Django Backend Integration

### API Endpoint Mapping
- Menu Items: `GET /api/menu/items/` → Frontend Menu page
- Beverages: `GET /api/menu/beverages/` → Frontend Menu page (beverages section)
- Branches: `GET /api/branches/branches/` → Frontend Branches page
- Reviews: `GET /api/branches/reviews/` → Frontend Branch details

### Media URL Configuration
```javascript
// Proper Django media URL handling
const getMediaUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${process.env.REACT_APP_API_URL.replace('/api', '')}${imagePath}`;
};
```

### CORS Configuration
Ensure Django settings allow frontend domain:
```python
# Django settings.py (reference only - no changes needed)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
    # Add production domain when deployed
]
```

## Security Considerations

### Public API Security
- Remove all authentication tokens and headers
- Keep basic CSRF protection for any form submissions
- Implement rate limiting on frontend for API calls
- Validate all user inputs on contact forms

### Data Privacy
- Remove all user data storage and management
- Remove secure storage utilities
- Keep only basic application preferences (language, theme)

## Performance Optimizations

### Bundle Size Reduction
- Remove authentication libraries and dependencies
- Eliminate unused role management code
- Reduce overall JavaScript bundle size

### API Optimization
- Implement proper caching for menu and branch data
- Use React Query or SWR for efficient data fetching
- Optimize image loading with lazy loading and proper sizing