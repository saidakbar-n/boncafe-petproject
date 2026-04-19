import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the notification context
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

// Notification Provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      message,
      type,
      duration
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods for different notification types
  const info = useCallback((message, options = {}) => {
    return addNotification(message, 'info', options.duration);
  }, [addNotification]);

  const success = useCallback((message, options = {}) => {
    return addNotification(message, 'success', options.duration);
  }, [addNotification]);

  const warning = useCallback((message, options = {}) => {
    return addNotification(message, 'warning', options.duration);
  }, [addNotification]);

  const error = useCallback((message, options = {}) => {
    return addNotification(message, 'error', options.duration);
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    info,
    success,
    warning,
    error
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Render notifications */}
      <div className="notification-container" style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`notification notification-${notification.type}`}
            style={{
              padding: '12px 16px',
              borderRadius: '4px',
              backgroundColor: notification.type === 'error' ? '#f44336' : 
                             notification.type === 'success' ? '#4caf50' : 
                             notification.type === 'warning' ? '#ff9800' : '#2196f3',
              color: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              maxWidth: '300px',
              wordWrap: 'break-word'
            }}
            onClick={() => removeNotification(notification.id)}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;