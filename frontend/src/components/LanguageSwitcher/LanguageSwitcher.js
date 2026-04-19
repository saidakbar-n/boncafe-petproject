import React, { useState, useEffect, useRef } from 'react';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import styled from 'styled-components';
import { useLocalization } from '../../hooks/useLocalization';

const SwitcherContainer = styled.div`
  position: relative;
  display: inline-block;
  
  @media (max-width: 768px) {
    order: -1;
    margin-right: 0.5rem;
  }
`;

const SwitcherButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.15s ease;
  min-width: 120px;
  justify-content: space-between;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  .chevron {
    transition: transform 0.15s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  z-index: 1000;
  overflow: hidden;
  min-width: 150px;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.15s ease;

  @media (max-width: 768px) {
    right: 0;
    left: auto;
    min-width: 140px;
  }
`;

const HorizontalDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  z-index: 1000;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-10px)'};
  transition: all 0.15s ease;
`;

const LanguageOption = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text};
  transition: background-color 0.15s ease;
  text-align: left;
  min-height: 48px;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
  }

  &.active {
    background-color: rgba(139, 69, 19, 0.1);
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeights.semibold};
  }

  .flag {
    font-size: 1.2em;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }

  .language-info {
    flex: 1;
    min-width: 0;
  }

  .language-name {
    display: block;
    font-weight: ${props => props.theme.fontWeights.medium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .native-name {
    display: block;
    font-size: ${props => props.theme.fontSizes.xs};
    color: ${props => props.theme.colors.textLight};
    margin-top: 0.125rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const HorizontalLanguageOption = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  background: none;
  border: none;
  border-right: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.text};
  transition: background-color 0.15s ease;
  min-height: 60px;
  min-width: 50px;
  text-align: center;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
  }

  &.active {
    background-color: rgba(139, 69, 19, 0.1);
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeights.semibold};
  }

  .flag {
    font-size: 1.5em;
    margin-bottom: 0.25rem;
  }

  .language-code {
    font-size: 0.7rem;
    font-weight: ${props => props.theme.fontWeights.semibold};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const CompactSwitcher = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text};
  transition: all 0.15s ease;
  min-height: 36px;

  &:hover {
    background-color: rgba(139, 69, 19, 0.1);
    border-color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.3);
  }

  .flag {
    font-size: 1em;
  }
`;

const LanguageSwitcher = ({ 
  variant = 'default',
  showNativeNames = true,
  horizontal = false,
  className = '',
  ...props 
}) => {
  const { currentLanguage, languages, changeLanguage, getCurrentLanguage } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const currentLang = getCurrentLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (variant === 'compact') {
    return (
      <SwitcherContainer ref={containerRef} className={className} {...props}>
        <CompactSwitcher onClick={toggleDropdown}>
          <span className="flag">{currentLang.flag}</span>
          <span>{currentLang.code.toUpperCase()}</span>
        </CompactSwitcher>

        <HorizontalDropdownMenu $isOpen={isOpen}>
          {languages.map((language) => (
            <HorizontalLanguageOption
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={currentLanguage === language.code ? 'active' : ''}
            >
              <span className="flag">{language.flag}</span>
              <span className="language-code">{language.code}</span>
            </HorizontalLanguageOption>
          ))}
        </HorizontalDropdownMenu>
      </SwitcherContainer>
    );
  }

  if (variant === 'icon-only') {
    return (
      <SwitcherContainer ref={containerRef} className={className} {...props}>
        <CompactSwitcher
          onClick={toggleDropdown}
          style={{ padding: '0.5rem', borderRadius: '50%' }}
        >
          <FiGlobe size={18} />
        </CompactSwitcher>

        <HorizontalDropdownMenu $isOpen={isOpen}>
          {languages.map((language) => (
            <HorizontalLanguageOption
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={currentLanguage === language.code ? 'active' : ''}
            >
              <span className="flag">{language.flag}</span>
              <span className="language-code">{language.code}</span>
            </HorizontalLanguageOption>
          ))}
        </HorizontalDropdownMenu>
      </SwitcherContainer>
    );
  }

  return (
    <SwitcherContainer ref={containerRef} className={className} {...props}>
      <SwitcherButton
        onClick={toggleDropdown}
        $isOpen={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="flag">{currentLang.flag}</span>
          <span>{currentLang.name}</span>
        </div>
        <FiChevronDown className="chevron" size={16} />
      </SwitcherButton>

      <DropdownMenu $isOpen={isOpen}>
        {languages.map((language) => (
          <LanguageOption
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={currentLanguage === language.code ? 'active' : ''}
          >
            <span className="flag">{language.flag}</span>
            <div className="language-info">
              <span className="language-name">{language.name}</span>
              {showNativeNames && (
                <span className="native-name">{language.nativeName}</span>
              )}
            </div>
          </LanguageOption>
        ))}
      </DropdownMenu>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;