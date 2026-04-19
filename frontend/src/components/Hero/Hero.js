import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import { useResponsive } from '../../hooks/useResponsive';
import ResponsiveContainer from '../ResponsiveContainer/ResponsiveContainer';
import {
  HeroContainer,
  HeroContent,
  HeroText,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  HeroButtons,
  PrimaryButton,
  HeroImage,
  FloatingElements,
  FloatingElement
} from './Hero.styles';

const Hero = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  return (
    <HeroContainer>
      <ResponsiveContainer>
        <HeroContent>
        <HeroText>
          <HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
          <HeroTitle>{t('hero.title')}</HeroTitle>
          <HeroDescription>{t('hero.description')}</HeroDescription>
          
          <HeroButtons>
            <PrimaryButton as={Link} to="/menu">
              {t('hero.cta')}
              <FiArrowRight />
            </PrimaryButton>
          </HeroButtons>
        </HeroText>

        <HeroImage>
          <img 
            src="/images/cafe-interior.jpg" 
            alt="Bon Cafe Interior"
            loading="lazy"
          />
          
          {/* Only show floating elements on desktop for performance */}
          {!isMobile && (
            <FloatingElements>
              <FloatingElement style={{ top: '10%', right: '10%' }}>
                ☕
              </FloatingElement>
              <FloatingElement style={{ top: '60%', right: '80%' }}>
                🥐
              </FloatingElement>
              <FloatingElement style={{ bottom: '20%', right: '20%' }}>
                ✨
              </FloatingElement>
            </FloatingElements>
          )}
        </HeroImage>
        </HeroContent>
      </ResponsiveContainer>
    </HeroContainer>
  );
};

export default Hero;