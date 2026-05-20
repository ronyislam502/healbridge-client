'use client';

import * as React from "react";
import { Icons } from "@/components/shared/Icons";
import { cn } from "@/lib/utils";
import { HBTable } from "@/components/shared/HBTable";

interface RecentAppointmentsProps {
  data: any[];
  isLoading?: boolean;
}

const RecentAppointments = ({ data, isLoading }: RecentAppointmentsProps) => {
  const columns = [
    {
      header: 'Doctor',
      key: 'doctor',
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
            <Icons.userCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white">{row.doctor?.name}</span>
        </div>
      ),
    },
    {
      header: 'Patient',
      key: 'patient',
      render: (row: any) => (
        <span className="font-medium text-slate-500 dark:text-slate-400">
          {row.patient?.name}
        </span>
      ),
    },
    {
      header: 'Date & Time',
      key: 'dateTime',
      render: (row: any) => (
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
            {row.schedule?.startDateTime ? new Date(row.schedule.startDateTime).toLocaleDateString() : 'N/A'}
          </p>
          <p className="text-[10px] font-black text-teal-500 uppercase italic">
            {row.schedule?.startDateTime ? new Date(row.schedule.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
          </p>
        </div>
      ),
    },
    {
      header: 'Amount',
      key: 'amount',
      render: (row: any) => (
        <span className="font-black text-slate-900 dark:text-white italic">
          {row.payment?.amount ? `$${row.payment.amount}` : `$${row.doctor?.appointmentFee || 0}`}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      align: 'center' as const,
      render: (row: any) => (
        <span className={cn(
          "inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic",
          row.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' :
          row.status === 'SCHEDULED' ? 'bg-blue-500/10 text-blue-500' :
          'bg-red-500/10 text-red-500'
        )}>
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Recent Appointments</h3>
        <button className="text-xs font-black text-teal-500 hover:text-teal-600 uppercase tracking-widest italic transition-colors">
          View All
        </button>
      </div>

      <HBTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyMessage="No recent appointments in system."
        skeletonCount={4}
      />
    </div>
  );
};

export { RecentAppointments };
