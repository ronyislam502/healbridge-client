'use client';

import * as React from 'react';
import { Icons } from '../shared/Icons';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAppSelector } from '@/redux/hooks';
import { io } from 'socket.io-client';

// Custom lightweight timeago helper
const formatTimeAgo = (dateInput: string | Date): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // If time calculation is slightly in future due to clock sync, return "just now"
  if (diffInSeconds < 10) return 'just now';

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
};

const NotificationBell = () => {
  const user = useAppSelector((state) => state?.auth?.user);
  
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [socket, setSocket] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [timeUpdateTrigger, setTimeUpdateTrigger] = React.useState(0);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  // Real-time Socket.IO notification channel listener (Pure Socket Approach)
  React.useEffect(() => {
    if (!user?.email) return;

    // Connect to port 5000 (backend address)
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('🔌 Connected to realtime notifications channel (Pure Socket)');
      newSocket.emit('register', { email: user.email, role: user.role });
    });

    newSocket.on('initial-notifications', (initialList: any[]) => {
      console.log('📥 Received notifications feed over socket:', initialList);
      setNotifications(initialList);
    });

    newSocket.on('notification', (newNotification: any) => {
      console.log('✉️ Realtime notification received over socket:', newNotification);

      // Trigger a beautiful in-app toast instantly
      toast.info(newNotification.title, {
        description: newNotification.message,
        duration: 8000,
      });

      // Append new notification to local state to avoid delay
      setNotifications(prev => {
        if (prev.some(n => n.id === newNotification.id)) return prev;
        return [newNotification, ...prev];
      });
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 Disconnected from notification channel');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user?.email, user?.role]);

  // Periodic interval to update "time ago" descriptions
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeUpdateTrigger(prev => prev + 1);
    }, 15000); // refresh time calculation every 15s
    return () => clearInterval(timer);
  }, []);

  // Click outside to close dropdown handler
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = (id: string) => {
    if (socket && user) {
      console.log(`📖 Marking notification ${id} as read over socket`);
      socket.emit('read-notification', { id, email: user.email, role: user.role });
    }
  };

  const handleMarkAllRead = () => {
    const unreadItems = notifications.filter((n: any) => !n.isRead);
    unreadItems.forEach((item: any) => {
      handleMarkAsRead(item.id);
    });
    toast.success('All notifications marked as read.');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-12 h-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-500 hover:text-teal-500 transition-all border border-slate-100 dark:border-slate-800 cursor-pointer active:scale-95 duration-200",
          isOpen && "text-teal-500 border-teal-500/50"
        )}
      >
        <Icons.bell className="w-5 h-5" />
        
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500 border border-white dark:border-slate-900 text-[8px] font-black text-white items-center justify-center">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Notifications Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white/95 dark:bg-slate-900/95 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl rounded-[2rem] backdrop-blur-md z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-250">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black uppercase tracking-wider italic text-slate-900 dark:text-white">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-black text-teal-600 bg-teal-500/10 px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[10px] font-black text-teal-500 hover:text-teal-600 uppercase tracking-widest italic cursor-pointer"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications Scrollable List */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/40 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center text-slate-400">
                <Icons.bell className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs font-black uppercase tracking-widest italic">All caught up!</p>
                <p className="text-[10px] mt-1 text-slate-400 dark:text-slate-500">No notifications to display.</p>
              </div>
            ) : (
              notifications.map((n: any) => {
                const isUnread = !n.isRead;
                const isPayment = n.title.toLowerCase().includes('payment') || n.title.toLowerCase().includes('received');
                
                return (
                  <div
                    key={n.id}
                    onClick={() => isUnread && handleMarkAsRead(n.id)}
                    className={cn(
                      "p-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-200 cursor-pointer flex gap-4 relative group",
                      isUnread && "bg-teal-500/[0.02] dark:bg-teal-500/[0.01]"
                    )}
                  >
                    {/* Visual Icon */}
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105",
                      isPayment 
                        ? "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20" 
                        : "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20"
                    )}>
                      {isPayment ? (
                        <Icons.dollarSign className="w-4 h-4" />
                      ) : (
                        <Icons.calendar className="w-4 h-4" />
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h5 className={cn(
                          "text-xs font-bold text-slate-800 dark:text-slate-200",
                          isUnread && "font-black"
                        )}>
                          {n.title}
                        </h5>
                        <span className="text-[9px] font-medium text-slate-400 shrink-0">
                          {formatTimeAgo(n.createdAt)}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {n.message}
                      </p>
                    </div>

                    {/* Unread dot indicator */}
                    {isUnread && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-teal-500 rounded-full group-hover:scale-125 transition-transform" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
