import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FiInstagram, 
  FiTwitter, 
  FiFacebook, 
  FiMail, 
  FiPhone, 
  FiMapPin 
} from 'react-icons/fi';

import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterLogo,
  FooterDescription,
  FooterTitle,
  FooterLinks,
  FooterLink,
  SocialLinks,
  SocialLink,
  FooterBottom,
  Copyright
} from './Footer.styles';

const Footer = () => {
  const { t } = useTranslation();



  const socialLinks = [
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' }
  ];

  const quickLinks = [
    { key: 'home', path: '/' },
    { key: 'menu', path: '/menu' },
    { key: 'branches', path: '/branches' },
    { key: 'about', path: '/about' },
    { key: 'contact', path: '/contact' }
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>
            Bon Cafe
          </FooterLogo>
          <FooterDescription>
            {t('footer.description')}
          </FooterDescription>
          <SocialLinks>
            {socialLinks.map((social, index) => (
              <SocialLink
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <social.icon />
              </SocialLink>
            ))}
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t('footer.quickLinks')}</FooterTitle>
          <FooterLinks>
            {quickLinks.map((link) => (
              <FooterLink
                key={link.key}
                as={Link}
                to={link.path}
              >
                {t(`nav.${link.key}`)}
              </FooterLink>
            ))}
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t('contact.title')}</FooterTitle>
          <FooterLinks>
            <FooterLink href="tel:+998901234567">
              <FiPhone />
              +998 (90) 123-45-67
            </FooterLink>
            <FooterLink href="mailto:info@boncafe.uz">
              <FiMail />
              info@boncafe.uz
            </FooterLink>
            <FooterLink>
              <FiMapPin />
              Tashkent, Uzbekistan
            </FooterLink>
          </FooterLinks>
        </FooterSection>


      </FooterContent>

      <FooterBottom>
        <Copyright>
          {t('footer.copyright')}
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;