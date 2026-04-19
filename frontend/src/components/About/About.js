import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiUsers } from 'react-icons/fi';
import {
  AboutContainer,
  AboutContent,
  AboutText,
  AboutTitle,
  AboutDescription,
  AboutValues,
  ValueCard,
  ValueIcon,
  ValueTitle,
  ValueDescription,
  AboutImage
} from './About.styles';

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: FiAward,
      title: t('about.quality'),
      description: t('about.qualityText')
    },
    {
      icon: FiUsers,
      title: t('about.community'),
      description: t('about.communityText')
    },
    {
      icon: FiHeart,
      title: t('about.sustainability'),
      description: t('about.sustainabilityText')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  return (
    <AboutContainer>
      <AboutContent
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <AboutText>
          <motion.div variants={itemVariants}>
            <AboutTitle>{t('about.title')}</AboutTitle>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <AboutDescription>{t('about.story')}</AboutDescription>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3>{t('about.values')}</h3>
          </motion.div>

          <AboutValues>
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ValueCard>
                  <ValueIcon>
                    <value.icon />
                  </ValueIcon>
                  <ValueTitle>{value.title}</ValueTitle>
                  <ValueDescription>{value.description}</ValueDescription>
                </ValueCard>
              </motion.div>
            ))}
          </AboutValues>
        </AboutText>

        <AboutImage
          as={motion.div}
          variants={itemVariants}
        >
          <img 
            src="/images/cafe-exterior.jpg" 
            alt="Bon Cafe Story"
          />
        </AboutImage>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;