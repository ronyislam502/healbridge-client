'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { useGetMyAppointmentsQuery } from '@/redux/features/appointment/appointmentApi';
import { HBTable } from '@/components/shared/HBTable';
import { HBPagination } from '@/components/shared/HBPagination';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import CreatePrescriptionDialog from '@/components/dialogs/CreatePrescriptionDialog';
const VideoCall = dynamic(() => import('@/components/shared/VideoCall'), { ssr: false });

const DoctorAppointments = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] = React.useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = React.useState<string | null>(null);
  const [activeVideoCallId, setActiveVideoCallId] = React.useState<string | null>(null);

  const { data: appointmentsData, isLoading } = useGetMyAppointmentsQuery({
    page,
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const appointments = appointmentsData?.data || [];
  const meta = appointmentsData?.meta;

  const columns = [
    {
      header: 'Patient',
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
      header: 'Schedule',
      key: 'date',
      align: 'center' as const,
      render: (row: any) => (
        <div className="space-y-1">
          <p className="font-bold text-slate-900 dark:text-white text-sm">
            {new Date(row.schedule?.startDateTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
          <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest">
            {new Date(row.schedule?.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      align: 'center' as const,
      render: (row: any) => (
        <span className={cn(
          "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic",
          row.status === 'COMPLETED' ? 'bg-teal-500/10 text-teal-500' :
            row.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
              'bg-orange-500/10 text-orange-500'
        )}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Payment Status',
      key: 'payment',
      align: 'center' as const,
      render: (row: any) => (
        <span className={cn(
          "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic",
          row.paymentStatus === 'PAID' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
        )}>
          {row.paymentStatus}
        </span>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right' as const,
      render: (row: any) => (
        <div className="flex items-center justify-end gap-2">
          {row.status === 'COMPLETED' && row.paymentStatus === 'PAID' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedAppointmentId(row.id);
                setPrescriptionDialogOpen(true);
              }}
              className="h-9 rounded-xl border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-widest italic hover:bg-teal-500 hover:text-white transition-all"
              title="Write Prescription"
            >
              Write Prescription
            </Button>
          )}
          {row.status !== 'CANCELLED' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveVideoCallId(row.videoCallingId)}
              className="h-9 w-9 p-0 rounded-xl hover:bg-blue-500/10 hover:text-blue-500"
            >
              <Icons.video className="w-4 h-4" />
            </Button>
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
            Patient <span className="text-teal-500">Appointments</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage and review your patient consultation requests.</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="space-y-8">
        <HBTable
          columns={columns}
          data={appointments}
          isLoading={isLoading}
          emptyMessage="No patient appointments found."
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

      <CreatePrescriptionDialog
        open={prescriptionDialogOpen}
        onOpenChange={setPrescriptionDialogOpen}
        appointmentId={selectedAppointmentId}
      />

      {activeVideoCallId && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-auto">
          <Button
            variant="ghost"
            onClick={() => setActiveVideoCallId(null)}
            className="absolute top-4 left-4 z-[110] text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full h-10 w-10 p-0"
          >
            <Icons.arrowLeft className="w-6 h-6" />
          </Button>
          <VideoCall
            videoCallingId={activeVideoCallId}
            onClose={() => setActiveVideoCallId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
