'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { useGetMyAppointmentsQuery } from '@/redux/features/appointment/appointmentApi';
import { HBTable } from '@/components/shared/HBTable';
import { HBPagination } from '@/components/shared/HBPagination';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import CreateReviewModal from '@/components/dialogs/CreateReviewModal';


const VideoCall = dynamic(() => import('@/components/shared/VideoCall'), { ssr: false });

const PatientAppointments = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;
  const [activeVideoCallId, setActiveVideoCallId] = React.useState<string | null>(null);

  const [reviewModalOpen, setReviewModalOpen] = React.useState(false);
  const [reviewAppointment, setReviewAppointment] = React.useState<any>(null);

  const { data: appointmentsData, isLoading } = useGetMyAppointmentsQuery({
    page,
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }, { pollingInterval: 5000 });

  const appointments = appointmentsData?.data || [];
  const meta = appointmentsData?.meta;

  const columns = [
    {
      header: 'Doctor',
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
      header: 'Consultation Date',
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
      header: 'Payment',
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
          {row.status === 'COMPLETED' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setReviewAppointment(row);
                setReviewModalOpen(true);
              }}
              title="Leave a Review"
              className="h-10 w-10 p-0 rounded-xl bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
            >
              <Icons.star className="w-4 h-4" />
            </Button>
          )}
          {row.payment?.receiptUrl ? (
            <Button variant="ghost" size="sm" asChild className="h-10 w-10 p-0 rounded-xl hover:bg-teal-500/10 hover:text-teal-500">
              <a href={row.payment.receiptUrl} target="_blank" rel="noreferrer" title="Download Receipt">
                <Icons.fileText className="w-4 h-4" />
              </a>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" disabled className="h-10 w-10 p-0 rounded-xl opacity-50 cursor-not-allowed">
              <Icons.fileText className="w-4 h-4" />
            </Button>
          )}
          {row.status !== 'CANCELLED' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveVideoCallId(row.videoCallingId)}
              className="h-10 w-10 p-0 rounded-xl hover:bg-blue-500/10 hover:text-blue-500"
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
            My <span className="text-teal-500">Appointments</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">View and manage all your scheduled consultations.</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="space-y-8">
        <HBTable
          columns={columns}
          data={appointments}
          isLoading={isLoading}
          emptyMessage="You haven't booked any appointments yet."
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

      <CreateReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        appointmentId={reviewAppointment?.id}
        doctorName={reviewAppointment?.doctor?.name}
      />
    </div>
  );
};

export default PatientAppointments;
