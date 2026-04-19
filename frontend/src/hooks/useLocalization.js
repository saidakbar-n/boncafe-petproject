import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

/**
 * Enhanced localization hook with utility functions
 */
export const useLocalization = () => {
  const { t, i18n } = useTranslation();

  // Get current language
  const currentLanguage = i18n.language || 'ru';

  // Available languages
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'uz', name: 'Uzbek', nativeName: "O'zbek", flag: '🇺🇿' }
  ];

  // Change language
  const changeLanguage = useCallback((langCode) => {
    i18n.changeLanguage(langCode);
  }, [i18n]);

  // Get current language info
  const getCurrentLanguage = useCallback(() => {
    return languages.find(lang => lang.code === currentLanguage) || languages[1]; // Default to Russian
  }, [currentLanguage]);

  // Format currency based on language
  const formatCurrency = useCallback((amount, currency = 'UZS') => {
    if (!amount) return t('menu.priceOnRequest');
    
    const locale = {
      'en': 'en-US',
      'ru': 'ru-RU', 
      'uz': 'uz-UZ'
    }[currentLanguage] || 'uz-UZ';

    return new Intl.NumberFormat(locale).format(amount);
  }, [currentLanguage, t]);

  // Format date based on language
  const formatDate = useCallback((date, options = {}) => {
    const locale = {
      'en': 'en-US',
      'ru': 'ru-RU',
      'uz': 'uz-UZ'
    }[currentLanguage] || 'uz-UZ';

    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  }, [currentLanguage]);

  // Get text direction (for future RTL support if needed)
  const getTextDirection = useCallback(() => {
    return 'ltr'; // All current languages are LTR
  }, []);

  // Get localized category name
  const getCategoryName = useCallback((categoryKey) => {
    const categoryMap = {
      // Food categories
      'new': t('menu.categories.new'),
      'breakfast': t('menu.categories.breakfast'),
      'omelette': t('menu.categories.omelette'),
      'crepes_quiches': t('menu.categories.crepes_quiches'),
      'sweet_crepes': t('menu.categories.sweet_crepes'),
      'soups': t('menu.categories.soups'),
      'salads': t('menu.categories.salads'),
      'sandwiches': t('menu.categories.sandwiches'),
      'main_courses': t('menu.categories.main_courses'),
      'other': t('menu.categories.other'),
      'appetizers': t('menu.categories.appetizers'),
      'desserts': t('menu.categories.desserts'),
      
      // Beverage categories
      'coffee': t('menu.categories.coffee'),
      'new_drinks': t('menu.categories.new_drinks'),
      'iced_coffee': t('menu.categories.iced_coffee'),
      'cold_drinks': t('menu.categories.cold_drinks'),
      'decaf': t('menu.categories.decaf'),
      'fresh_juices': t('menu.categories.fresh_juices'),
      'tea': t('menu.categories.tea'),
      'not_coffee': t('menu.categories.not_coffee'),
      'hot_drinks': t('menu.categories.hotDrinks'),
      'juices': t('menu.categories.juices')
    };
    return categoryMap[categoryKey] || categoryKey;
  }, [t]);

  // Get localized day name
  const getDayName = useCallback((dayKey) => {
    const dayMap = {
      'monday': t('contact.monday'),
      'tuesday': t('contact.tuesday'),
      'wednesday': t('contact.wednesday'),
      'thursday': t('contact.thursday'),
      'friday': t('contact.friday'),
      'saturday': t('contact.saturday'),
      'sunday': t('contact.sunday')
    };
    return dayMap[dayKey] || dayKey;
  }, [t]);

  // Get localized error message
  const getErrorMessage = useCallback((errorType) => {
    const errorMap = {
      'network': t('errors.network'),
      'notFound': t('errors.notFound'),
      'serverError': t('errors.serverError'),
      'timeout': t('errors.timeout'),
      'unauthorized': t('errors.unauthorized'),
      'forbidden': t('errors.forbidden'),
      'validation': t('errors.validation'),
      'general': t('errors.general')
    };
    return errorMap[errorType] || t('errors.general');
  }, [t]);

  // Get localized loading message
  const getLoadingMessage = useCallback((context = 'default') => {
    const loadingMap = {
      'default': t('loading.default'),
      'menu': t('loading.menu'),
      'branches': t('loading.branches'),
      'testimonials': t('loading.testimonials')
    };
    return loadingMap[context] || t('loading.default');
  }, [t]);

  // Get localized notification type
  const getNotificationType = useCallback((type) => {
    const typeMap = {
      'success': t('notifications.success'),
      'error': t('notifications.error'),
      'warning': t('notifications.warning'),
      'info': t('notifications.info')
    };
    return typeMap[type] || type;
  }, [t]);

  // Check if current language is RTL (for future use)
  const isRTL = useCallback(() => {
    return false; // None of our current languages are RTL
  }, []);

  return {
    // Core translation functions
    t,
    i18n,
    
    // Language management
    currentLanguage,
    languages,
    changeLanguage,
    getCurrentLanguage,
    
    // Formatting utilities
    formatCurrency,
    formatDate,
    getTextDirection,
    isRTL,
    
    // Localized content getters
    getCategoryName,
    getDayName,
    getErrorMessage,
    getLoadingMessage,
    getNotificationType
  };
};

export default useLocalization;