'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { IScheduleFilters } from '@/types/schedule';

interface ScheduleFilterBarProps {
  onFilterChange: (filters: Partial<IScheduleFilters>) => void;
  filters: IScheduleFilters;
}

const ScheduleFilterBar = ({ onFilterChange, filters }: ScheduleFilterBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic ml-1">Start Date</label>
          <div className="relative group">
            <Icons.calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <input 
              type="date" 
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-teal-500/50 rounded-2xl text-sm font-bold outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic ml-1">End Date</label>
          <div className="relative group">
            <Icons.calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <input 
              type="date" 
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-teal-500/50 rounded-2xl text-sm font-bold outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Time Range */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic ml-1">Start Time</label>
          <div className="relative group">
            <Icons.activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <input 
              type="time" 
              name="startTime"
              value={filters.startTime}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-teal-500/50 rounded-2xl text-sm font-bold outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic ml-1">End Time</label>
          <div className="relative group">
            <Icons.activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <input 
              type="time" 
              name="endTime"
              value={filters.endTime}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-teal-500/50 rounded-2xl text-sm font-bold outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button 
          variant="ghost" 
          onClick={() => onFilterChange({ startDate: '', endDate: '', startTime: '', endTime: '' })}
          className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2"
        >
          <Icons.close className="w-4 h-4" />
          Reset All Filters
        </Button>
      </div>
    </div>
  );
};

export { ScheduleFilterBar };
