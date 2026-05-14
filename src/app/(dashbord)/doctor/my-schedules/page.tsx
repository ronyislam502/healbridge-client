'use client';

import { useGetMySchedulesQuery, useDeleteDoctorScheduleMutation } from '@/redux/features/doctorSchedule/doctorScheduleApi';
import { HBTable } from '@/components/shared/HBTable';
import { toast } from 'sonner';
import { HBSuspense } from '@/components/shared/HBSuspense';
import { format } from 'date-fns';
import { IDoctorSchedule } from '@/types/schedule';
import { TError } from '@/types/global';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/Icons';

const MySchedules = () => {
  const { data, isLoading } = useGetMySchedulesQuery({});
  const [deleteDoctorSchedule, { isLoading: isDeleting }] = useDeleteDoctorScheduleMutation();
  
  const mySchedules: IDoctorSchedule[] = data?.data || [];

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctorSchedule(id).unwrap();
      if (res) {
        toast.success("Schedule removed successfully!");
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message || "Failed to delete schedule.");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            My <span className="text-teal-500">Schedules</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your active time slots and service availability.</p>
        </div>
      </div>

      {/* My Slots Table */}
      <HBSuspense isLoading={isLoading} variant="table" count={5}>
        <HBTable<IDoctorSchedule>
          emptyMessage="You haven't assigned any schedules to yourself yet."
          data={mySchedules}
          columns={[
            { 
              header: "Date", 
              key: "schedule",
              render: (row) => <span className="font-bold text-slate-900 dark:text-white italic">{format(new Date(row.schedule.startDateTime), 'dd MMM yyyy')}</span>
            },
            { 
              header: "Start Time", 
              key: "schedule",
              render: (row) => <span className="font-black text-teal-500 italic uppercase tracking-wider text-xs">{format(new Date(row.schedule.startDateTime), 'hh:mm a')}</span>
            },
            { 
              header: "End Time", 
              key: "schedule",
              render: (row) => <span className="font-black text-teal-500 italic uppercase tracking-wider text-xs">{format(new Date(row.schedule.endDateTime), 'hh:mm a')}</span>
            },
            { 
              header: "Booking Status", 
              key: "isBooked",
              align: "center",
              render: (row) => (
                <span className={cn(
                  "inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic",
                  row.isBooked ? "bg-orange-500/10 text-orange-500" : "bg-emerald-500/10 text-emerald-500"
                )}>
                  {row.isBooked ? "Booked" : "Available"}
                </span>
              )
            },
            { 
              header: "Actions", 
              key: "actions",
              align: "right",
              render: (row) => (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={isDeleting || row.isBooked}
                  onClick={() => handleDelete(row.scheduleId)}
                  className="h-10 w-10 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 disabled:opacity-30"
                >
                  <Icons.close className="w-4 h-4" />
                </Button>
              )
            }
          ]}
        />
      </HBSuspense>
    </div>
  );
};

export default MySchedules;
