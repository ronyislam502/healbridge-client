import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number, columns?: number }) => {
  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Table Container Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="w-full min-w-[600px]">
            {/* Table Header */}
            <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between">
              {[...Array(columns)].map((_, i) => (
                <Skeleton key={i} className="h-3 w-20 rounded-full opacity-40" />
              ))}
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-slate-50 dark:divide-slate-800">
              {[...Array(rows)].map((_, i) => (
                <div key={i} className="px-8 py-6 flex justify-between items-center group">
                  {[...Array(columns)].map((_, j) => (
                    <Skeleton 
                      key={j} 
                      className={cn(
                        "h-4 w-24 rounded-full",
                        j === 0 && "h-5 w-32", // First column (e.g. Name)
                        j === columns - 1 && "h-8 w-20 rounded-xl" // Last column (e.g. Action Button)
                      )} 
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CardSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
          <Skeleton className="relative h-64 w-full rounded-[2rem]" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-3/4 rounded-full" />
            <div className="flex items-center gap-2 pt-2">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-12 w-28 rounded-2xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const DoctorProfileSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Side - Image Skeleton */}
        <Skeleton className="w-full lg:w-80 h-[450px] rounded-[2.5rem] shadow-2xl" />
        
        {/* Right Side - Info Skeleton */}
        <div className="flex-1 space-y-8 w-full">
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 rounded-2xl" />
            <div className="flex gap-3">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-[1.5rem]" />
            ))}
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-2/3 rounded-full" />
          </div>
          
          <div className="flex gap-4">
            <Skeleton className="h-16 w-44 rounded-2xl" />
            <Skeleton className="h-16 w-44 rounded-2xl shadow-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
