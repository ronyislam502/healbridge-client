'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGetAllAppointmentsQuery } from '@/redux/features/appointment/appointmentApi';
import { HBTable } from '@/components/shared/HBTable';

const AppointmentManagement = () => {
  const [activeTab, setActiveTab] = React.useState('ALL');
  const queryParams: Record<string, any> = { limit: 10 };
  if (activeTab !== 'ALL') {
    queryParams.status = activeTab;
  }
  const { data: appointmentsRes, isLoading } = useGetAllAppointmentsQuery(queryParams);

  const appointments = appointmentsRes?.data || [];

  const tabs = [
    { label: 'All Appointments', value: 'ALL' },
    { label: 'Scheduled', value: 'SCHEDULED' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' },
  ];

  const columns = [
    {
      header: 'Doctor',
      key: 'doctor',
      render: (row: any) => (
        <span className="font-bold text-slate-900 dark:text-white">{row.doctor?.name}</span>
      ),
    },
    {
      header: 'Patient',
      key: 'patient',
      render: (row: any) => (
        <span className="font-medium text-slate-500 dark:text-slate-400">{row.patient?.name}</span>
      ),
    },
    {
      header: 'Specialty',
      key: 'specialty',
      render: (row: any) => (
        <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest italic">
          {row.doctor?.doctorSpecialties?.[0]?.specialties?.title || 'General Medicine'}
        </span>
      ),
    },
    {
      header: 'Date & Time',
      key: 'dateTime',
      align: 'center' as const,
      render: (row: any) => (
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
            {row.schedule?.startDateTime ? new Date(row.schedule.startDateTime).toLocaleDateString() : 'N/A'}
          </p>
          <p className="text-[10px] font-black text-slate-400 uppercase italic">
            {row.schedule?.startDateTime ? new Date(row.schedule.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
          </p>
        </div>
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
          row.status === 'INPROGRESS' ? 'bg-purple-500/10 text-purple-500' :
          'bg-red-500/10 text-red-500'
        )}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Fee',
      key: 'fee',
      align: 'right' as const,
      render: (row: any) => (
        <span className="font-black text-slate-900 dark:text-white italic">
          ${row.doctor?.appointmentFee || 0}
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
            Appointment <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitor scheduling activity and manage booking statuses globally.</p>
        </div>
        <div className="flex gap-4">
           <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex items-center gap-3">
             <Icons.calendar className="w-5 h-5" />
             View Calendar
           </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 p-2 bg-slate-100 dark:bg-slate-900 rounded-[1.5rem] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all",
              activeTab === tab.value
                ? "bg-white dark:bg-slate-800 text-teal-500 shadow-sm"
                : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Appointments Table */}
      <HBTable
        columns={columns}
        data={appointments}
        isLoading={isLoading}
        emptyMessage="No appointments found."
        skeletonCount={5}
      />
    </div>
  );
};

export default AppointmentManagement;
