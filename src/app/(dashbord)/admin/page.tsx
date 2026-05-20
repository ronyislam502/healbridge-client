'use client';

import * as React from 'react';
import { AdminStats } from '@/components/dashboard/AdminStats';
import { RecentAppointments } from '@/components/dashboard/RecentAppointments';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { useGetStatsQuery } from '@/redux/features/statistics/statisticsApi';
import { useGetAllAppointmentsQuery } from '@/redux/features/appointment/appointmentApi';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const { data: statsRes, isLoading: isLoadingStats } = useGetStatsQuery({});
  const { data: appointmentsRes, isLoading: isLoadingAppointments } = useGetAllAppointmentsQuery({ limit: 5 });

  const statsData = statsRes?.data;
  const appointments = appointmentsRes?.data || [];

  const monthlyData = statsData?.barChartData?.map((item: any) => ({
    name: new Date(item.month).toLocaleDateString([], { month: 'short', year: '2-digit' }),
    Count: Number(item.count),
  })) || [];

  const statusData = statsData?.pieCharData?.map((item: any) => ({
    name: item.status.charAt(0) + item.status.slice(1).toLowerCase(),
    value: item.count,
  })).filter((item: any) => item.value > 0) || [];

  const COLORS = {
    Scheduled: '#3b82f6',
    Inprogress: '#a855f7',
    Completed: '#10b981',
    Cancelled: '#f43f5e',
  };

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
      <AdminStats data={statsData} isLoading={isLoadingStats} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
        {/* Appointments Trend (Area Chart) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-2xl space-y-6">
          <div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Appointments Trend</h4>
            <p className="text-xs text-slate-400 font-medium">Monthly system-wide scheduling activity</p>
          </div>
          
          {isLoadingStats ? (
            <div className="h-[250px] flex items-center justify-center">
              <Icons.loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
          ) : monthlyData.length === 0 ? (
            <div className="h-[250px] flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <Icons.activity className="w-10 h-10 text-slate-400 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No data available yet</p>
            </div>
          ) : (
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    allowDecimals={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-950/90 text-white px-4 py-3 rounded-2xl border border-slate-800 text-[10px] uppercase font-black tracking-widest italic">
                            <p className="mb-1 text-slate-400">{payload[0].payload.name}</p>
                            <p>Appointments: <span className="text-teal-400 font-black">{payload[0].value}</span></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Count" 
                    stroke="#14b8a6" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorCount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Status Distribution (Pie/Donut Chart) */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-2xl space-y-6 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Status Distribution</h4>
            <p className="text-xs text-slate-400 font-medium">Real-time status of all appointments</p>
          </div>
          
          {isLoadingStats ? (
            <div className="h-[200px] flex items-center justify-center">
              <Icons.loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
          ) : statusData.length === 0 ? (
            <div className="h-[200px] flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <Icons.calendar className="w-10 h-10 text-slate-400 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No appointments yet</p>
            </div>
          ) : (
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry: any, index: number) => (
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
                  {statsData?.appointmentCount || 0}
                </span>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Total</p>
              </div>
            </div>
          )}

          {/* Custom Chart Legend */}
          {!isLoadingStats && statusData.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50 dark:border-slate-800/50">
              {statusData.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span 
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
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
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Left Column - Appointments Table */}
        <div className="xl:col-span-2">
          <RecentAppointments data={appointments} isLoading={isLoadingAppointments} />
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

          {/* Pending Tasks */}
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