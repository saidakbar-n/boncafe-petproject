import {
  handlePublicApiError,
  retryApiCall,
  safeApiCall,
  isRecoverableError,
  getDisplayErrorMessage,
  getRecoveryActions
} from '../publicApiErrorHandler';
import { ERROR_TYPES } from '../errorTypes';

describe('publicApiErrorHandler', () => {
  // Suppress console.error in tests
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    console.log.mockRestore();
  });

  describe('handlePublicApiError', () => {
    it('should handle network errors', () => {
      const error = {
        code: 'NETWORK_ERROR',
        message: 'Network Error'
      };

      const result = handlePublicApiError(error, { context: 'menu' });

      expect(result.type).toBe(ERROR_TYPES.NETWORK_ERROR);
      expect(result.message).toBe('Unable to load our menu. Please check your connection and try again.');
      expect(result.retryable).toBe(true);
    });

    it('should handle server errors with context', () => {
      const error = {
        response: {
          status: 500
        },
        message: 'Internal Server Error'
      };

      const result = handlePublicApiError(error, { context: 'branches' });

      expect(result.type).toBe(ERROR_TYPES.SERVER_ERROR);
      expect(result.message).toBe('Our branch information service is temporarily unavailable. Please try again in a few minutes.');
      expect(result.severity).toBe('high');
    });

    it('should handle timeout errors', () => {
      const error = {
        code: 'ECONNABORTED',
        message: 'timeout of 10000ms exceeded'
      };

      const result = handlePublicApiError(error);

      expect(result.type).toBe(ERROR_TYPES.CONNECTION_TIMEOUT);
      expect(result.retryable).toBe(true);
    });

    it('should use user message from error if available', () => {
      const error = {
        userMessage: 'Custom user message',
        response: {
          status: 404
        }
      };

      const result = handlePublicApiError(error);

      expect(result.message).toBe('Custom user message');
    });

    it('should provide recovery options', () => {
      const error = {
        response: {
          status: 500
        }
      };

      const result = handlePublicApiError(error);

      expect(result.recoveryOptions).toBeDefined();
      expect(Array.isArray(result.recoveryOptions)).toBe(true);
      expect(result.recoveryOptions.length).toBeGreaterThan(0);
    });
  });

  describe('retryApiCall', () => {
    it('should succeed on first try', async () => {
      const mockApiCall = jest.fn().mockResolvedValue({ data: 'success' });

      const result = await retryApiCall(mockApiCall);

      expect(result).toEqual({ data: 'success' });
      expect(mockApiCall).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure and eventually succeed', async () => {
      const mockApiCall = jest.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue({ data: 'success' });

      const result = await retryApiCall(mockApiCall, { maxRetries: 2, baseDelay: 10 });

      expect(result).toEqual({ data: 'success' });
      expect(mockApiCall).toHaveBeenCalledTimes(2);
    });

    it('should not retry on 404 errors', async () => {
      const error = new Error('Not found');
      error.response = { status: 404 };
      const mockApiCall = jest.fn().mockRejectedValue(error);

      await expect(retryApiCall(mockApiCall)).rejects.toThrow('Not found');
      expect(mockApiCall).toHaveBeenCalledTimes(1);
    });

    it('should not retry on 400 errors', async () => {
      const error = new Error('Bad request');
      error.response = { status: 400 };
      const mockApiCall = jest.fn().mockRejectedValue(error);

      await expect(retryApiCall(mockApiCall)).rejects.toThrow('Bad request');
      expect(mockApiCall).toHaveBeenCalledTimes(1);
    });

    it('should call onRetry callback', async () => {
      const mockApiCall = jest.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue({ data: 'success' });
      const onRetry = jest.fn();

      await retryApiCall(mockApiCall, { maxRetries: 2, baseDelay: 10, onRetry });

      expect(onRetry).toHaveBeenCalledWith(1, 2, expect.any(Error));
    });
  });

  describe('safeApiCall', () => {
    it('should return success result', async () => {
      const mockApiCall = jest.fn().mockResolvedValue({ data: 'test data' });

      const result = await safeApiCall(mockApiCall);

      expect(result.success).toBe(true);
      expect(result.data).toBe('test data');
      expect(result.error).toBeNull();
    });

    it('should return error result', async () => {
      const error = new Error('API Error');
      error.response = { status: 500 };
      const mockApiCall = jest.fn().mockRejectedValue(error);

      const result = await safeApiCall(mockApiCall, { enableRetry: false });

      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.error).toBeDefined();
      expect(result.error.type).toBe(ERROR_TYPES.SERVER_ERROR);
    });

    it('should call onSuccess callback', async () => {
      const mockApiCall = jest.fn().mockResolvedValue({ data: 'test data' });
      const onSuccess = jest.fn();

      await safeApiCall(mockApiCall, { onSuccess });

      expect(onSuccess).toHaveBeenCalledWith({ data: 'test data' });
    });

    it('should call onError callback', async () => {
      const error = new Error('API Error');
      const mockApiCall = jest.fn().mockRejectedValue(error);
      const onError = jest.fn();

      await safeApiCall(mockApiCall, { enableRetry: false, onError });

      expect(onError).toHaveBeenCalledWith(expect.objectContaining({
        type: ERROR_TYPES.NETWORK_ERROR // Error without response is classified as network error
      }));
    });
  });

  describe('isRecoverableError', () => {
    it('should return true for retryable network errors', () => {
      const errorInfo = {
        type: ERROR_TYPES.NETWORK_ERROR,
        retryable: true
      };

      expect(isRecoverableError(errorInfo)).toBe(true);
    });

    it('should return false for validation errors', () => {
      const errorInfo = {
        type: ERROR_TYPES.VALIDATION_ERROR,
        retryable: true
      };

      expect(isRecoverableError(errorInfo)).toBe(false);
    });

    it('should return false for non-retryable errors', () => {
      const errorInfo = {
        type: ERROR_TYPES.NETWORK_ERROR,
        retryable: false
      };

      expect(isRecoverableError(errorInfo)).toBe(false);
    });
  });

  describe('getDisplayErrorMessage', () => {
    it('should return error message', () => {
      const errorInfo = {
        message: 'Test error message'
      };

      expect(getDisplayErrorMessage(errorInfo)).toBe('Test error message');
    });

    it('should return fallback message', () => {
      const errorInfo = {};

      expect(getDisplayErrorMessage(errorInfo)).toBe('Something went wrong. Please try again.');
    });
  });

  describe('getRecoveryActions', () => {
    it('should return recovery options from error info', () => {
      const errorInfo = {
        recoveryOptions: [
          { label: 'Try Again', action: 'retry' },
          { label: 'Go Home', action: 'go_home' }
        ]
      };

      const actions = getRecoveryActions(errorInfo);

      expect(actions).toEqual(errorInfo.recoveryOptions);
    });

    it('should return default actions if none provided', () => {
      const errorInfo = {};

      const actions = getRecoveryActions(errorInfo);

      expect(actions).toEqual([
        { label: 'Try Again', action: 'retry' },
        { label: 'Go Home', action: 'go_home' }
      ]);
    });
  });
});