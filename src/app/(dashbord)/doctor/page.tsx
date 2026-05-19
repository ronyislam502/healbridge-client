'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useGetMyAppointmentsQuery } from '@/redux/features/appointment/appointmentApi';
import { useMyProfilQuery } from '@/redux/features/user/userApi';
import { useGetStatsQuery } from '@/redux/features/statistics/statisticsApi';
import { HBSuspense } from '@/components/shared/HBSuspense';

const DoctorDashboard = () => {
  const { data: profileData } = useMyProfilQuery({});
  const { data: appointmentsData, isLoading } = useGetMyAppointmentsQuery({ limit: 5 });
  const { data: statsData, isLoading: isLoadingStats } = useGetStatsQuery({});
  
  const appointments = appointmentsData?.data || [];
  const doctorName = profileData?.name || 'Doctor';

  const appointmentCount = statsData?.data?.appointmentCount || 0;
  const reviewCount = statsData?.data?.reviewCount || 0;
  const patientCount = statsData?.data?.patientCount || 0;
  const totalRevenue = statsData?.data?.totalRevenue?._sum?.amount || 0;

  const stats = [
    { label: "Total Appointments", value: isLoadingStats ? '...' : appointmentCount.toString(), icon: Icons.calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Patients', value: isLoadingStats ? '...' : patientCount.toString(), icon: Icons.users, color: 'text-teal-500', bg: 'bg-teal-500/10' },
    { label: 'Total Reviews', value: isLoadingStats ? '...' : reviewCount.toString(), icon: Icons.star, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Total Earnings', value: isLoadingStats ? '...' : `$${totalRevenue.toLocaleString()}`, icon: Icons.activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Welcome, <span className="text-teal-500">{doctorName}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your professional schedule and patients.</p>
        </div>
        <button className="h-14 px-8 rounded-2xl bg-teal-500 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-teal-600 transition-all flex items-center gap-3">
          <Icons.calendar className="w-5 h-5" />
          View Full Schedule
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:-translate-y-1 transition-all">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", stat.bg)}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Appointments List */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Upcoming Appointments</h3>
            <button className="text-xs font-black text-teal-500 uppercase tracking-widest italic">View All</button>
          </div>
          
          <HBSuspense isLoading={isLoading} variant="card" count={3}>
            <div className="space-y-4">
                {appointments.map((apt: any) => (
                <div key={apt.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-between group hover:border-teal-500 transition-colors">
                    <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-teal-500 transition-colors">
                        <Icons.users className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-lg font-black text-slate-900 dark:text-white italic">{apt.patient?.name}</p>
                        <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Medical Consultation</p>
                    </div>
                    </div>
                    <div className="text-right flex items-center gap-10">
                    <div className="hidden md:block">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {new Date(apt.schedule?.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-[10px] font-black text-slate-400 uppercase">
                            {new Date(apt.schedule?.startDate).toLocaleDateString()}
                        </p>
                    </div>
                    <span className={cn(
                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic",
                        apt.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                    )}>
                        {apt.status}
                    </span>
                    </div>
                </div>
                ))}
                {appointments.length === 0 && (
                    <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 italic font-bold text-slate-400">
                        No upcoming appointments for today.
                    </div>
                )}
            </div>
          </HBSuspense>
        </div>

        {/* Quick Actions / Activity */}
        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
               <h4 className="text-xl font-black italic uppercase tracking-widest mb-4">Patient Reviews</h4>
               <p className="text-slate-400 font-medium text-sm mb-6">Stay updated with your patient feedback and ratings.</p>
               <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors">
                 <Icons.star className="w-4 h-4" />
                 Read All Reviews
               </button>
             </div>
             <Icons.star className="absolute -bottom-8 -right-8 w-32 h-32 text-white/5 rotate-12" />
           </div>

           <div className="bg-teal-500 rounded-[2.5rem] p-8 text-white shadow-2xl">
             <h4 className="text-xl font-black italic uppercase tracking-widest mb-4">Telemedicine</h4>
             <p className="text-teal-100 font-medium text-sm mb-6">Start a secure video consultation with your next patient.</p>
             <button className="w-full py-4 bg-white text-teal-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
               Start Session
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;