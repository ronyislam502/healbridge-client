import * as React from 'react';
import { DashboardSidebar } from '@/components/dashboard/Sidebar';
import { Icons } from '@/components/shared/Icons';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <button className="relative w-12 h-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-500 hover:text-teal-500 transition-all border border-slate-100 dark:border-slate-800">
                 <Icons.activity className="w-6 h-6" />
                 <span className="absolute top-3 right-3 w-2 h-2 bg-teal-500 rounded-full border-2 border-white dark:border-slate-900" />
              </button>
              <div className="flex items-center gap-4 pl-6 border-l border-slate-100 dark:border-slate-800">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900 dark:text-white italic">Admin User</p>
                  <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">Master Admin</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 font-black italic">
                  AU
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
