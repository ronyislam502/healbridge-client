'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

import { useGetMyAppointmentsQuery } from '@/redux/features/appointment/appointmentApi';
import { useMyProfilQuery } from '@/redux/features/user/userApi';
import { useGetStatsQuery } from '@/redux/features/statistics/statisticsApi';
import { HBSuspense } from '@/components/shared/HBSuspense';
import { HBTable } from '@/components/shared/HBTable';
import { AIDoctorSuggestion } from './_components/AIDoctorSuggestion';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import CreateReviewModal from '@/components/dialogs/CreateReviewModal';

const PatientDashboard = () => {
  const [reviewModalOpen, setReviewModalOpen] = React.useState(false);
  const [reviewAppointment, setReviewAppointment] = React.useState<any>(null);

  const { data: profileData } = useMyProfilQuery({});
  const { data: appointmentsData, isLoading } = useGetMyAppointmentsQuery({ limit: 5 }, { pollingInterval: 5000 });
  const { data: statsRes, isLoading: isStatsLoading } = useGetStatsQuery({});
  
  const appointments = appointmentsData?.data || [];
  const userName = profileData?.name || 'User';

  const statsData = statsRes?.data;
  const upcomingCount = statsData?.formattedAppointmentStatus?.find((s: any) => s.status === 'SCHEDULED')?.count || 0;
  const prescriptionCount = statsData?.prescriptionCount || 0;
  const appointmentCount = statsData?.appointmentCount || 0;
  const reviewCount = statsData?.reviewCount || 0;

  const stats = [
    { label: 'Upcoming', value: String(upcomingCount), icon: Icons.calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Consultations', value: String(appointmentCount), icon: Icons.activity, color: 'text-teal-500', bg: 'bg-teal-500/10', href: '/patient/appointments' },
    { label: 'Reviews Submitted', value: String(reviewCount), icon: Icons.star, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Prescriptions', value: String(prescriptionCount), icon: Icons.pill, color: 'text-orange-500', bg: 'bg-orange-500/10', href: '/patient/prescriptions' },
  ];

  const chartData = statsData?.formattedAppointmentStatus?.map((item: any) => ({
    name: item.status.charAt(0) + item.status.slice(1).toLowerCase(),
    value: item.count,
  })).filter((item: any) => item.value > 0) || [];

  const COLORS = {
    Scheduled: '#3b82f6',
    Inprogress: '#a855f7',
    Completed: '#10b981',
    Cancelled: '#f43f5e',
  };

  const columns = [
    {
      header: 'Doctor',
      key: 'doctorName',
      render: (row: any) => (
        <span className="font-bold text-slate-900 dark:text-white">
          {row.doctor?.name}
        </span>
      ),
    },
    {
      header: 'Specialty',
      key: 'specialty',
      render: (row: any) => (
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {row.doctor?.doctorSpecialties?.[0]?.specialties?.title}
        </span>
      ),
    },
    {
      header: 'Date',
      key: 'date',
      align: 'center' as const,
      render: (row: any) => (
        <span className="text-sm font-bold text-slate-900 dark:text-white">
          {row.schedule?.startDateTime ? new Date(row.schedule.startDateTime).toLocaleDateString() : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      align: 'right' as const,
      render: (row: any) => (
        <span className={cn(
          "text-[9px] font-black uppercase tracking-widest italic px-3 py-1 rounded-lg",
          row.status === 'COMPLETED' ? 'bg-teal-500/10 text-teal-500' : 'bg-orange-500/10 text-orange-500'
        )}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right' as const,
      render: (row: any) => (
        <div className="flex justify-end gap-2">
          {row.status === 'COMPLETED' && (
            <button
              onClick={() => {
                setReviewAppointment(row);
                setReviewModalOpen(true);
              }}
              title="Leave a Review"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
            >
              <Icons.star className="w-3.5 h-3.5" />
            </button>
          )}
          {row.payment?.receiptUrl ? (
            <a href={row.payment.receiptUrl} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-500/10 text-teal-500 hover:bg-teal-500 hover:text-white transition-colors" title="Download Receipt">
              <Icons.download className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed">
              <Icons.download className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Healthy Day, <span className="text-teal-500">{userName}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your consultations and medical records.</p>
        </div>
        <Link href="/doctors" className="h-14 px-8 rounded-2xl bg-teal-500 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-teal-600 transition-all flex items-center gap-3">
          <Icons.userPlus className="w-5 h-5" />
          Book New Appointment
        </Link>
      </div>

      {/* Stats Grid */}
      <HBSuspense isLoading={isStatsLoading} variant="card" count={4}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const content = (
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:-translate-y-1 transition-all h-full">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", stat.bg)}>
                  <stat.icon className={cn("w-7 h-7", stat.color)} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">{stat.value}</h3>
              </div>
            );

            if (stat.href) {
              return (
                <Link key={idx} href={stat.href}>
                  {content}
                </Link>
              );
            }

            return <div key={idx}>{content}</div>;
          })}
        </div>
      </HBSuspense>

      {/* AI Doctor Suggestion Section */}
      <AIDoctorSuggestion />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Medical History */}
        <div className="xl:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
             <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Recent Consultations</h3>
             <Link href="/patient/medical-reports" className="text-xs font-black text-teal-500 uppercase tracking-widest italic">View All Records</Link>
           </div>
            <HBTable
              columns={columns}
              data={appointments}
              isLoading={isLoading}
              emptyMessage="No appointments found."
              skeletonCount={3}
            />
        </div>

        {/* Health Tips / Next Appointment */}
        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
               <h4 className="text-xl font-black italic uppercase tracking-widest mb-4">Health Tip</h4>
               <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6">"Regular physical activity can improve your muscle strength and boost your endurance."</p>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                    <Icons.activity className="w-5 h-5" />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-widest">Active Lifestyle</span>
               </div>
             </div>
             <Icons.activity className="absolute -bottom-8 -right-8 w-32 h-32 text-white/5 rotate-12" />
           </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Consultation Status</h4>
                <p className="text-xs text-slate-400 font-medium">Real-time status breakdown of your visits</p>
              </div>
              
              {isStatsLoading ? (
                <div className="h-[220px] flex items-center justify-center">
                  <Icons.loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                </div>
              ) : chartData.length === 0 ? (
                <div className="h-[220px] flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                  <Icons.calendar className="w-10 h-10 text-slate-400 mb-3" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No consultations yet</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Book your first appointment to start tracking statistics!</p>
                </div>
              ) : (
                <div className="h-[220px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#94a3b8'} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: 'none',
                          borderRadius: '16px',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic">
                      {statsData?.appointmentCount || 0}
                    </p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Total</p>
                  </div>
                </div>
              )}

              {chartData.length > 0 && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                  {chartData.map((entry: any, idx: number) => {
                    const color = COLORS[entry.name as keyof typeof COLORS] || '#94a3b8';
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{entry.name}: {entry.value}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
        </div>
      </div>

      <CreateReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        appointmentId={reviewAppointment?.id}
        doctorName={reviewAppointment?.doctor?.name}
      />
    </div>
  );
};

export default PatientDashboard;