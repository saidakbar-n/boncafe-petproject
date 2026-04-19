import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type = 'website',
  noindex = false 
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const defaultTitle = 'Bon Cafe - Premium Coffee Experience';
  const defaultDescription = t('footer.description');
  const defaultKeywords = 'coffee, cafe, restaurant, uzbekistan, tashkent, premium coffee, food delivery, bon cafe';
  const defaultImage = '/images/placeholder-seo.svg';
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://boncafe.uz';
  const currentUrl = url || `${siteUrl}${location.pathname}`;

  const seoTitle = title ? `${title} | Bon Cafe` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;

  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);
    updateMetaTag('author', 'Bon Cafe');
    updateMetaTag('language', i18n.language);
    
    // Robots meta tag
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Open Graph tags
    updateMetaTag('og:title', seoTitle, true);
    updateMetaTag('og:description', seoDescription, true);
    updateMetaTag('og:image', seoImage, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Bon Cafe', true);
    updateMetaTag('og:locale', i18n.language === 'uz' ? 'uz_UZ' : i18n.language === 'ru' ? 'ru_RU' : 'en_US', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seoTitle);
    updateMetaTag('twitter:description', seoDescription);
    updateMetaTag('twitter:image', seoImage);
    updateMetaTag('twitter:url', currentUrl);

    // Additional SEO tags
    updateMetaTag('theme-color', '#8B4513');
    updateMetaTag('msapplication-TileColor', '#8B4513');
    updateMetaTag('apple-mobile-web-app-title', 'Bon Cafe');
    updateMetaTag('application-name', 'Bon Cafe');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Alternate language links
    const languages = ['en', 'ru', 'uz'];
    languages.forEach(lang => {
      let hrefLangLink = document.querySelector(`link[hreflang="${lang}"]`);
      if (!hrefLangLink) {
        hrefLangLink = document.createElement('link');
        hrefLangLink.setAttribute('rel', 'alternate');
        hrefLangLink.setAttribute('hreflang', lang);
        document.head.appendChild(hrefLangLink);
      }
      hrefLangLink.setAttribute('href', `${siteUrl}${location.pathname}?lang=${lang}`);
    });

    // JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Bon Cafe",
      "description": seoDescription,
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "image": seoImage,
      "telephone": "+998901234567",
      "email": "info@boncafe.uz",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Amir Temur Street 15",
        "addressLocality": "Tashkent",
        "addressCountry": "UZ"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.2995",
        "longitude": "69.2401"
      },
      "openingHours": "Mo-Su 07:00-22:00",
      "priceRange": "$$",
      "servesCuisine": ["Coffee", "International", "Breakfast"],
      "acceptsReservations": true,
      "hasMenu": `${siteUrl}/menu`,
      "sameAs": [
        "https://www.facebook.com/boncafe",
        "https://www.instagram.com/boncafe",
        "https://t.me/boncafe"
      ]
    };

    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);

  }, [seoTitle, seoDescription, seoKeywords, seoImage, currentUrl, type, noindex, i18n.language, location.pathname, siteUrl]);

  return null; // This component doesn't render anything
};

export default SEO;