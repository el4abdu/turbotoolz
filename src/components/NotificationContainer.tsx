import React, { useState, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import Notification, { NotificationType } from './Notification';

// Define notification item structure
export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

// Create context for notifications
interface NotificationContextType {
  showNotification: (notification: Omit<NotificationItem, 'id'>) => string;
  hideNotification: (id: string) => void;
  clearAllNotifications: () => void;
  showSuccess: (title: string, message: string, duration?: number) => string;
  showError: (title: string, message: string, duration?: number) => string;
  showInfo: (title: string, message: string, duration?: number) => string;
  showWarning: (title: string, message: string, duration?: number) => string;
}

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => '',
  hideNotification: () => {},
  clearAllNotifications: () => {},
  showSuccess: () => '',
  showError: () => '',
  showInfo: () => '',
  showWarning: () => '',
});

// Hook for using notifications
export const useNotification = () => useContext(NotificationContext);

// Notification Provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Add a new notification
  const showNotification = (notification: Omit<NotificationItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { ...notification, id }]);
    return id;
  };

  // Remove a notification by ID
  const hideNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Helper functions for common notification types
  const showSuccess = (title: string, message: string, duration?: number) => {
    return showNotification({ type: 'success', title, message, duration });
  };

  const showError = (title: string, message: string, duration?: number) => {
    return showNotification({ type: 'error', title, message, duration });
  };

  const showInfo = (title: string, message: string, duration?: number) => {
    return showNotification({ type: 'info', title, message, duration });
  };

  const showWarning = (title: string, message: string, duration?: number) => {
    return showNotification({ type: 'warning', title, message, duration });
  };

  const contextValue = {
    showNotification,
    hideNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };

  // Render the notifications container and provide context
  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {isMounted &&
        createPortal(
          <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                {...notification}
                onClose={hideNotification}
              />
            ))}
          </div>,
          document.body
        )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider; 