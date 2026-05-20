'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useGetMyAppointmentsQuery } from '@/redux/features/appointment/appointmentApi';
import { useMyProfilQuery } from '@/redux/features/user/userApi';
import { useGetStatsQuery } from '@/redux/features/statistics/statisticsApi';
import { HBSuspense } from '@/components/shared/HBSuspense';
import { HBTable } from '@/components/shared/HBTable';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const DoctorDashboard = () => {
  const { data: profileData } = useMyProfilQuery({});
  const { data: appointmentsData, isLoading } = useGetMyAppointmentsQuery({ limit: 5 });
  const { data: statsRes, isLoading: isLoadingStats } = useGetStatsQuery({});
  
  const appointments = appointmentsData?.data || [];
  const doctorName = profileData?.name || 'Doctor';

  const statsData = statsRes?.data;
  const appointmentCount = statsData?.appointmentCount || 0;
  const reviewCount = statsData?.reviewCount || 0;
  const patientCount = statsData?.patientCount || 0;
  const totalRevenue = statsData?.totalRevenue?._sum?.amount || 0;

  const stats = [
    { label: "Total Appointments", value: String(appointmentCount), icon: Icons.calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Patients', value: String(patientCount), icon: Icons.users, color: 'text-teal-500', bg: 'bg-teal-500/10' },
    { label: 'Total Reviews', value: String(reviewCount), icon: Icons.star, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Total Earnings', value: `$${totalRevenue.toLocaleString()}`, icon: Icons.activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  const chartData = statsData?.formattedAppointmentStatus?.map((item: any) => ({
    name: item.status.charAt(0) + item.status.slice(1).toLowerCase(),
    value: item.count,
  })).filter((item: any) => item.value > 0) || [];

  const COLORS = {
    Scheduled: '#3b82f6',
    Inprogress: '#a855f7',
    Completed: '#10b981',
    Cancelled: '#f43f5e',
  };

  const columns = [
    {
      header: 'Patient',
      key: 'patientName',
      render: (row: any) => (
        <span className="font-bold text-slate-900 dark:text-white">
          {row.patient?.name}
        </span>
      ),
    },
    {
      header: 'Consultation Type',
      key: 'type',
      render: () => (
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Medical Consultation
        </span>
      ),
    },
    {
      header: 'Date',
      key: 'date',
      render: (row: any) => (
        <span className="text-sm font-bold text-slate-900 dark:text-white">
          {row.schedule?.startDateTime ? new Date(row.schedule.startDateTime).toLocaleDateString() : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Time',
      key: 'time',
      render: (row: any) => (
        <span className="text-xs font-black text-teal-500 uppercase tracking-widest italic">
          {row.schedule?.startDateTime ? new Date(row.schedule.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      align: 'right' as const,
      render: (row: any) => (
        <span className={cn(
          "text-[9px] font-black uppercase tracking-widest italic px-3 py-1 rounded-lg",
          row.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
        )}>
          {row.status}
        </span>
      ),
    },
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
      <HBSuspense isLoading={isLoadingStats} variant="card" count={4}>
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
      </HBSuspense>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Appointments List */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Upcoming Appointments</h3>
            <button className="text-xs font-black text-teal-500 uppercase tracking-widest italic">View All</button>
          </div>
          
          <HBTable
            columns={columns}
            data={appointments}
            isLoading={isLoading}
            emptyMessage="No upcoming appointments for today."
            skeletonCount={3}
          />
        </div>

        {/* Right Column - Donut Chart / Activity */}
        <div className="space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
             <div>
               <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Appointment Breakdown</h4>
               <p className="text-xs text-slate-400 font-medium">Real-time status breakdown of your schedules</p>
             </div>
             
             {isLoadingStats ? (
               <div className="h-[220px] flex items-center justify-center">
                 <Icons.loader2 className="w-8 h-8 text-teal-500 animate-spin" />
               </div>
             ) : chartData.length === 0 ? (
               <div className="h-[220px] flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                 <Icons.calendar className="w-10 h-10 text-slate-400 mb-3" />
                 <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No appointments yet</p>
                 <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Patients will see you once you publish your schedule!</p>
               </div>
             ) : (
               <div className="h-[220px] w-full relative">
                 <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                   <PieChart>
                     <Pie
                       data={chartData}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {chartData.map((entry: any, index: number) => (
                         <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#94a3b8'} />
                       ))}
                     </Pie>
                     <Tooltip 
                       content={({ active, payload }) => {
                         if (active && payload && payload.length) {
                           return (
                             <div className="bg-slate-950/90 text-white px-4 py-3 rounded-2xl border border-slate-800 text-[10px] uppercase font-black tracking-widest italic">
                               <p>{payload[0].name}: <span className="text-teal-400 font-black">{payload[0].value}</span></p>
                             </div>
                           );
                         }
                         return null;
                       }}
                     />
                   </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                   <span className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">
                     {appointmentCount}
                   </span>
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Total</p>
                 </div>
               </div>
             )}

             {/* Custom Chart Legend */}
             {!isLoadingStats && chartData.length > 0 && (
               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                 {chartData.map((item: any, idx: number) => (
                   <div key={idx} className="flex items-center gap-2">
                     <span 
                       className="w-3 h-3 rounded-full flex-shrink-0"
                       style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] }}
                     />
                     <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                       {item.name}: <span className="font-black text-slate-700 dark:text-slate-200">{item.value}</span>
                     </span>
                   </div>
                 ))}
               </div>
             )}
           </div>

           {/* Telemedicine & Reviews */}
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