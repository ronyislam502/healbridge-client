import * as React from 'react';
import { AdminStats } from '@/components/dashboard/AdminStats';
import { RecentAppointments } from '@/components/dashboard/RecentAppointments';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Admin Dashboard | HealBridge',
  description: 'Manage appointments, doctors, and system-wide medical data.',
};

const AdminDashboard = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Dashboard <span className="text-teal-500">Overview</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back! Here's what's happening with HealBridge today.</p>
        </div>
        <button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black text-sm uppercase tracking-widest hover:bg-teal-500 transition-all shadow-xl flex items-center gap-3">
          <Icons.share2 className="w-4 h-4" />
          Export Reports
        </button>
      </div>

      {/* Statistics Grid */}
      <AdminStats />

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Left Column - Appointments Table */}
        <div className="xl:col-span-2">
          <RecentAppointments />
        </div>

        {/* Right Column - Secondary Info / Quick Actions */}
        <div className="space-y-10">
          {/* Quick Stats Mini-Card */}
          <div className="bg-teal-500 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-xl font-black italic uppercase tracking-widest mb-2">Performance</h4>
              <p className="text-teal-100 font-medium text-sm mb-6">Your system is performing 20% better than last month.</p>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black italic tracking-tighter">98%</span>
                <span className="text-xs font-bold uppercase tracking-widest mb-2">Uptime</span>
              </div>
            </div>
            <Icons.activity className="absolute -bottom-8 -right-8 w-40 h-40 text-white/10 rotate-12 group-hover:scale-125 transition-transform duration-700" />
          </div>

          {/* Pending Reviews / Tasks */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
             <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-6">Quick Tasks</h4>
             <div className="space-y-4">
               {[
                 { title: 'Approve 5 New Doctors', type: 'Verification', color: 'text-orange-500', bg: 'bg-orange-500/10' },
                 { title: 'Update Specialty Icons', type: 'Maintenance', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                 { title: 'System Backup Required', type: 'Security', color: 'text-red-500', bg: 'bg-red-500/10' },
               ].map((task, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-teal-500 transition-colors cursor-pointer">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", task.bg)}>
                      <Icons.checkCircle className={cn("w-5 h-5", task.color)} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{task.title}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.type}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;