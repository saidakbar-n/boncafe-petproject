import axios from 'axios';

// Django backend API configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for basic logging (development only)
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Response interceptor for public API error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Enhanced error logging for public API
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });

    // Handle common public API errors with user-friendly messages
    if (error.response?.status === 404) {
      console.warn('Resource not found:', error.config?.url);
      error.userMessage = 'The requested information could not be found.';
    } else if (error.response?.status === 429) {
      console.warn('Rate limit exceeded:', error.config?.url);
      error.userMessage = 'Too many requests. Please wait a moment and try again.';
    } else if (error.response?.status >= 500) {
      console.error('Server error:', error.response?.status);
      error.userMessage = 'Our servers are experiencing issues. Please try again in a few minutes.';
    } else if (error.response?.status === 400) {
      console.warn('Bad request:', error.config?.url);
      error.userMessage = 'There was an issue with your request. Please try again.';
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      console.error('Network error - please check your connection');
      error.userMessage = 'Unable to connect to our servers. Please check your internet connection.';
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.config?.url);
      error.userMessage = 'The request took too long to complete. Please try again.';
    }

    return Promise.reject(error);
  }
);

// Public Menu API endpoints
export const menuAPI = {
  // Get all menu items with optional language parameter
  getMenuItems: (lang = 'ru') => api.get('/menu/items/', { params: { lang } }),
  
  // Get all beverages with optional language parameter
  getBeverages: (lang = 'ru') => api.get('/menu/beverages/', { params: { lang } }),
  
  // Get specific menu item by ID with optional language parameter
  getMenuItem: (id, lang = 'ru') => api.get(`/menu/items/${id}/`, { params: { lang } }),
  
  // Get specific beverage by ID with optional language parameter
  getBeverage: (id, lang = 'ru') => api.get(`/menu/beverages/${id}/`, { params: { lang } }),
  
  // Get menu categories with translations
  getMenuCategories: (lang = 'ru') => api.get('/menu/items/categories/', { params: { lang } }),
  
  // Get beverage categories with translations
  getBeverageCategories: (lang = 'ru') => api.get('/menu/beverages/categories/', { params: { lang } }),
};

// Public Branches API endpoints
export const branchesAPI = {
  // Get all branches
  getBranches: () => api.get('/branches/branches/'),
  
  // Get specific branch by ID
  getBranch: (id) => api.get(`/branches/branches/${id}/`),
  
  // Get all reviews
  getBranchReviews: () => api.get('/branches/reviews/'),
  
  // Get reviews for specific branch
  getBranchReviewsByBranch: (branchId) => api.get(`/branches/reviews/?branch=${branchId}`),
  
  // Submit a review for a specific branch
  submitReview: (reviewData) => api.post('/branches/reviews/', reviewData),
  
  // Submit a review directly to a branch (alternative endpoint)
  submitBranchReview: (branchId, reviewData) => api.post(`/branches/branches/${branchId}/submit_review/`, reviewData),
};

// Django media URL helper function
export const getMediaUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  // Remove '/api' from the end of the URL to get the base server URL
  const mediaBaseUrl = baseUrl.endsWith('/api') ? baseUrl.slice(0, -4) : baseUrl;
  
  // Handle Django media URLs properly
  if (imagePath.startsWith('/media/')) {
    return `${mediaBaseUrl}${imagePath}`;
  } else if (imagePath.startsWith('media/')) {
    return `${mediaBaseUrl}/${imagePath}`;
  } else if (imagePath.startsWith('/')) {
    return `${mediaBaseUrl}${imagePath}`;
  } else {
    return `${mediaBaseUrl}/media/${imagePath}`;
  }
};

// Helper function to handle API errors gracefully for public API
export const handleApiError = (error, fallbackMessage = 'Something went wrong') => {
  // Handle Django API error responses first
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  } else if (error.response?.data?.message) {
    return error.response.data.message;
  } else if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  // Handle timeout errors
  if (error.code === 'ECONNABORTED') {
    return 'The request took too long to complete. Please try again.';
  }
  
  // Handle HTTP status errors for public API
  if (error.response?.status === 404) {
    return 'The requested information could not be found.';
  } else if (error.response?.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  } else if (error.response?.status >= 500) {
    return 'Our servers are experiencing issues. Please try again in a few minutes.';
  } else if (error.response?.status === 400) {
    return 'There was an issue with your request. Please try again.';
  }
  
  // Handle network errors
  if (error.code === 'NETWORK_ERROR') {
    return 'Unable to connect to our servers. Please check your internet connection and try again.';
  }
  
  // Handle error message
  if (error.message) {
    return error.message;
  }
  
  // Handle empty error objects (no response, no message, no code)
  if (!error.response && !error.message && !error.code) {
    return fallbackMessage;
  }
  
  return fallbackMessage;
};

// Helper function to check if API is available
export const checkApiHealth = async () => {
  try {
    const response = await api.get('/menu/items/', { timeout: 5000 });
    return { available: true, status: response.status };
  } catch (error) {
    return { 
      available: false, 
      error: error.message,
      status: error.response?.status || 'NETWORK_ERROR'
    };
  }
};

export default api;