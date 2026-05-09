'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ScheduleCardProps {
  id: string;
  startDateTime: string;
  endDateTime: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ScheduleCard = ({ id, startDateTime, endDateTime, isSelected, onSelect }: ScheduleCardProps) => {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  return (
    <div 
      onClick={() => onSelect(id)}
      className={cn(
        "group relative p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer overflow-hidden",
        isSelected 
          ? "bg-teal-500 border-teal-500 shadow-2xl shadow-teal-500/20 scale-[1.02]" 
          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-teal-500/30 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none"
      )}
    >
      {/* Background Decor */}
      <div className={cn(
        "absolute -right-6 -top-6 w-24 h-24 rounded-full blur-3xl transition-opacity duration-500",
        isSelected ? "bg-white/20 opacity-100" : "bg-teal-500/5 opacity-0 group-hover:opacity-100"
      )} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500",
            isSelected ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-teal-500/10"
          )}>
            <Icons.calendarClock className={cn("w-6 h-6", isSelected ? "text-white" : "text-teal-500")} />
          </div>
          
          <div className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500",
            isSelected 
              ? "bg-white border-white scale-110" 
              : "border-slate-200 dark:border-slate-700 group-hover:border-teal-500/50"
          )}>
            {isSelected && <Icons.check className="w-4 h-4 text-teal-500 stroke-[4]" />}
          </div>
        </div>

        <div className="space-y-1">
          <p className={cn(
            "text-[10px] font-black uppercase tracking-[0.2em] italic transition-colors duration-500",
            isSelected ? "text-teal-100" : "text-slate-400"
          )}>
            {format(start, 'dd MMMM, yyyy')}
          </p>
          <h3 className={cn(
            "text-xl font-black italic transition-colors duration-500",
            isSelected ? "text-white" : "text-slate-900 dark:text-white"
          )}>
            {format(start, 'hh:mm a')}
          </h3>
          <p className={cn(
            "text-xs font-bold transition-colors duration-500",
            isSelected ? "text-teal-50/70" : "text-slate-500"
          )}>
            Until {format(end, 'hh:mm a')}
          </p>
        </div>

        <div className={cn(
          "mt-6 pt-6 border-t transition-colors duration-500",
          isSelected ? "border-white/10" : "border-slate-50 dark:border-slate-800"
        )}>
          <span className={cn(
            "text-[10px] font-black uppercase tracking-widest italic",
            isSelected ? "text-white" : "text-teal-500"
          )}>
            Available Slot
          </span>
        </div>
      </div>
    </div>
  );
};

export { ScheduleCard };
