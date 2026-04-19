import { menuAPI, branchesAPI, getMediaUrl, handleApiError, checkApiHealth } from '../api';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }))
}));

describe('API Service', () => {
  describe('getMediaUrl', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it('should return null for empty image path', () => {
      expect(getMediaUrl('')).toBeNull();
      expect(getMediaUrl(null)).toBeNull();
      expect(getMediaUrl(undefined)).toBeNull();
    });

    it('should return the same URL if it starts with http', () => {
      const httpUrl = 'http://example.com/image.jpg';
      const httpsUrl = 'https://example.com/image.jpg';
      
      expect(getMediaUrl(httpUrl)).toBe(httpUrl);
      expect(getMediaUrl(httpsUrl)).toBe(httpsUrl);
    });

    it('should construct proper media URL with default base URL', () => {
      const imagePath = '/media/menu_photos/image.jpg';
      const expected = 'http://localhost:8000/media/menu_photos/image.jpg';
      
      expect(getMediaUrl(imagePath)).toBe(expected);
    });

    it('should construct proper media URL with custom base URL', () => {
      process.env.REACT_APP_API_URL = 'https://api.boncafe.uz/api';
      const imagePath = '/media/menu_photos/image.jpg';
      const expected = 'https://api.boncafe.uz/media/menu_photos/image.jpg';
      
      expect(getMediaUrl(imagePath)).toBe(expected);
    });

    it('should handle image path without leading slash', () => {
      const imagePath = 'media/menu_photos/image.jpg';
      const expected = 'http://localhost:8000/media/menu_photos/image.jpg';
      
      expect(getMediaUrl(imagePath)).toBe(expected);
    });
  });

  describe('handleApiError', () => {
    it('should return user-friendly message for network errors', () => {
      const error = {
        code: 'NETWORK_ERROR'
      };
      
      expect(handleApiError(error)).toBe('Unable to connect to our servers. Please check your internet connection and try again.');
    });

    it('should return user-friendly message for timeout errors', () => {
      const error = {
        code: 'ECONNABORTED'
      };
      
      expect(handleApiError(error)).toBe('The request took too long to complete. Please try again.');
    });

    it('should return user-friendly message for 404 errors', () => {
      const error = {
        response: {
          status: 404
        }
      };
      
      expect(handleApiError(error)).toBe('The requested information could not be found.');
    });

    it('should return user-friendly message for server errors', () => {
      const error = {
        response: {
          status: 500
        }
      };
      
      expect(handleApiError(error)).toBe('Our servers are experiencing issues. Please try again in a few minutes.');
    });

    it('should return user-friendly message for rate limiting', () => {
      const error = {
        response: {
          status: 429
        }
      };
      
      expect(handleApiError(error)).toBe('Too many requests. Please wait a moment and try again.');
    });

    it('should return detail from response data', () => {
      const error = {
        response: {
          data: {
            detail: 'Not found'
          }
        }
      };
      
      expect(handleApiError(error)).toBe('Not found');
    });

    it('should return message from response data', () => {
      const error = {
        response: {
          data: {
            message: 'Server error'
          }
        }
      };
      
      expect(handleApiError(error)).toBe('Server error');
    });

    it('should return error message when no response', () => {
      const error = {
        message: 'Network error'
      };
      
      expect(handleApiError(error)).toBe('Network error');
    });

    it('should return fallback message for empty error', () => {
      const error = {};
      
      expect(handleApiError(error)).toBe('Something went wrong');
      expect(handleApiError(error, 'Custom fallback')).toBe('Custom fallback');
    });
  });

  describe('API endpoints', () => {
    it('should have correct menu API endpoints', () => {
      expect(menuAPI.getMenuItems).toBeDefined();
      expect(menuAPI.getBeverages).toBeDefined();
      expect(menuAPI.getMenuItem).toBeDefined();
      expect(menuAPI.getBeverage).toBeDefined();
    });

    it('should have correct branches API endpoints', () => {
      expect(branchesAPI.getBranches).toBeDefined();
      expect(branchesAPI.getBranch).toBeDefined();
      expect(branchesAPI.getBranchReviews).toBeDefined();
      expect(branchesAPI.getBranchReviewsByBranch).toBeDefined();
    });
  });

  describe('checkApiHealth', () => {
    it('should be defined and callable', () => {
      expect(checkApiHealth).toBeDefined();
      expect(typeof checkApiHealth).toBe('function');
    });
  });
});