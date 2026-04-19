/**
 * Input validation and sanitization utilities
 * Provides comprehensive validation for all user inputs
 */

// XSS protection - sanitize HTML content
export const sanitizeHtml = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// SQL injection protection - sanitize database inputs
export const sanitizeDbInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/['";\\]/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .trim();
};

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const sanitized = sanitizeHtml(email);
  
  return {
    isValid: emailRegex.test(sanitized) && sanitized.length <= 254,
    sanitized,
    errors: []
  };
};

// Phone number validation
export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
  const sanitized = sanitizeHtml(phone);
  
  return {
    isValid: phoneRegex.test(sanitized),
    sanitized,
    errors: sanitized.length > 15 ? ['Phone number too long'] : []
  };
};

// Name validation
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s\-']{1,50}$/;
  const sanitized = sanitizeHtml(name);
  
  return {
    isValid: nameRegex.test(sanitized) && sanitized.length >= 1,
    sanitized,
    errors: sanitized.length > 50 ? ['Name too long'] : []
  };
};

// Address validation
export const validateAddress = (address) => {
  const sanitized = sanitizeHtml(address);
  
  return {
    isValid: sanitized.length >= 5 && sanitized.length <= 200,
    sanitized,
    errors: sanitized.length < 5 ? ['Address too short'] : 
            sanitized.length > 200 ? ['Address too long'] : []
  };
};



// Generic text validation
export const validateText = (text, minLength = 1, maxLength = 1000) => {
  const sanitized = sanitizeHtml(text);
  const errors = [];
  
  if (sanitized.length < minLength) errors.push(`Text must be at least ${minLength} characters`);
  if (sanitized.length > maxLength) errors.push(`Text must be less than ${maxLength} characters`);
  
  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  };
};

// Number validation
export const validateNumber = (value, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const num = parseFloat(value);
  const errors = [];
  
  if (isNaN(num)) errors.push('Must be a valid number');
  if (num < min) errors.push(`Must be at least ${min}`);
  if (num > max) errors.push(`Must be at most ${max}`);
  
  return {
    isValid: errors.length === 0,
    sanitized: num,
    errors
  };
};

// Validate form data object
export const validateFormData = (data, schema) => {
  const results = {};
  const errors = {};
  let isValid = true;
  
  Object.keys(schema).forEach(field => {
    const validator = schema[field];
    const value = data[field];
    
    if (validator.required && (!value || value.toString().trim() === '')) {
      errors[field] = ['This field is required'];
      isValid = false;
      return;
    }
    
    if (value && validator.validate) {
      const result = validator.validate(value);
      results[field] = result.sanitized;
      
      if (!result.isValid) {
        errors[field] = result.errors;
        isValid = false;
      }
    } else {
      results[field] = value;
    }
  });
  
  return {
    isValid,
    data: results,
    errors
  };
};

// Common validation schemas
export const validationSchemas = {
  contact: {
    name: { required: true, validate: validateName },
    email: { required: true, validate: validateEmail },
    phone: { required: false, validate: validatePhone },
    message: { required: true, validate: (text) => validateText(text, 10, 1000) }
  },
  address: {
    street: { required: true, validate: validateAddress },
    city: { required: true, validate: (city) => validateText(city, 2, 50) },
    zipCode: { required: true, validate: (zip) => validateText(zip, 3, 10) }
  }
};