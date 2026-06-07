import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { HBTableSkeleton } from "./HBSkeletons";

interface Column<T> {
  header: string;
  key: keyof T | string;
  className?: string;
  align?: "left" | "center" | "right";
  render?: (row: T, index?: number) => React.ReactNode;
}

interface HBTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
  className?: string;
  rowClassName?: string;
  skeletonCount?: number;
  showIndex?: boolean;
  onRowClick?: (row: T) => void;
}

const HBTable = <T extends object>({
  columns,
  data,
  isLoading,
  loadingMessage = "Fetching data...",
  emptyMessage = "No records found",
  className,
  rowClassName,
  skeletonCount = 5,
  showIndex = true,
  onRowClick,
}: HBTableProps<T>) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return <HBTableSkeleton rows={skeletonCount} cols={columns.length + (showIndex ? 1 : 0)} className={className} />;
  }

  return (
    <div className={cn("bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <Table className="w-full text-left border-collapse">
          <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
            <TableRow className="hover:bg-transparent border-b border-slate-100 dark:border-slate-800">
              {showIndex && (
                <TableHead className="px-8 py-5 text-[16px] font-bold text-teal-700 uppercase tracking-widest italic h-auto w-16">
                  SL
                </TableHead>
              )}
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    "px-8 py-5 text-[16px] font-bold text-teal-700 uppercase tracking-widest italic h-auto",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.className
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIdx) => (
                <TableRow
                  key={rowIdx}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.closest('button') || target.closest('a') || target.closest('input')) return;
                    onRowClick?.(row);
                  }}
                  className={cn(
                    "group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-none",
                    onRowClick && "cursor-pointer",
                    rowClassName
                  )}
                >
                  {showIndex && (
                    <TableCell className="px-8 py-6 text-sm font-bold text-slate-600 dark:text-slate-400 w-16">
                      {(rowIdx + 1).toString().padStart(2, '0')}
                    </TableCell>
                  )}
                  {columns.map((col, colIdx) => (
                    <TableCell
                      key={colIdx}
                      className={cn(
                        "px-8 py-6",
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right"
                      )}
                    >
                      {col.render ? col.render(row, rowIdx) : (row[col.key as keyof T] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length + (showIndex ? 1 : 0)}
                  className="px-8 py-20 text-center"
                >
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">
                    {emptyMessage}
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export { HBTable };
