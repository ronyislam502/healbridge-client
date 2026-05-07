'use client';

import React from 'react';
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ShadcnPagination className="mt-16">
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={cn(
              "h-12 rounded-2xl border border-slate-200 bg-white px-4 text-slate-600 hover:bg-teal-500 hover:text-white transition-all",
              currentPage === 1 && "opacity-50 pointer-events-none"
            )}
            text="Prev"
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
              className={cn(
                "h-12 w-12 rounded-2xl font-bold transition-all",
                currentPage === page
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20 border-teal-500 hover:bg-teal-600 hover:text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-500 hover:bg-white"
              )}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && <PaginationEllipsis className="text-slate-400" />}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={cn(
              "h-12 rounded-2xl border border-slate-200 bg-white px-4 text-slate-600 hover:bg-teal-500 hover:text-white transition-all",
              currentPage === totalPages && "opacity-50 pointer-events-none"
            )}
            text="Next"
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export { Pagination };
