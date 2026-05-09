'use client';

import * as React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface HBPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const HBPagination = ({ page, totalPages, onPageChange, className }: HBPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex flex-col items-center gap-6 pt-10 border-t border-slate-100 dark:border-slate-800", className)}>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
        Showing Page <span className="text-slate-900 dark:text-white">{page}</span> of <span className="text-slate-900 dark:text-white">{totalPages}</span>
      </p>
      <Pagination>
        <PaginationContent className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-lg">
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(Math.max(1, page - 1))}
              className={page === 1 ? "pointer-events-none opacity-30" : "cursor-pointer hover:bg-teal-500/10 hover:text-teal-500 rounded-xl transition-all"}
            />
          </PaginationItem>
          
          {/* Smart Pagination: Show limited pages */}
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            
            // Show first, last, and pages around current
            if (
              pageNum === 1 || 
              pageNum === totalPages || 
              (pageNum >= page - 1 && pageNum <= page + 1)
            ) {
              return (
                <PaginationItem key={i}>
                  <PaginationLink 
                    isActive={page === pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={cn(
                      "cursor-pointer rounded-xl transition-all w-10 h-10",
                      page === pageNum 
                        ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20" 
                        : "hover:bg-teal-500/10 hover:text-teal-500"
                    )}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            } 
            
            // Show ellipses
            if (pageNum === page - 2 || pageNum === page + 2) {
              return (
                <PaginationItem key={i}>
                  <span className="px-2 text-slate-300 font-black tracking-widest">...</span>
                </PaginationItem>
              );
            }
            
            return null;
          })}

          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              className={page === totalPages ? "pointer-events-none opacity-30" : "cursor-pointer hover:bg-teal-500/10 hover:text-teal-500 rounded-xl transition-all"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export { HBPagination };
