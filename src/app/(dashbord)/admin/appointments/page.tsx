import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Appointment Management | HealBridge',
  description: 'Monitor and manage all medical appointments and scheduling across the platform.',
};

const appointmentsData = [
  { id: 1, doctor: "Dr. Charles Scott", patient: "John Doe", specialty: "Neurology", date: "24 Oct 2023", time: "10:00 AM", status: "Upcoming", fee: "$600" },
  { id: 2, doctor: "Dr. Michael Brown", patient: "Sarah Jenkins", specialty: "Psychiatry", date: "22 Oct 2023", time: "02:30 PM", status: "Completed", fee: "$650" },
  { id: 3, doctor: "Dr. Sarah Johnson", patient: "James Williams", specialty: "Cardiology", date: "21 Oct 2023", time: "11:15 AM", status: "Cancelled", fee: "$700" },
  { id: 4, doctor: "Dr. Emily Davis", patient: "Emily Davis", specialty: "Dermatology", date: "20 Oct 2023", time: "04:00 PM", status: "Upcoming", fee: "$450" },
  { id: 5, doctor: "Dr. Harold Bryant", patient: "Robert Miller", specialty: "Neurology", date: "18 Oct 2023", time: "09:00 AM", status: "Completed", fee: "$500" },
];

const AppointmentManagement = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Appointment <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitor scheduling activity and manage booking statuses globally.</p>
        </div>
        <div className="flex gap-4">
           <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex items-center gap-3">
             <Icons.calendar className="w-5 h-5" />
             View Calendar
           </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 p-2 bg-slate-100 dark:bg-slate-900 rounded-[1.5rem] w-fit">
        {['All Appointments', 'Upcoming', 'Completed', 'Cancelled'].map((tab, idx) => (
          <button key={idx} className={cn(
            "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all",
            idx === 0 ? "bg-white dark:bg-slate-800 text-teal-500 shadow-sm" : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}>
            {tab}
          </button>
        ))}
      </div>

      {/* Appointments Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Doctor</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Patient</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Specialty</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Date & Time</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-right">Fee</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData.map((apt) => (
                <tr key={apt.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 font-bold text-slate-900 dark:text-white">{apt.doctor}</td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 font-medium text-slate-500 dark:text-slate-400">{apt.patient}</td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest italic">{apt.specialty}</span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{apt.date}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase italic">{apt.time}</p>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic ${
                      apt.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                      apt.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-right font-black text-slate-900 dark:text-white italic">{apt.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;
