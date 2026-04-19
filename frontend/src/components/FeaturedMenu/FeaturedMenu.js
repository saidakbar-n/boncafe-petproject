import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import MenuCard from '../MenuCard/MenuCard';
import { menuAPI } from '../../services/api';
import {
  FeaturedContainer,
  FeaturedHeader,
  FeaturedTitle,
  FeaturedSubtitle,
  FeaturedGrid,
  ViewAllButton
} from './FeaturedMenu.styles';

const FeaturedMenu = () => {
  const { t } = useTranslation();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  const fetchFeaturedItems = async () => {
    try {
      const [menuResponse, beverageResponse] = await Promise.all([
        menuAPI.getMenuItems(),
        menuAPI.getBeverages()
      ]);
      
      // Get featured items (new items and popular ones)
      const newMenuItems = menuResponse.data.filter(item => item.type === 'new').slice(0, 3);
      const newBeverages = beverageResponse.data.filter(item => item.type === 'new_drinks').slice(0, 3);
      
      setFeaturedItems([...newMenuItems, ...newBeverages].slice(0, 6));
    } catch (error) {
      console.error('Error fetching featured items:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  if (loading) {
    return null; // Or a skeleton loader
  }

  return (
    <FeaturedContainer>
      <FeaturedHeader
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FeaturedTitle>{t('featuredMenu.title')}</FeaturedTitle>
        <FeaturedSubtitle>{t('featuredMenu.subtitle')}</FeaturedSubtitle>
      </FeaturedHeader>

      <FeaturedGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {featuredItems.map((item, index) => (
          <motion.div key={item.id} variants={itemVariants}>
            <MenuCard 
              item={item} 
              type={item.ingredients ? 'food' : 'beverages'} 
            />
          </motion.div>
        ))}
      </FeaturedGrid>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}
      >
        <ViewAllButton
          as={Link}
          to="/menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('featuredMenu.viewFullMenu')}
          <FiArrowRight />
        </ViewAllButton>
      </motion.div>
    </FeaturedContainer>
  );
};

export default FeaturedMenu;