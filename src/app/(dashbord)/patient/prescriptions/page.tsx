'use client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { useGetMyPrescriptionsQuery } from '@/redux/features/prescription/prescriptionApi';
import { HBTable } from '@/components/shared/HBTable';
import { HBPagination } from '@/components/shared/HBPagination';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';

const PatientPrescriptions = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const handleDownloadPdf = async (prescriptionId: string) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await fetch(`${BACKEND_URL}/api/v1/prescriptions/${prescriptionId}/pdf`, {
        headers: {
          Authorization: token ? `${token}` : "",
        },
      });
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `Prescription-${prescriptionId.substring(0, 8)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const { data: prescriptionsData, isLoading } = useGetMyPrescriptionsQuery({
    page,
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const prescriptions = prescriptionsData?.data || [];
  const meta = prescriptionsData?.meta;

  console.log(prescriptions)

  const columns = [
    {
      header: 'Prescribing Doctor',
      key: 'doctor',
      render: (row: any) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
            <Icons.userCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white italic">{row.doctor?.name}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical Specialist</p>
          </div>
        </div>
      )
    },
    {
      header: 'Appointment Date',
      key: 'date',
      align: 'center' as const,
      render: (row: any) => (
        <div className="space-y-1">
          <p className="font-bold text-slate-900 dark:text-white text-sm">
            {new Date(row.appointment?.schedule?.startDate || row.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
          <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest italic">Consultation Record</p>
        </div>
      )
    },
    {
      header: 'Instructions',
      key: 'instructions',
      render: (row: any) => (
        <div className="max-w-[300px]">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-2 italic">
            {row.instructions || "Standard medical instructions provided."}
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
          {row.pdfUrl ? (
            <>
              <Button asChild variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest italic hover:bg-teal-500 hover:text-white transition-all">
                <a href={row.pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Icons.scrollText className="w-4 h-4" />
                  View Full
                </a>
              </Button>
            </>
          ) : (
            <span className="text-xs text-slate-400 italic font-medium">Processing PDF...</span>
          )}
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
            My <span className="text-teal-500">Prescriptions</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Access and review all your medical prescriptions and dosages.</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="space-y-8">
        <HBTable
          columns={columns}
          data={prescriptions}
          isLoading={isLoading}
          emptyMessage="No prescriptions found in your record."
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

export default PatientPrescriptions;
