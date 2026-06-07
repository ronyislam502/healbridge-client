'use client';

import * as React from 'react';
import Image from 'next/image';
import { Icons } from '@/components/shared/Icons';
import { useGetSingleDoctorQuery } from '@/redux/features/doctor/doctorApi';
import { useGetAllAppointmentsQuery } from '@/redux/features/appointment/appointmentApi';
import { cn } from '@/lib/utils';

interface DoctorDetailsModalProps {
  doctorId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DoctorDetailsModal = ({ doctorId, open, onOpenChange }: DoctorDetailsModalProps) => {
  const { data: doctor, isLoading: isLoadingDoctor } = useGetSingleDoctorQuery(doctorId, { skip: !doctorId });
  const { data: appointmentsRes, isLoading: isLoadingAppointments } = useGetAllAppointmentsQuery({ doctorId, limit: 100 }, { skip: !doctorId });
  const [activeTab, setActiveTab] = React.useState<'overview' | 'appointments' | 'reviews' | 'revenue'>('overview');

  if (isLoadingDoctor || isLoadingAppointments) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
        <Icons.loader2 className="w-10 h-10 text-teal-500 animate-spin" />
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic animate-pulse">
          Retrieving Professional Records...
        </p>
      </div>
    );
  }

  if (!doctor) return null;

  const appointments = appointmentsRes?.data || [];
  const paidAppointments = appointments.filter((app: any) => app.paymentStatus === 'PAID' || app.payment?.status === 'PAID');
  const totalRevenue = paidAppointments.reduce((sum: number, app: any) => sum + (app.payment?.amount || doctor.appointmentFee || 0), 0);
  const completedAppointments = appointments.filter((app: any) => app.status === 'COMPLETED');
  const reviews = doctor.review || [];
  const averageRating = reviews.length > 0 ? (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length).toFixed(1) : 'N/A';

  return (
    <div className="space-y-6">
      {/* Doctor Header card */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-slate-50 dark:bg-slate-950/40 rounded-[2rem] border border-slate-100 dark:border-slate-800/60 animate-in fade-in duration-300">
        <div className="relative w-24 h-24 rounded-[1.5rem] overflow-hidden border-2 border-teal-500/20 shadow-md shrink-0 bg-slate-900 flex items-center justify-center text-white">
          {doctor.avatar ? (
            <Image src={doctor.avatar} alt={doctor.name} fill className="object-cover" />
          ) : (
            <Icons.userCheck className="w-10 h-10" />
          )}
        </div>
        <div className="text-center md:text-left space-y-1 flex-1">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white italic uppercase">{doctor.name}</h3>
          <p className="text-xs font-black text-teal-500 uppercase tracking-widest italic">{doctor.designation} - {doctor.qualification}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">{doctor.email} | {doctor.phone}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800">
        {(['overview', 'appointments', 'reviews', 'revenue'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 pb-3 text-xs font-black uppercase tracking-wider italic border-b-2 transition-all",
              activeTab === tab
                ? "border-teal-500 text-teal-500"
                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[250px]">
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Bookings', value: appointments.length, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Completed', value: completedAppointments.length, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { label: 'Avg Rating', value: averageRating, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { label: 'Revenue Generated', value: `$${totalRevenue.toFixed(0)}`, color: 'text-teal-500', bg: 'bg-teal-500/10' }
              ].map((stat, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
                  <h4 className={cn("text-xl font-black italic", stat.color)}>{stat.value}</h4>
                </div>
              ))}
            </div>

            {/* Profile Fields Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
              <div className="space-y-3 bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-800/40">
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Registration ID</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic">{doctor.registrationNumber}</span></p>
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Experience</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic">{doctor.experience} Years</span></p>
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Consultation Fee</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic">${doctor.appointmentFee}</span></p>
              </div>
              <div className="space-y-3 bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-800/40">
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Current Working Place</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic">{doctor.currentWorkingPlace}</span></p>
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Address</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic">{doctor.address}</span></p>
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Gender</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic uppercase">{doctor.gender}</span></p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {appointments.length === 0 ? (
              <p className="text-center py-8 text-xs font-black text-slate-400 uppercase tracking-widest italic">No bookings recorded.</p>
            ) : (
              <div className="overflow-x-auto max-h-[300px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      <th className="pb-3">Patient</th>
                      <th className="pb-3">Schedule</th>
                      <th className="pb-3 text-center">Status</th>
                      <th className="pb-3 text-right">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((app: any) => (
                      <tr key={app.id} className="border-b border-slate-100/50 dark:border-slate-800/50 last:border-0 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <td className="py-3 font-bold text-slate-900 dark:text-white italic">{app.patient?.name || 'Anonymous'}</td>
                        <td className="py-3">
                          {app.schedule?.startDateTime ? new Date(app.schedule.startDateTime).toLocaleDateString() : 'N/A'} at{' '}
                          {app.schedule?.startDateTime ? new Date(app.schedule.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                        </td>
                        <td className="py-3 text-center">
                          <span className={cn(
                            "px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider",
                            app.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' :
                            app.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                            app.status === 'INPROGRESS' ? 'bg-blue-500/10 text-blue-500' :
                            'bg-slate-500/10 text-slate-500'
                          )}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 text-right font-black text-slate-900 dark:text-white">${app.payment?.amount || doctor.appointmentFee || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-in fade-in duration-300 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {reviews.length === 0 ? (
              <p className="text-center py-8 text-xs font-black text-slate-400 uppercase tracking-widest italic">No patient reviews submitted yet.</p>
            ) : (
              reviews.map((rev: any, idx: number) => (
                <div key={rev.id || idx} className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        {rev.patient?.avatar ? (
                          <Image src={rev.patient.avatar} alt={rev.patient.name || 'Patient'} fill className="object-cover" />
                        ) : (
                          <span className="text-[10px] font-black text-slate-400 uppercase">{rev.patient?.name?.[0] || 'P'}</span>
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white italic">{rev.patient?.name || 'Anonymous Patient'}</h5>
                        <p className="text-[9px] text-slate-400 font-semibold">{new Date(rev.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Icons.star key={i} className={`w-3 h-3 ${i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-800'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic">"{rev.comment}"</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Revenue Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Gross Earnings</p>
                <h4 className="text-2xl font-black italic text-teal-500">${totalRevenue.toFixed(2)}</h4>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Paid Transactions</p>
                <h4 className="text-2xl font-black italic text-blue-500">{paidAppointments.length}</h4>
              </div>
            </div>

            {paidAppointments.length === 0 ? (
              <p className="text-center py-8 text-xs font-black text-slate-400 uppercase tracking-widest italic">No paid transactions found.</p>
            ) : (
              <div className="overflow-x-auto max-h-[200px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      <th className="pb-3">Transaction ID</th>
                      <th className="pb-3">Patient</th>
                      <th className="pb-3 text-center">Status</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paidAppointments.map((app: any) => (
                      <tr key={app.id} className="border-b border-slate-100/50 dark:border-slate-800/50 last:border-0 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <td className="py-3 font-mono text-[10px] font-bold text-slate-500">{app.payment?.transactionId || 'N/A'}</td>
                        <td className="py-3 font-bold text-slate-900 dark:text-white italic">{app.patient?.name || 'Anonymous'}</td>
                        <td className="py-3 text-center">
                          <span className="px-2 py-0.5 rounded-md text-[8px] font-black bg-emerald-500/10 text-emerald-500 uppercase tracking-wide">Paid</span>
                        </td>
                        <td className="py-3 text-right font-black text-slate-900 dark:text-white">${app.payment?.amount || doctor.appointmentFee || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
