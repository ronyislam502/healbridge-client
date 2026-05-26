'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AdminStats } from '@/components/dashboard/AdminStats';
import { RecentAppointments } from '@/components/dashboard/RecentAppointments';
import { DashboardShortcuts } from '@/components/dashboard/DashboardShortcuts';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { useGetStatsQuery } from '@/redux/features/statistics/statisticsApi';
import { useGetAllAppointmentsQuery } from '@/redux/features/appointment/appointmentApi';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { toast } from 'sonner';

interface APILog {
  timestamp: string;
  method: string;
  path: string;
  status: number;
  latency: number;
}

const AdminDashboard = () => {
  const { data: statsRes, isLoading: isLoadingStats } = useGetStatsQuery({});
  const { data: appointmentsRes, isLoading: isLoadingAppointments } = useGetAllAppointmentsQuery({ limit: 5 });
  const [activeTab, setActiveTab] = useState<'overview' | 'vitals' | 'shortcuts'>('overview');

  // Simulated System Vitals State
  const [cpu, setCpu] = useState(14);
  const [memory, setMemory] = useState(412);
  const [latency, setLatency] = useState(24);
  const [activeSessions, setActiveSessions] = useState(38);
  const [logs, setLogs] = useState<APILog[]>([]);
  const [isLogStreaming, setIsLogStreaming] = useState(true);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const statsData = statsRes?.data;
  const appointments = appointmentsRes?.data || [];

  const rawBarChartData = statsData?.barChartData || [];
  const dataMap: Record<string, number> = {};
  
  rawBarChartData.forEach((item: any) => {
    try {
      const dateKey = new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      dataMap[dateKey] = Number(item.count) || 0;
    } catch (e) {
      // safe fallback
    }
  });

  const monthlyData = [];
  const currentDate = new Date();
  
  // Create 6 consecutive months ending at current month
  for (let i = 5; i >= 0; i--) {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const name = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    monthlyData.push({
      name,
      Count: dataMap[name] !== undefined ? dataMap[name] : 0,
    });
  }

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

  // Vitals Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.max(8, Math.min(65, prev + Math.floor(Math.random() * 11) - 5)));
      setMemory(prev => Math.max(380, Math.min(680, prev + Math.floor(Math.random() * 7) - 3)));
      setLatency(prev => Math.max(12, Math.min(80, prev + Math.floor(Math.random() * 9) - 4)));
      setActiveSessions(prev => Math.max(25, Math.min(60, prev + Math.floor(Math.random() * 5) - 2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // API Log Traffic Simulator
  useEffect(() => {
    if (!isLogStreaming) return;

    const paths = [
      { method: 'GET', path: '/api/v1/users/me', statuses: [200, 200, 200, 401] },
      { method: 'GET', path: '/api/v1/appointments', statuses: [200, 200, 200] },
      { method: 'POST', path: '/api/v1/appointments/create-appointment', statuses: [201, 201, 400] },
      { method: 'GET', path: '/api/v1/doctors', statuses: [200] },
      { method: 'GET', path: '/api/v1/specialties', statuses: [200] },
      { method: 'PATCH', path: '/api/v1/admins/update/1', statuses: [200, 200, 500] },
      { method: 'GET', path: '/api/v1/statistics', statuses: [200] },
    ];

    const generateLog = () => {
      const selected = paths[Math.floor(Math.random() * paths.length)];
      const status = selected.statuses[Math.floor(Math.random() * selected.statuses.length)];
      const newLog: APILog = {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        method: selected.method,
        path: selected.path,
        status,
        latency: Math.floor(Math.random() * 120) + 15,
      };

      setLogs(prev => {
        const nextLogs = [...prev, newLog];
        // keep last 50 logs
        return nextLogs.slice(-50);
      });
    };

    // Random timing for realistic request frequency
    const triggerNext = () => {
      generateLog();
      const delay = Math.floor(Math.random() * 2500) + 500; // 0.5s to 3s
      logTimerRef.current = setTimeout(triggerNext, delay);
    };

    const logTimerRef = { current: setTimeout(triggerNext, 1000) };

    return () => clearTimeout(logTimerRef.current);
  }, [isLogStreaming]);

  // Autoscroll terminal
  useEffect(() => {
    if (activeTab === 'vitals' && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, activeTab]);

  const handleExport = () => {
    toast.success('Stats and metrics exported successfully!');
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Dashboard <span className="text-teal-500">Overview</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back! Here's what's happening with HealBridge today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="h-14 px-8 rounded-[1.5rem] bg-slate-900 dark:bg-slate-800 text-white font-black text-sm uppercase tracking-widest hover:bg-teal-500 transition-all shadow-lg flex items-center gap-3 active:scale-95 duration-250 cursor-pointer"
          >
            <Icons.share2 className="w-4 h-4" />
            Export Reports
          </button>
        </div>
      </div>

      {/* Modern Professional Tabs */}
      <div className="flex border-b border-slate-200/60 dark:border-slate-800/80 gap-6">
        {[
          { id: 'overview', label: 'Overview', icon: Icons.activity },
          { id: 'vitals', label: 'System Monitor', icon: Icons.brain },
          { id: 'shortcuts', label: 'Management Shortcuts', icon: Icons.userCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "pb-4 text-sm font-black uppercase tracking-widest italic flex items-center gap-2.5 transition-all duration-300 border-b-2 relative cursor-pointer",
                isActive
                  ? "border-teal-500 text-slate-900 dark:text-white"
                  : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
            >
              <Icon className={cn("w-4 h-4 transition-transform duration-300", isActive && "scale-110")} />
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-500 animate-in fade-in zoom-in-50 duration-350" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* Statistics Grid */}
          <AdminStats data={statsData} isLoading={isLoadingStats} />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Appointments Trend (Area Chart) */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-xl space-y-6">
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
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800/40" vertical={false} />
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
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-xl space-y-6 flex flex-col justify-between">
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
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
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
              <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-lg font-black italic uppercase tracking-widest mb-1">Performance</h4>
                  <p className="text-teal-50 font-medium text-xs mb-6 leading-relaxed">System load distribution is operating at optimal levels.</p>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-black italic tracking-tighter">99.9%</span>
                    <span className="text-xs font-bold uppercase tracking-widest mb-2">Uptime Goal</span>
                  </div>
                </div>
                <Icons.activity className="absolute -bottom-8 -right-8 w-40 h-40 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              </div>

              {/* Actionable To-do Checklist */}
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-200/60 dark:border-slate-800/80">
                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-6">Quick Tasks</h4>
                <div className="space-y-4">
                  {[
                    { title: 'Approve 5 New Doctors', type: 'Verification', color: 'text-orange-500', bg: 'bg-orange-500/10' },
                    { title: 'Update Specialty Icons', type: 'Maintenance', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { title: 'System Backup Required', type: 'Security', color: 'text-red-500', bg: 'bg-red-500/10' },
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 hover:border-teal-500 transition-colors cursor-pointer group">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform", task.bg)}>
                        <Icons.checkCircle className={cn("w-5 h-5", task.color)} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">{task.title}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vitals' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-3 duration-500">
          {/* Live Performance Vitals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'CPU Usage', value: `${cpu}%`, desc: 'Optimized load', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Icons.activity, pct: cpu },
              { label: 'RAM Allocated', value: `${memory} MB`, desc: 'Of 2048MB container', color: 'text-teal-500', bg: 'bg-teal-500/10', icon: Icons.brain, pct: Math.floor((memory / 2048) * 100) },
              { label: 'DB Query Latency', value: `${latency} ms`, desc: 'PostgreSQL instance', color: 'text-purple-500', bg: 'bg-purple-500/10', icon: Icons.users, pct: Math.min(100, Math.floor((latency / 150) * 100)) },
              { label: 'Active Sessions', value: activeSessions.toString(), desc: 'Realtime socket list', color: 'text-orange-500', bg: 'bg-orange-500/10', icon: Icons.userCheck, pct: Math.floor((activeSessions / 100) * 100) },
            ].map((vital, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-lg relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", vital.bg)}>
                    <vital.icon className={cn("w-5 h-5", vital.color)} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">{vital.label}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-black italic text-slate-900 dark:text-white tracking-tight">{vital.value}</div>
                  <div className="text-[10px] font-medium text-slate-400">{vital.desc}</div>
                </div>
                
                {/* Micro loading track */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full mt-4 overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000", 
                      vital.color.replace('text-', 'bg-')
                    )} 
                    style={{ width: `${vital.pct}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Simulated API Gateway Terminal */}
          <div className="bg-slate-950 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl flex flex-col h-[500px]">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 italic flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  healbridge-gateway-log
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLogStreaming(!isLogStreaming)}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest italic px-4 py-2 rounded-xl transition-all cursor-pointer",
                    isLogStreaming 
                      ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" 
                      : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                  )}
                >
                  {isLogStreaming ? 'Pause Logs' : 'Resume Logs'}
                </button>
                <button
                  onClick={() => setLogs([])}
                  className="text-[10px] font-black uppercase tracking-widest italic px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Clear Terminal
                </button>
              </div>
            </div>

            {/* Terminal Logs List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 font-mono text-xs pr-4 custom-scrollbar">
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 font-sans">
                  <Icons.activity className="w-8 h-8 mb-2 animate-pulse" />
                  <p className="text-xs uppercase font-black tracking-widest italic">Gateway idle. Waiting for incoming traffic...</p>
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="flex flex-wrap items-center gap-2 md:gap-4 py-0.5 border-b border-slate-900/50 hover:bg-slate-900/20 px-2 rounded transition-colors">
                    <span className="text-slate-600">[{log.timestamp}]</span>
                    <span className={cn(
                      "font-black tracking-wide",
                      log.method === 'GET' ? 'text-teal-400' :
                      log.method === 'POST' ? 'text-indigo-400' : 'text-amber-400'
                    )}>
                      {log.method}
                    </span>
                    <span className="text-slate-300 flex-1">{log.path}</span>
                    <span className={cn(
                      "font-bold px-2 py-0.5 rounded text-[10px]",
                      log.status >= 400 ? 'bg-red-500/10 text-red-500' :
                      log.status >= 300 ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'
                    )}>
                      {log.status}
                    </span>
                    <span className="text-slate-500 w-16 text-right">{log.latency}ms</span>
                  </div>
                ))
              )}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'shortcuts' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-2">Management Shortcuts</h3>
            <p className="text-slate-400 dark:text-slate-500 font-medium text-xs leading-relaxed max-w-xl">
              Navigate directly to different administrative sections to update records, manage approvals, publish blogs, and tune system variables.
            </p>
          </div>
          <DashboardShortcuts />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;