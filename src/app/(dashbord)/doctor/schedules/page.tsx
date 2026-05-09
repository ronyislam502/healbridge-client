'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { useGetAllSchedulesQuery } from '@/redux/features/schedule/scheduleApi';
import { useCreateDoctorScheduleMutation } from '@/redux/features/doctorSchedule/doctorScheduleApi';
import { toast } from 'sonner';
import { ScheduleFilterBar } from '@/components/dashboard/ScheduleFilterBar';
import { ScheduleCard } from '@/components/dashboard/ScheduleCard';
import { HBPagination } from '@/components/shared/HBPagination';
import { HBSuspense } from '@/components/shared/HBSuspense';
import { ISchedule, IScheduleFilters } from '@/types/schedule';
import { TError } from '@/types/global';

const DoctorScheduleManagement = () => {
  const [selectedSchedules, setSelectedSchedules] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);
  const [filters, setFilters] = React.useState<IScheduleFilters>({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  
  const { data, isLoading, isFetching } = useGetAllSchedulesQuery({
    page,
    limit,
    ...filters
  }, {
    refetchOnMountOrArgChange: true
  });
  
  const [createDoctorSchedule, { isLoading: isAssigning }] = useCreateDoctorScheduleMutation();
  
  const schedules: ISchedule[] = data?.data || [];
  const meta = data?.meta;

  const handleFilterChange = (newFilters: Partial<IScheduleFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page on filter change
  };

  const handleSelect = (id: string) => {
    setSelectedSchedules((prev) => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (selectedSchedules.length === 0) {
      toast.error("Please select at least one schedule slot.");
      return;
    }

    try {
      const res = await createDoctorSchedule({ scheduleIds: selectedSchedules }).unwrap();
      if (res) {
        toast.success("Schedules assigned successfully!");
        setSelectedSchedules([]);
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message || "Failed to assign schedules.");
    }
  };

  return (
    <div className="min-h-screen pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Schedule <span className="text-teal-500">Selection</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Filter and select the best time slots for your practice.</p>
        </div>
        
        {meta && (
          <div className="px-6 py-3 bg-teal-500/10 rounded-2xl border border-teal-500/20">
            <p className="text-xs font-black uppercase tracking-widest text-teal-600 italic">Total Available</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{meta.total} Slots</p>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <ScheduleFilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Grid Content */}
      <HBSuspense isLoading={isLoading || isFetching} variant="card" count={limit}>
        {schedules.length > 0 ? (
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {schedules.map((schedule) => (
                <ScheduleCard 
                  key={schedule.id}
                  id={schedule.id}
                  startDateTime={schedule.startDateTime}
                  endDateTime={schedule.endDateTime}
                  isSelected={selectedSchedules.includes(schedule.id)}
                  onSelect={handleSelect}
                />
              ))}
            </div>

            {/* Pagination */}
            {meta && (
              <HBPagination 
                page={page}
                totalPages={meta.totalPages || 1} 
                onPageChange={setPage}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8 relative">
               <div className="absolute inset-0 bg-teal-500/5 rounded-full animate-ping" />
              <Icons.calendarClock className="w-12 h-12 text-slate-300 relative z-10" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white italic">No matches found</h3>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">We couldn't find any slots matching your criteria. Try widening your search window.</p>
            <Button 
              variant="outline" 
              onClick={() => handleFilterChange({ startDate: '', endDate: '', startTime: '', endTime: '' })}
              className="mt-8 rounded-xl border-slate-100 dark:border-slate-800 font-bold"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </HBSuspense>

      {/* Floating Action Bar */}
      {selectedSchedules.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500 w-full max-w-2xl px-6">
          <div className="bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Icons.check className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest italic">Selection Active</span>
                <p className="text-white text-lg font-black italic">{selectedSchedules.length} Slots Selected</p>
              </div>
            </div>
            
            <div className="flex gap-4">
               <Button 
                variant="ghost"
                onClick={() => setSelectedSchedules([])}
                className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl px-6 font-bold"
              >
                Clear
              </Button>
              <Button 
                onClick={handleAssign}
                disabled={isAssigning}
                className="bg-teal-500 hover:bg-teal-600 text-white px-10 rounded-2xl h-14 font-black uppercase tracking-widest italic shadow-xl shadow-teal-500/20 flex items-center gap-3 group"
              >
                {isAssigning ? <Icons.loader2 className="w-5 h-5 animate-spin" /> : <Icons.check className="w-5 h-5 group-hover:scale-125 transition-transform" />}
                Confirm Assignment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorScheduleManagement;
