# Localization System Documentation

## Overview

The Bon Cafe application features a comprehensive localization system supporting three languages:
- **English (en)** - International audience
- **Russian (ru)** - Primary language for the region
- **Uzbek (uz)** - Local language

## Architecture

### Core Components

1. **i18next Configuration** (`src/i18n/config.js`)
   - Main internationalization setup
   - Language detection and persistence
   - Resource loading and fallback handling

2. **Translation Files** (`src/i18n/locales/`)
   - `en.json` - English translations
   - `ru.json` - Russian translations  
   - `uz.json` - Uzbek translations

3. **Localization Hook** (`src/hooks/useLocalization.js`)
   - Enhanced translation utilities
   - Currency and date formatting
   - Category name mapping
   - Error message handling

4. **Language Switcher Component** (`src/components/LanguageSwitcher/`)
   - Multiple display variants
   - Accessible dropdown interface
   - Smooth animations and transitions

## Usage

### Basic Translation

```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>{t('hero.description')}</p>
    </div>
  );
};
```

### Enhanced Localization Hook

```jsx
import { useLocalization } from '../hooks/useLocalization';

const MyComponent = () => {
  const { 
    t, 
    formatCurrency, 
    getCategoryName, 
    currentLanguage 
  } = useLocalization();
  
  return (
    <div>
      <h1>{t('menu.title')}</h1>
      <p>Price: {formatCurrency(25000)}</p>
      <p>Category: {getCategoryName('coffee')}</p>
      <p>Current: {currentLanguage}</p>
    </div>
  );
};
```

### Language Switcher

```jsx
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';

// Default dropdown variant
<LanguageSwitcher />

// Compact variant (flag + code)
<LanguageSwitcher variant="compact" />

// Icon-only variant
<LanguageSwitcher variant="icon-only" />

// Without native names
<LanguageSwitcher showNativeNames={false} />
```

## Translation Structure

### Hierarchical Organization

```json
{
  "nav": {
    "home": "Home",
    "menu": "Menu",
    "about": "About"
  },
  "hero": {
    "title": "Welcome to Bon Cafe",
    "subtitle": "Where every cup tells a story"
  },
  "menu": {
    "title": "Our Menu",
    "categories": {
      "coffee": "Coffee",
      "tea": "Tea"
    },
    "nutrition": {
      "calories": "Calories",
      "protein": "Protein"
    }
  }
}
```

### Key Categories

1. **Navigation** (`nav.*`)
   - Main menu items
   - Page titles

2. **Hero Section** (`hero.*`)
   - Main headlines
   - Call-to-action buttons

3. **Menu** (`menu.*`)
   - Food and beverage categories
   - Nutrition information
   - Filters and sorting

4. **Common Elements** (`common.*`)
   - Buttons and actions
   - Loading states
   - Error messages

5. **Forms** (`contact.*`, `footer.*`)
   - Form labels
   - Validation messages

## Language-Specific Features

### Currency Formatting

```jsx
const { formatCurrency } = useLocalization();

// Automatically formats based on current language
formatCurrency(25000); // "25,000" (Russian locale)
```

### Date Formatting

```jsx
const { formatDate } = useLocalization();

formatDate(new Date(), { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});
```

### Category Names

```jsx
const { getCategoryName } = useLocalization();

getCategoryName('coffee'); // "Кофе" (Russian)
getCategoryName('tea');    // "Чай" (Russian)
```

## Adding New Translations

### 1. Add to Translation Files

Add the new key to all three language files:

**en.json**
```json
{
  "newSection": {
    "newKey": "English text"
  }
}
```

**ru.json**
```json
{
  "newSection": {
    "newKey": "Русский текст"
  }
}
```

**uz.json**
```json
{
  "newSection": {
    "newKey": "O'zbek matni"
  }
}
```

### 2. Use in Components

```jsx
const { t } = useTranslation();
return <div>{t('newSection.newKey')}</div>;
```

### 3. Add to Localization Hook (if needed)

For specialized formatting or mapping:

```jsx
// In useLocalization.js
const getNewMapping = useCallback((key) => {
  const mappings = {
    'key1': t('newSection.key1'),
    'key2': t('newSection.key2')
  };
  return mappings[key] || key;
}, [t]);
```

## Best Practices

### 1. Consistent Key Naming

- Use dot notation for hierarchy: `section.subsection.key`
- Use camelCase for multi-word keys: `errorMessage`, `submitButton`
- Group related translations: `menu.categories.*`, `errors.*`

### 2. Fallback Values

Always provide fallback text:

```jsx
t('menu.title', 'Our Menu') // Fallback to 'Our Menu' if key missing
```

### 3. Pluralization

Use i18next pluralization features:

```json
{
  "item": "item",
  "item_plural": "items"
}
```

```jsx
t('item', { count: 5 }) // "5 items"
```

### 4. Interpolation

Use variables in translations:

```json
{
  "welcome": "Welcome, {{name}}!"
}
```

```jsx
t('welcome', { name: 'John' }) // "Welcome, John!"
```

### 5. Context-Aware Translations

Use different translations based on context:

```json
{
  "button": "Submit",
  "button_loading": "Submitting..."
}
```

## Testing

### Unit Tests

```jsx
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';

test('should display translated text', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <MyComponent />
    </I18nextProvider>
  );
  
  expect(screen.getByText('Главная')).toBeInTheDocument();
});
```

### Language Switching Tests

```jsx
test('should change language', async () => {
  await i18n.changeLanguage('en');
  // Test English content
  
  await i18n.changeLanguage('uz');
  // Test Uzbek content
});
```

## Performance Considerations

### 1. Lazy Loading

Translation files are loaded on demand to reduce initial bundle size.

### 2. Memoization

The localization hook uses `useCallback` to prevent unnecessary re-renders.

### 3. Caching

Language preferences are cached in localStorage for persistence.

## Accessibility

### 1. Language Attributes

The system automatically sets the `lang` attribute on the document:

```html
<html lang="ru">
```

### 2. Screen Reader Support

Language switcher includes proper ARIA labels:

```jsx
<button aria-label="Select language">
```

### 3. Keyboard Navigation

Full keyboard support for language switcher dropdown.

## Troubleshooting

### Common Issues

1. **Missing Translations**
   - Check all three language files have the key
   - Verify key spelling and hierarchy
   - Use fallback values

2. **Language Not Persisting**
   - Check localStorage permissions
   - Verify i18next configuration
   - Clear browser cache

3. **Formatting Issues**
   - Check locale settings in formatters
   - Verify number/date format expectations
   - Test with different languages

### Debug Mode

Enable debug mode in development:

```js
// In i18n/config.js
i18n.init({
  debug: process.env.NODE_ENV === 'development'
});
```

## Future Enhancements

### Planned Features

1. **RTL Support** - For Arabic/Hebrew languages
2. **Dynamic Loading** - Load translations from API
3. **Translation Management** - Admin interface for translations
4. **Automatic Detection** - Browser/location-based language detection
5. **Voice Support** - Text-to-speech in multiple languages

### Adding New Languages

To add a new language:

1. Create new translation file: `src/i18n/locales/[code].json`
2. Add to languages array in `useLocalization.js`
3. Update i18n configuration
4. Add flag emoji and native name
5. Test all components with new language

## Resources

- [i18next Documentation](https://www.i18next.com/)
- [React i18next Guide](https://react.i18next.com/)
- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
- [Language Codes (ISO 639-1)](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)