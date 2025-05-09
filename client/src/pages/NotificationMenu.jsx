import React, { useState, useContext, useRef, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

const NotificationMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, clearNotifications, isConnected } = useContext(SocketContext);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Format timestamp
    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Notification bell icon with indicator */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors relative"
                aria-label="Notifications"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"
                    />
                </svg>

                {/* Notification badge */}
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
                        {notifications.length}
                    </span>
                )}

                {/* Connection status indicator */}
                <span 
                    className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
                        isConnected ? 'bg-green-500' : 'bg-red-500'
                    }`}
                ></span>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="py-2 border-b border-gray-200">
                        <div className="px-4 flex justify-between items-center">
                            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                            {notifications.length > 0 && (
                                <button
                                    onClick={clearNotifications}
                                    className="text-xs text-primary hover:text-primary-dark"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Notification list */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="py-4 px-4 text-sm text-gray-500 text-center">
                                No new notifications
                            </div>
                        ) : (
                            <ul>
                                {notifications.map((notification, index) => (
                                    <li
                                        key={index}
                                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                    >
                                        <div className="px-4 py-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                {notification.title || 'Notification'}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {formatTime(notification.timestamp)}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationMenu; 