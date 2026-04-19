import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getMediaUrl } from '../../services/api';
import {
  CardContainer,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter
} from './MenuCard.styles';

const MenuCard = ({ item, type, index = 0 }) => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    if (!price) return t('menu.priceOnRequest', 'Price on request');
    return new Intl.NumberFormat('uz-UZ').format(price);
  };

  // Get proper image URL
  const imageUrl = getMediaUrl(item.photo);

  // For beverages, don't show detailed descriptions - keep it simple
  const shouldShowDescription = type === 'food' && item.ingredients;

  return (
    <CardContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      <CardImage>
        <img 
          src={imageUrl || '/images/placeholder-menu.svg'} 
          alt={item.name}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = '/images/placeholder-menu.svg';
            setImageLoaded(true);
          }}
        />
        
        {/* Clean price overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'rgba(139, 69, 19, 0.95)',
          backdropFilter: 'blur(8px)',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '12px',
          fontSize: '0.875rem',
          fontWeight: '600',
          boxShadow: '0 2px 8px rgba(139, 69, 19, 0.3)'
        }}>
          {formatPrice(item.price)} {item.price ? t('menu.currency', 'сум') : ''}
        </div>
      </CardImage>

      <CardContent>
        <CardTitle>{item.name}</CardTitle>
        
        {/* Only show description for food items, keep beverages simple */}
        {shouldShowDescription && (
          <CardDescription>
            {item.ingredients}
          </CardDescription>
        )}

        {/* Minimal nutrition info for food items only */}
        {type === 'food' && item.calories && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '12px',
            padding: '8px 12px',
            backgroundColor: 'rgba(139, 69, 19, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(139, 69, 19, 0.1)'
          }}>
            <span style={{ 
              fontSize: '0.75rem', 
              color: '#8B4513', 
              fontWeight: '500',
              marginRight: '6px'
            }}>
              {t('menu.nutrition.calories')}:
            </span>
            <span style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#1f2937' 
            }}>
              {item.calories}
            </span>
          </div>
        )}

        <CardFooter>
          {/* Empty footer - no category badges */}
        </CardFooter>
      </CardContent>
    </CardContainer>
  );
};

export default MenuCard;