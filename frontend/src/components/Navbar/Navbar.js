import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX } from 'react-icons/fi';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

import {
  NavbarContainer,
  NavbarContent,
  Logo,
  NavLinks,
  NavLink,
  MobileMenuButton,
  MobileMenu,
  DesktopLanguageSwitcher
} from './Navbar.styles';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavbarContainer isScrolled={isScrolled}>
      <NavbarContent>
        <Logo to="/" onClick={closeMobileMenu}>
          Bon Café
        </Logo>

        <NavLinks>
          <NavLink 
            to="/" 
            isActive={location.pathname === '/'}
          >
            {t('nav.home')}
          </NavLink>
          <NavLink 
            to="/menu" 
            isActive={location.pathname === '/menu'}
          >
            {t('nav.menu')}
          </NavLink>
          <NavLink 
            to="/branches" 
            isActive={location.pathname === '/branches'}
          >
            {t('nav.branches')}
          </NavLink>
          <NavLink 
            to="/about" 
            isActive={location.pathname === '/about'}
          >
            {t('nav.about')}
          </NavLink>
          <NavLink 
            to="/contact" 
            isActive={location.pathname === '/contact'}
          >
            {t('nav.contact')}
          </NavLink>
        </NavLinks>

        {/* Hide language switcher on mobile when burger menu is visible */}
        <DesktopLanguageSwitcher>
          <LanguageSwitcher variant="compact" />
        </DesktopLanguageSwitcher>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </NavbarContent>

      <MobileMenu isOpen={isOpen}>
        <Link to="/" onClick={closeMobileMenu}>
          {t('nav.home')}
        </Link>
        <Link to="/menu" onClick={closeMobileMenu}>
          {t('nav.menu')}
        </Link>
        <Link to="/branches" onClick={closeMobileMenu}>
          {t('nav.branches')}
        </Link>
        <Link to="/about" onClick={closeMobileMenu}>
          {t('nav.about')}
        </Link>
        <Link to="/contact" onClick={closeMobileMenu}>
          {t('nav.contact')}
        </Link>
        
        {/* Language switcher in mobile menu for better UX */}
        <div style={{ 
          padding: '1rem 0.75rem', 
          borderTop: '1px solid rgba(139, 69, 19, 0.1)', 
          marginTop: '0.5rem' 
        }}>
          <LanguageSwitcher variant="default" showNativeNames={true} />
        </div>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;