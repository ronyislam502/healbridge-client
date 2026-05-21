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
    { label: 'Total Doctors', value: isLoading ? '...' : doctorCount.toString(), icon: Icons.userCheck, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+12.5%' },
    { label: 'New Patients', value: isLoading ? '...' : patientCount.toString(), icon: Icons.users, color: 'text-teal-500', bg: 'bg-teal-500/10', trend: '+18.2%' },
    { label: 'Appointments', value: isLoading ? '...' : appointmentCount.toString(), icon: Icons.calendar, color: 'text-purple-500', bg: 'bg-purple-500/10', trend: '+5.4%' },
    { label: 'Total Revenue', value: isLoading ? '...' : `$${totalRevenue.toLocaleString()}`, icon: Icons.activity, color: 'text-orange-500', bg: 'bg-orange-500/10', trend: '+22.1%' },
    { label: 'Commission', value: isLoading ? '...' : `$${totalCommission.toLocaleString()}`, icon: Icons.award, color: 'text-emerald-500', bg: 'bg-emerald-500/10', trend: '+15.2%' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <Card key={idx} className="rounded-[2.5rem] shadow-xl group hover:-translate-y-1 transition-all duration-300 border-slate-100 dark:border-slate-800 border bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-8 pt-8 pb-4">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
            <span className="text-emerald-500 text-xs font-black bg-emerald-500/10 px-3 py-1 rounded-lg">
              {stat.trend}
            </span>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">
              {stat.label}
            </CardTitle>
            <div className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { AdminStats };
