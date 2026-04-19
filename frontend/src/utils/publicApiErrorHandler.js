// Public API Error Handler Utility
// Provides consistent error handling for the public cafe website

import { handleApiError } from '../services/api';
import { ERROR_TYPES, classifyHttpError, getErrorConfig } from './errorTypes';

/**
 * Enhanced error handler for public API calls
 * @param {Error} error - The error object from API call
 * @param {Object} options - Configuration options
 * @returns {Object} Processed error information
 */
export const handlePublicApiError = (error, options = {}) => {
  const {
    context = 'general',
    fallbackMessage = 'Something went wrong'
  } = options;

  // Get user-friendly error message
  const userMessage = error.userMessage || handleApiError(error, fallbackMessage);
  
  // Classify error type
  let errorType = ERROR_TYPES.UNKNOWN_ERROR;
  if (error.code === 'ECONNABORTED') {
    errorType = ERROR_TYPES.CONNECTION_TIMEOUT;
  } else if (error.code === 'NETWORK_ERROR' || !error.response) {
    errorType = ERROR_TYPES.NETWORK_ERROR;
  } else if (error.response?.status) {
    errorType = classifyHttpError(error.response.status, error.message);
  }

  const errorConfig = getErrorConfig(errorType);

  // Context-specific error messages
  const contextMessages = {
    menu: {
      [ERROR_TYPES.NETWORK_ERROR]: 'Unable to load our menu. Please check your connection and try again.',
      [ERROR_TYPES.SERVER_ERROR]: 'Our menu service is temporarily unavailable. Please try again in a few minutes.',
      [ERROR_TYPES.UNKNOWN_ERROR]: 'Unable to load menu items. Please refresh the page or try again later.'
    },
    branches: {
      [ERROR_TYPES.NETWORK_ERROR]: 'Unable to load branch information. Please check your connection and try again.',
      [ERROR_TYPES.SERVER_ERROR]: 'Our branch information service is temporarily unavailable. Please try again in a few minutes.',
      [ERROR_TYPES.UNKNOWN_ERROR]: 'Unable to load branch details. Please refresh the page or try again later.'
    },
    contact: {
      [ERROR_TYPES.NETWORK_ERROR]: 'Unable to send your message. Please check your connection and try again.',
      [ERROR_TYPES.SERVER_ERROR]: 'Our contact service is temporarily unavailable. Please try calling us directly.',
      [ERROR_TYPES.VALIDATION_ERROR]: 'Please check your message and contact information, then try again.'
    }
  };

  // Get context-specific message if available
  const contextMessage = contextMessages[context]?.[errorType];
  const finalMessage = contextMessage || userMessage;

  // Log error for debugging
  console.error(`Public API Error [${context}]:`, {
    type: errorType,
    status: error.response?.status,
    message: error.message,
    userMessage: finalMessage,
    url: error.config?.url
  });

  return {
    type: errorType,
    message: finalMessage,
    title: errorConfig.title,
    severity: errorConfig.severity,
    retryable: errorConfig.retryable,
    recoveryOptions: errorConfig.recoveryOptions,
    originalError: error
  };
};

/**
 * Retry mechanism for failed API calls
 * @param {Function} apiCall - The API function to retry
 * @param {Object} options - Retry configuration
 * @returns {Promise} The result of the API call
 */
export const retryApiCall = async (apiCall, options = {}) => {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    backoffMultiplier = 2,
    onRetry = null
  } = options;

  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      // Don't retry on certain error types
      if (error.response?.status === 404 || error.response?.status === 400) {
        throw error;
      }
      
      // Don't retry on last attempt
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(backoffMultiplier, attempt);
      const jitter = Math.random() * 0.1 * delay;
      const totalDelay = delay + jitter;
      
      console.log(`Retrying API call in ${Math.round(totalDelay)}ms (attempt ${attempt + 1}/${maxRetries})`);
      
      if (onRetry) {
        onRetry(attempt + 1, maxRetries, error);
      }
      
      await new Promise(resolve => setTimeout(resolve, totalDelay));
    }
  }
  
  throw lastError;
};

/**
 * Wrapper for API calls with built-in error handling and retry logic
 * @param {Function} apiCall - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Promise} The result with error handling
 */
export const safeApiCall = async (apiCall, options = {}) => {
  const {
    context = 'general',
    enableRetry = true,
    maxRetries = 2,
    onError = null,
    onSuccess = null
  } = options;

  try {
    let result;
    
    if (enableRetry) {
      result = await retryApiCall(apiCall, { maxRetries });
    } else {
      result = await apiCall();
    }
    
    if (onSuccess) {
      onSuccess(result);
    }
    
    return { success: true, data: result.data, error: null };
  } catch (error) {
    const errorInfo = handlePublicApiError(error, { context });
    
    if (onError) {
      onError(errorInfo);
    }
    
    return { success: false, data: null, error: errorInfo };
  }
};

/**
 * Check if an error is recoverable (user can retry)
 * @param {Object} errorInfo - Processed error information
 * @returns {boolean} Whether the error is recoverable
 */
export const isRecoverableError = (errorInfo) => {
  return errorInfo.retryable && errorInfo.type !== ERROR_TYPES.VALIDATION_ERROR;
};

/**
 * Get user-friendly error message for display
 * @param {Object} errorInfo - Processed error information
 * @returns {string} User-friendly error message
 */
export const getDisplayErrorMessage = (errorInfo) => {
  return errorInfo.message || 'Something went wrong. Please try again.';
};

/**
 * Get recovery actions for an error
 * @param {Object} errorInfo - Processed error information
 * @returns {Array} Array of recovery action objects
 */
export const getRecoveryActions = (errorInfo) => {
  return errorInfo.recoveryOptions || [
    { label: 'Try Again', action: 'retry' },
    { label: 'Go Home', action: 'go_home' }
  ];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  handlePublicApiError,
  retryApiCall,
  safeApiCall,
  isRecoverableError,
  getDisplayErrorMessage,
  getRecoveryActions
};