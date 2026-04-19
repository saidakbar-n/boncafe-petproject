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
  
  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
`;

const NotificationCard = styled(motion.div)`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-left: 4px solid ${props => {
    switch (props.$type) {
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return '#8B4513';
    }
  }};
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  position: relative;
`;

const IconContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  background-color: ${props => {
    switch (props.$type) {
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return '#8B4513';
    }
  }};
  
  svg {
    font-size: 0.875rem;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  
  &:hover {
    background-color: #F3F4F6;
  }
  
  svg {
    font-size: 0.875rem;
  }
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
        <Message>{notification.message}</Message>
      </Content>
      
      <CloseButton onClick={() => onClose(notification.id)}>
        <FiX />
      </CloseButton>
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