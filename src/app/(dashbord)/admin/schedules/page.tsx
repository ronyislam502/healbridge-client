'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScheduleModal } from '@/components/dashboard/ScheduleModal';
import { AssignScheduleModal } from '@/components/dashboard/AssignScheduleModal';
import { useGetAllSchedulesQuery } from '@/redux/features/schedule/scheduleApi';
import { useGetAllDoctorSchedulesQuery } from '@/redux/features/doctorSchedule/doctorScheduleApi';
import { format } from 'date-fns';
import { HBTable } from '@/components/shared/HBTable';
import { Schedule } from '@/types/specialty';

const ScheduleManagement = () => {
  const { data: schedulesData, isLoading: isLoadingSchedules } = useGetAllSchedulesQuery({});
  const { data: doctorSchedulesData, isLoading: isLoadingDoctorSchedules } = useGetAllDoctorSchedulesQuery({});

  const schedules = schedulesData?.data || [];
  const doctorSchedules = doctorSchedulesData?.data || [];

  const totalGlobalSlots = schedules.length;
  const activeAssignments = doctorSchedules.length;
  const bookedSessions = doctorSchedules.filter((ds: any) => ds.isBooked).length;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Schedule <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Define time slots and assign medical experts to shifts.</p>
        </div>
        <div className="flex gap-4">
           <ScheduleModal
             trigger={
               <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex items-center gap-3">
                 <Icons.plus className="w-5 h-5" />
                 Create Slot
               </Button>
             }
           />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Global Slots', value: isLoadingSchedules ? '...' : totalGlobalSlots.toString(), icon: Icons.activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Active Assignments', value: isLoadingDoctorSchedules ? '...' : activeAssignments.toString(), icon: Icons.userCheck, color: 'text-teal-500', bg: 'bg-teal-500/10' },
          { label: 'Booked Sessions', value: isLoadingDoctorSchedules ? '...' : bookedSessions.toString(), icon: Icons.calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center gap-6">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", stat.bg)}>
              <stat.icon className={cn("w-8 h-8", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white italic">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          Global Time Slots Registry
        </h3>

        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs font-bold outline-none focus:border-teal-500 transition-colors"
            />
          </div>
          <Button variant="outline" className="h-12 w-12 p-0 rounded-xl border-slate-100 dark:border-slate-800">
            <Icons.filter className="w-4 h-4 text-slate-500" />
          </Button>
        </div>
      </div>

      <HBTable<Schedule> 
        isLoading={isLoadingSchedules}
        loadingMessage="Synchronizing Schedules..."
        emptyMessage="No schedules found"
        data={schedules}
        columns={[
          { 
            header: "Date", 
            key: "startDateTime",
            render: (row) => <span className="font-bold text-slate-900 dark:text-white italic">{format(new Date(row.startDateTime), 'dd MMM yyyy')}</span>
          },
          { 
            header: "Start Time", 
            key: "startDateTime",
            render: (row) => <span className="font-black text-teal-500 italic uppercase tracking-wider text-xs">{format(new Date(row.startDateTime), 'hh:mm a')}</span>
          },
          { 
            header: "End Time", 
            key: "endDateTime",
            render: (row) => <span className="font-black text-teal-500 italic uppercase tracking-wider text-xs">{format(new Date(row.endDateTime), 'hh:mm a')}</span>
          },
          { 
            header: "Status", 
            key: "id",
            align: "center",
            render: () => (
              <span className="inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic bg-emerald-500/10 text-emerald-500">
                Available
              </span>
            )
          },
          { 
            header: "Actions", 
            key: "id",
            align: "right",
            render: (row) => (
              <div className="flex justify-end gap-2">
                <AssignScheduleModal
                  scheduleId={row.id}
                  trigger={
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-500">
                      <Icons.userPlus className="w-4 h-4" />
                    </Button>
                  }
                />
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500">
                  <Icons.close className="w-4 h-4" />
                </Button>
              </div>
            )
          }
        ]}
      />
    </div>
  );
};

export default ScheduleManagement;
