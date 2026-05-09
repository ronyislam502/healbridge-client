'use client';

import * as React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * HBCardSkeleton: A premium card skeleton matching the ScheduleCard design.
 */
export const HBCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn(
      "p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden relative",
      className
    )}>
      <div className="flex justify-between items-start mb-6">
        <Skeleton className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        <Skeleton className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>
      
      <div className="space-y-3">
        <Skeleton className="w-24 h-3 rounded-full bg-slate-100 dark:bg-slate-800" />
        <Skeleton className="w-32 h-6 rounded-xl bg-slate-100 dark:bg-slate-800" />
        <Skeleton className="w-20 h-3 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>

      <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
        <Skeleton className="w-24 h-3 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
  );
};

/**
 * HBTableSkeleton: A reusable table skeleton with configurable rows and columns.
 */
export const HBTableSkeleton = ({ rows = 5, cols = 4, className }: { rows?: number; cols?: number; className?: string }) => {
  return (
    <div className={cn("bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              {[...Array(cols)].map((_, i) => (
                <th key={i} className="px-8 py-5">
                  <Skeleton className="w-20 h-3 rounded-full bg-slate-200/50 dark:bg-slate-700/50" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-slate-50 dark:border-slate-800 last:border-none">
                {[...Array(cols)].map((_, colIndex) => (
                  <td key={colIndex} className="px-8 py-6">
                    <Skeleton className={cn(
                      "h-4 rounded-xl bg-slate-100 dark:bg-slate-800",
                      colIndex === 0 ? "w-32" : colIndex === 1 ? "w-24" : "w-16"
                    )} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
