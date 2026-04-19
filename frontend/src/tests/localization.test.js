import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';
import { theme } from '../styles/theme';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import { useLocalization } from '../hooks/useLocalization';

// Test wrapper component
const TestWrapper = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </I18nextProvider>
);

// Test component that uses localization hook
const TestComponent = () => {
  const { 
    t, 
    currentLanguage, 
    formatCurrency, 
    getCategoryName, 
    getErrorMessage 
  } = useLocalization();

  return (
    <div>
      <div data-testid="current-language">{currentLanguage}</div>
      <div data-testid="nav-home">{t('nav.home')}</div>
      <div data-testid="hero-title">{t('hero.title')}</div>
      <div data-testid="formatted-price">{formatCurrency(25000)}</div>
      <div data-testid="category-coffee">{getCategoryName('coffee')}</div>
      <div data-testid="error-network">{getErrorMessage('network')}</div>
    </div>
  );
};

describe('Localization System', () => {
  beforeEach(() => {
    // Reset to default language before each test
    i18n.changeLanguage('ru');
  });

  describe('Language Switching', () => {
    test('should render language switcher with current language', () => {
      render(
        <TestWrapper>
          <LanguageSwitcher />
        </TestWrapper>
      );

      expect(screen.getByText('Russian')).toBeInTheDocument();
    });

    test('should show language options when clicked', async () => {
      render(
        <TestWrapper>
          <LanguageSwitcher />
        </TestWrapper>
      );

      const switcher = screen.getByRole('button');
      fireEvent.click(switcher);

      await waitFor(() => {
        expect(screen.getByText('English')).toBeInTheDocument();
        expect(screen.getByText('Русский')).toBeInTheDocument();
        expect(screen.getByText("O'zbek")).toBeInTheDocument();
      });
    });

    test('should change language when option is selected', async () => {
      render(
        <TestWrapper>
          <LanguageSwitcher />
          <TestComponent />
        </TestWrapper>
      );

      // Open language switcher
      const switcher = screen.getByRole('button');
      fireEvent.click(switcher);

      // Click English option
      await waitFor(() => {
        const englishOption = screen.getByText('English');
        fireEvent.click(englishOption);
      });

      // Check if language changed
      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('en');
        expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
      });
    });
  });

  describe('Translation Keys', () => {
    test('should translate navigation items correctly', () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('nav-home')).toHaveTextContent('Главная');
      expect(screen.getByTestId('hero-title')).toHaveTextContent('Добро пожаловать в Bon Cafe');
    });

    test('should translate to English correctly', async () => {
      await i18n.changeLanguage('en');
      
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
      expect(screen.getByTestId('hero-title')).toHaveTextContent('Welcome to Bon Cafe');
    });

    test('should translate to Uzbek correctly', async () => {
      await i18n.changeLanguage('uz');
      
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('nav-home')).toHaveTextContent('Bosh sahifa');
      expect(screen.getByTestId('hero-title')).toHaveTextContent("Bon Cafe'ga xush kelibsiz");
    });
  });

  describe('Localization Hook Utilities', () => {
    test('should format currency correctly', () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      const formattedPrice = screen.getByTestId('formatted-price');
      expect(formattedPrice).toHaveTextContent('25,000'); // Russian locale formatting
    });

    test('should get category names correctly', () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('category-coffee')).toHaveTextContent('Кофе');
    });

    test('should get error messages correctly', () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('error-network')).toHaveTextContent('Ошибка сети');
    });
  });

  describe('Language Persistence', () => {
    test('should persist language selection in localStorage', async () => {
      render(
        <TestWrapper>
          <LanguageSwitcher />
        </TestWrapper>
      );

      // Change to English
      const switcher = screen.getByRole('button');
      fireEvent.click(switcher);

      await waitFor(() => {
        const englishOption = screen.getByText('English');
        fireEvent.click(englishOption);
      });

      // Check localStorage
      expect(localStorage.getItem('i18nextLng')).toBe('en');
    });
  });

  describe('Compact Language Switcher', () => {
    test('should render compact variant correctly', () => {
      render(
        <TestWrapper>
          <LanguageSwitcher variant="compact" />
        </TestWrapper>
      );

      expect(screen.getByText('RU')).toBeInTheDocument();
    });

    test('should render icon-only variant correctly', () => {
      render(
        <TestWrapper>
          <LanguageSwitcher variant="icon-only" />
        </TestWrapper>
      );

      // Should have globe icon
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Missing Translation Fallbacks', () => {
    test('should handle missing translation keys gracefully', () => {
      const TestMissingKey = () => {
        const { t } = useLocalization();
        return <div data-testid="missing-key">{t('nonexistent.key', 'Fallback text')}</div>;
      };

      render(
        <TestWrapper>
          <TestMissingKey />
        </TestWrapper>
      );

      expect(screen.getByTestId('missing-key')).toHaveTextContent('Fallback text');
    });
  });
});

// Integration test for full app localization
describe('Full App Localization Integration', () => {
  test('should maintain language consistency across components', async () => {
    const MultiComponentTest = () => {
      const { t } = useLocalization();
      return (
        <div>
          <div data-testid="nav-menu">{t('nav.menu')}</div>
          <div data-testid="hero-cta">{t('hero.cta')}</div>
          <div data-testid="menu-title">{t('menu.title')}</div>
          <div data-testid="footer-copyright">{t('footer.copyright')}</div>
        </div>
      );
    };

    render(
      <TestWrapper>
        <LanguageSwitcher />
        <MultiComponentTest />
      </TestWrapper>
    );

    // Initially in Russian
    expect(screen.getByTestId('nav-menu')).toHaveTextContent('Меню');
    expect(screen.getByTestId('hero-cta')).toHaveTextContent('Посмотреть меню');

    // Switch to English
    const switcher = screen.getByRole('button');
    fireEvent.click(switcher);

    await waitFor(() => {
      const englishOption = screen.getByText('English');
      fireEvent.click(englishOption);
    });

    // Check all components updated
    await waitFor(() => {
      expect(screen.getByTestId('nav-menu')).toHaveTextContent('Menu');
      expect(screen.getByTestId('hero-cta')).toHaveTextContent('Explore Menu');
      expect(screen.getByTestId('menu-title')).toHaveTextContent('Our Menu');
    });
  });
});