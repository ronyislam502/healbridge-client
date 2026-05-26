'use client';

import * as React from "react";
import { Icons } from "@/components/shared/Icons";
import { cn } from "@/lib/utils";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface AdminStatsProps {
  data?: any;
  isLoading?: boolean;
}

const AdminStats = ({ data, isLoading }: AdminStatsProps) => {
  const doctorCount = data?.doctorCount || 0;
  const patientCount = data?.patientCount || 0;
  const appointmentCount = data?.appointmentCount || 0;
  const totalRevenue = data?.totalRevenue?._sum?.amount || 0;
  const totalCommission = data?.totalCommission?._sum?.amount || 0;

  const stats = [
    { label: 'Total Doctors', value: isLoading ? '...' : doctorCount.toString(), icon: Icons.userCheck, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500/10 dark:bg-blue-500/20', trend: '+12.5%', glow: 'rgba(59, 130, 246, 0.12)' },
    { label: 'New Patients', value: isLoading ? '...' : patientCount.toString(), icon: Icons.users, color: 'text-teal-500 dark:text-teal-400', bg: 'bg-teal-500/10 dark:bg-teal-500/20', trend: '+18.2%', glow: 'rgba(20, 184, 166, 0.12)' },
    { label: 'Appointments', value: isLoading ? '...' : appointmentCount.toString(), icon: Icons.calendar, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-500/10 dark:bg-purple-500/20', trend: '+5.4%', glow: 'rgba(168, 85, 247, 0.12)' },
    { label: 'Total Revenue', value: isLoading ? '...' : `$${totalRevenue.toLocaleString()}`, icon: Icons.activity, color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-500/10 dark:bg-orange-500/20', trend: '+22.1%', glow: 'rgba(249, 115, 22, 0.12)' },
    { label: 'Commission', value: isLoading ? '...' : `$${totalCommission.toLocaleString()}`, icon: Icons.award, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', trend: '+15.2%', glow: 'rgba(16, 185, 129, 0.12)' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className="rounded-[2rem] shadow-lg group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md overflow-hidden relative"
        >
          {/* Subtle hover glow circle */}
          <div
            className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ backgroundColor: stat.glow }}
          />

          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-7 pt-7 pb-3 z-10 relative">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-1 rounded-lg tracking-wider uppercase">
              {stat.trend}
            </span>
          </CardHeader>
          <CardContent className="px-7 pb-7 z-10 relative">
            <CardTitle className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 italic">
              {stat.label}
            </CardTitle>
            <div className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-300">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { AdminStats };
