"use client"

import * as React from 'react';
import { DashboardSidebar } from '@/components/dashboard/Sidebar';
import { Icons } from '@/components/shared/Icons';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useAppSelector } from '@/redux/hooks';
import { TUser } from '@/redux/features/auth/authSlice';
import NotificationBell from '@/components/dashboard/NotificationBell';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  const user = useAppSelector((state) => state?.auth?.user) as TUser;
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted && !user) {
      router.push('/login');
    }
  }, [mounted, user, router]);

  if (!mounted) return null;
  if (!user) return null;


  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
        <DashboardSidebar />
        
        <SidebarInset className="flex flex-col min-w-0 flex-1 overflow-hidden">
          {/* Top Header */}
          <header className="h-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 px-6 py-3 rounded-2xl w-full max-w-md border border-slate-100 dark:border-slate-800">
                <Icons.search className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search appointments, doctors..." 
                  className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 dark:text-slate-300 w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <NotificationBell />
              <div className="flex items-center gap-4 pl-6 border-l border-slate-100 dark:border-slate-800">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900 dark:text-white italic">{user?.name || 'User'}</p>
                  <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">{user?.role || 'Guest'}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 font-black italic">
                  {(user?.name || 'U').charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <main className="flex-1 overflow-y-auto p-8 lg:p-12">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
