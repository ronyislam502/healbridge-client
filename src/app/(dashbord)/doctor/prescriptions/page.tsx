'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { useGetMyPrescriptionsQuery } from '@/redux/features/prescription/prescriptionApi';
import { HBTable } from '@/components/shared/HBTable';
import { HBPagination } from '@/components/shared/HBPagination';
import { Button } from '@/components/ui/button';

const DoctorPrescriptions = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const { data: prescriptionsData, isLoading } = useGetMyPrescriptionsQuery({ 
    page, 
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const prescriptions = prescriptionsData?.data || [];
  const meta = prescriptionsData?.meta;

  const columns = [
    {
      header: 'Patient Name',
      key: 'patient',
      render: (row: any) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Icons.users className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white italic">{row.patient?.name}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered Patient</p>
          </div>
        </div>
      )
    },
    {
      header: 'Issue Date',
      key: 'date',
      align: 'center' as const,
      render: (row: any) => (
        <div className="space-y-1">
          <p className="font-bold text-slate-900 dark:text-white text-sm">
            {new Date(row.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
          <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest italic">Prescription ID: {row.id?.slice(0, 8)}</p>
        </div>
      )
    },
    {
      header: 'Instructions',
      key: 'instructions',
      render: (row: any) => (
        <div className="max-w-[300px]">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-2 italic">
            {row.instructions || "No specific instructions recorded."}
          </p>
        </div>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right' as const,
      render: (row: any) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest italic hover:bg-slate-900 hover:text-white transition-all">
            Edit
          </Button>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-blue-500/10 hover:text-blue-500">
            <Icons.fileText className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Issued <span className="text-teal-500">Prescriptions</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage and track prescriptions issued to your patients.</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="space-y-8">
        <HBTable 
          columns={columns} 
          data={prescriptions} 
          isLoading={isLoading}
          emptyMessage="You haven't issued any prescriptions yet."
          skeletonCount={5}
        />

        {meta && meta.totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <HBPagination
              totalPages={meta.totalPages}
              page={page}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPrescriptions;
