import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.background} 0%, 
    ${props => props.theme.colors.backgroundAlt} 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Logo = styled(motion.div)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 4px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const LoadingProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.primaryLight}
  );
  border-radius: 2px;
`;

const LoadingText = styled(motion.p)`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.md};
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const CoffeeIcon = styled(motion.div)`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const LoadingScreen = ({ isLoading, onComplete }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');

  const loadingMessages = [
    t('loading.default'),
    t('loading.menu'),
    t('loading.branches'),
    t('loading.testimonials'),
    t('loading.pleaseWait')
  ];

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        // Update loading message based on progress
        const messageIndex = Math.floor((newProgress / 100) * loadingMessages.length);
        if (messageIndex < loadingMessages.length) {
          setLoadingText(loadingMessages[messageIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CoffeeIcon
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ☕
          </CoffeeIcon>
          
          <Logo
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bon Cafe
          </Logo>
          
          <LoadingBar>
            <LoadingProgress
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </LoadingBar>
          
          <LoadingText
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loadingText}
          </LoadingText>
        </LoadingContainer>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;