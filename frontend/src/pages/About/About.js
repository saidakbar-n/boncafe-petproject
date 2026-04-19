import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiUsers, FiCoffee, FiStar, FiTrendingUp } from 'react-icons/fi';
import {
  AboutContainer,
  AboutHero,
  AboutTitle,
  AboutSubtitle,
  AboutContent,
  AboutSection,
  SectionTitle,
  SectionText,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  ValuesGrid,
  ValueCard,
  ValueIcon,
  ValueTitle,
  ValueDescription,
  TeamSection,
  TeamGrid,
  TeamMember,
  MemberImage,
  MemberInfo,
  MemberName,
  MemberRole
} from './About.styles';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: FiUsers },
    { number: '15+', label: 'Menu Items', icon: FiCoffee },
    { number: '4.8', label: 'Average Rating', icon: FiStar },
    { number: '3', label: 'Locations', icon: FiTrendingUp }
  ];

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

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Head Barista',
      image: '/images/placeholder-team.svg'
    },
    {
      name: 'Michael Chen',
      role: 'Store Manager',
      image: '/images/placeholder-team.svg'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Pastry Chef',
      image: '/images/placeholder-team.svg'
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
      <AboutHero
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AboutTitle>{t('about.title')}</AboutTitle>
        <AboutSubtitle>{t('about.subtitle')}</AboutSubtitle>
      </AboutHero>

      <AboutContent>
        <AboutSection
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <SectionText>{t('about.story')}</SectionText>
          </motion.div>

          <motion.div variants={itemVariants}>
            <SectionTitle>{t('about.mission')}</SectionTitle>
            <SectionText>{t('about.missionText')}</SectionText>
          </motion.div>
        </AboutSection>

        <StatsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <StatCard>
                <stat.icon />
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            </motion.div>
          ))}
        </StatsGrid>

        <AboutSection
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle>{t('about.values')}</SectionTitle>
          </motion.div>

          <ValuesGrid>
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
          </ValuesGrid>
        </AboutSection>

        <TeamSection
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle>Meet Our Team</SectionTitle>
          </motion.div>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <TeamMember>
                  <MemberImage>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = '/images/placeholder-team.svg';
                      }}
                    />
                  </MemberImage>
                  <MemberInfo>
                    <MemberName>{member.name}</MemberName>
                    <MemberRole>{member.role}</MemberRole>
                  </MemberInfo>
                </TeamMember>
              </motion.div>
            ))}
          </TeamGrid>
        </TeamSection>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;