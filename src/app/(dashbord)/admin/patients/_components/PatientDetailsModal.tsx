'use client';

import * as React from 'react';
import Image from 'next/image';
import { Icons } from '@/components/shared/Icons';
import { useGetSinglePatientQuery } from '@/redux/features/patient/patientApi';
import { useGetAllAppointmentsQuery } from '@/redux/features/appointment/appointmentApi';
import { useGetAllReviewsQuery } from '@/redux/features/review/reviewApi';
import { cn } from '@/lib/utils';

interface PatientDetailsModalProps {
  patientId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PatientDetailsModal = ({ patientId, open, onOpenChange }: PatientDetailsModalProps) => {
  const { data: patientRes, isLoading: isLoadingPatient } = useGetSinglePatientQuery(patientId, { skip: !patientId });
  const { data: appointmentsRes, isLoading: isLoadingAppointments } = useGetAllAppointmentsQuery({ patientId, limit: 100 }, { skip: !patientId });
  const { data: reviewsRes, isLoading: isLoadingReviews } = useGetAllReviewsQuery({ patientId, limit: 100 }, { skip: !patientId });
  const [activeTab, setActiveTab] = React.useState<'overview' | 'appointments' | 'reviews' | 'reports'>('overview');

  if (isLoadingPatient || isLoadingAppointments || isLoadingReviews) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
        <Icons.loader2 className="w-10 h-10 text-teal-500 animate-spin" />
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic animate-pulse">
          Retrieving Patient Health Records...
        </p>
      </div>
    );
  }

  const patient = patientRes?.data;
  if (!patient) return null;

  const appointments = appointmentsRes?.data || [];
  const reviews = reviewsRes?.data || [];
  const paidAppointments = appointments.filter((app: any) => app.paymentStatus === 'PAID' || app.payment?.status === 'PAID');
  const totalSpending = paidAppointments.reduce((sum: number, app: any) => sum + (app.payment?.amount || 0), 0);
  const completedAppointments = appointments.filter((app: any) => app.status === 'COMPLETED');
  const healthData = patient.patientHealthData;
  const reports = patient.medicalReport || [];

  return (
    <div className="space-y-6">
      {/* Patient Header card */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-slate-50 dark:bg-slate-950/40 rounded-[2rem] border border-slate-100 dark:border-slate-800/60 animate-in fade-in duration-300">
        <div className="relative w-24 h-24 rounded-[1.5rem] overflow-hidden border-2 border-teal-500/20 shadow-md shrink-0 bg-slate-900 flex items-center justify-center text-white">
          {patient.avatar ? (
            <Image src={patient.avatar} alt={patient.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-teal-500/10 flex items-center justify-center text-teal-500 font-black text-3xl italic">
              {patient.name?.charAt(0) || 'P'}
            </div>
          )}
        </div>
        <div className="text-center md:text-left space-y-1 flex-1">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white italic uppercase">{patient.name}</h3>
          <p className="text-xs font-black text-teal-500 uppercase tracking-widest italic">Patient Account</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">{patient.email} | {patient.phone || 'No Contact'}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800">
        {(['overview', 'appointments', 'reviews', 'reports'] as const).map((tab) => (
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
                { label: 'Reviews Left', value: reviews.length, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { label: 'Total Spending', value: `$${totalSpending.toFixed(0)}`, color: 'text-teal-500', bg: 'bg-teal-500/10' }
              ].map((stat, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
                  <h4 className={cn("text-xl font-black italic", stat.color)}>{stat.value}</h4>
                </div>
              ))}
            </div>

            {/* Health Data & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
              <div className="space-y-3 bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-800/40">
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Date of Birth</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic">{healthData?.dateOfBirth ? new Date(healthData.dateOfBirth).toLocaleDateString() : 'N/A'}</span></p>
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Gender</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic uppercase">{patient.gender || 'Not specified'}</span></p>
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Blood Group</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic">{healthData?.bloodGroup || 'N/A'}</span></p>
              </div>
              <div className="space-y-3 bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-800/40">
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Height / Weight</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic">{healthData?.height || 'N/A'} / {healthData?.weight || 'N/A'}</span></p>
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Marital Status</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic uppercase">{healthData?.maritalStatus || 'N/A'}</span></p>
                <p><span className="font-bold text-slate-400 uppercase text-[9px] block">Contact Number</span> <span className="text-slate-900 dark:text-white font-bold text-sm italic">{patient.phone || 'N/A'}</span></p>
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
                      <th className="pb-3">Doctor</th>
                      <th className="pb-3">Schedule</th>
                      <th className="pb-3 text-center">Status</th>
                      <th className="pb-3 text-right">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((app: any) => (
                      <tr key={app.id} className="border-b border-slate-100/50 dark:border-slate-800/50 last:border-0 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <td className="py-3 font-bold text-slate-900 dark:text-white italic">{app.doctor?.name || 'Unknown Doctor'}</td>
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
                        <td className="py-3 text-right font-black text-slate-900 dark:text-white">${app.payment?.amount || app.doctor?.appointmentFee || 0}</td>
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
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white italic">To: {rev.doctor?.name || 'Doctor'}</h5>
                      <p className="text-[9px] text-slate-400 font-semibold">{new Date(rev.createdAt).toLocaleDateString()}</p>
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

        {activeTab === 'reports' && (
          <div className="space-y-4 animate-in fade-in duration-300 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {reports.length === 0 ? (
              <p className="text-center py-8 text-xs font-black text-slate-400 uppercase tracking-widest italic">No medical reports uploaded.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {reports.map((report: any, idx: number) => (
                  <div key={report.id || idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500">
                        <Icons.scrollText className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white italic">{report.reportName || 'Medical Report'}</h5>
                        <p className="text-[9px] text-slate-400 font-semibold">Uploaded: {new Date(report.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {report.reportLink && (
                      <a 
                        href={report.reportLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-black text-teal-500 hover:text-teal-600 uppercase tracking-widest flex items-center gap-1 hover:underline"
                      >
                        <Icons.eye className="w-3.5 h-3.5" />
                        View
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
