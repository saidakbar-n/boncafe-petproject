import React, { createContext, useContext, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const NotificationContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
`;

const NotificationCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1rem 1.5rem;
  box-shadow: ${props => props.theme.shadows.xl};
  border-left: 4px solid ${props => {
    switch (props.$type) {
      case 'success': return props.theme.colors.success;
      case 'error': return props.theme.colors.error;
      case 'warning': return props.theme.colors.warning;
      default: return props.theme.colors.primary;
    }
  }};
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  position: relative;
  backdrop-filter: blur(10px);
`;

const IconContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${props => props.theme.colors.white};
  background-color: ${props => {
    switch (props.$type) {
      case 'success': return props.theme.colors.success;
      case 'error': return props.theme.colors.error;
      case 'warning': return props.theme.colors.warning;
      default: return props.theme.colors.primary;
    }
  }};
  
  svg {
    font-size: 0.875rem;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
`;

const Message = styled.p`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.4;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
  }
  
  svg {
    font-size: 0.875rem;
  }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: ${props => {
    switch (props.$type) {
      case 'success': return props.theme.colors.success;
      case 'error': return props.theme.colors.error;
      case 'warning': return props.theme.colors.warning;
      default: return props.theme.colors.primary;
    }
  }};
  border-radius: 0 0 ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg};
`;

// Note: useNotification is exported from contexts/NotificationContext.js

const getIcon = (type) => {
  switch (type) {
    case 'success': return FiCheck;
    case 'error': return FiX;
    case 'warning': return FiAlertCircle;
    default: return FiInfo;
  }
};

const Notification = ({ notification, onClose }) => {
  const Icon = getIcon(notification.type);
  
  return (
    <NotificationCard
      $type={notification.type}
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      layout
    >
      <IconContainer $type={notification.type}>
        <Icon />
      </IconContainer>
      
      <Content>
        {notification.title && <Title>{notification.title}</Title>}
        <Message>{notification.message}</Message>
      </Content>
      
      <CloseButton onClick={() => onClose(notification.id)}>
        <FiX />
      </CloseButton>
      
      {notification.duration && (
        <ProgressBar
          $type={notification.type}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: notification.duration / 1000, ease: 'linear' }}
        />
      )}
    </NotificationCard>
  );
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    if (newNotification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
    
    return id;
  }, [removeNotification]);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    return addNotification({ ...options, message, type: 'success' });
  }, [addNotification]);

  const error = useCallback((message, options = {}) => {
    return addNotification({ ...options, message, type: 'error', duration: 7000 });
  }, [addNotification]);

  const warning = useCallback((message, options = {}) => {
    return addNotification({ ...options, message, type: 'warning' });
  }, [addNotification]);

  const info = useCallback((message, options = {}) => {
    return addNotification({ ...options, message, type: 'info' });
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer>
        <AnimatePresence mode="popLayout">
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              notification={notification}
              onClose={removeNotification}
            />
          ))}
        </AnimatePresence>
      </NotificationContainer>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;