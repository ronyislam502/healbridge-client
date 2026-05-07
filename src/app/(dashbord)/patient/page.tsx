import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const metadata = {
  title: 'Patient Dashboard | HealBridge',
  description: 'Track your appointments, medical records, and consultations.',
};

const stats = [
  { label: 'Upcoming', value: '2', icon: Icons.calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Consultations', value: '18', icon: Icons.activity, color: 'text-teal-500', bg: 'bg-teal-500/10' },
  { label: 'Medical Records', value: '5', icon: Icons.microscope, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { label: 'Prescriptions', value: '12', icon: Icons.pill, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

const medicalHistory = [
  { id: 1, doctor: 'Dr. Charles Scott', specialty: 'Neurology', date: '15 Oct 2023', status: 'Completed', report: 'Download' },
  { id: 2, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '01 Oct 2023', status: 'Completed', report: 'Download' },
  { id: 3, doctor: 'Dr. Emily Davis', specialty: 'Dermatology', date: '20 Sep 2023', status: 'Cancelled', report: '-' },
];

const PatientDashboard = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Healthy Day, <span className="text-teal-500">John</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">You have an upcoming appointment in 2 days.</p>
        </div>
        <button className="h-14 px-8 rounded-2xl bg-teal-500 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-teal-600 transition-all flex items-center gap-3">
          <Icons.userPlus className="w-5 h-5" />
          Book New Appointment
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:-translate-y-1 transition-all">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", stat.bg)}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Medical History */}
        <div className="xl:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
             <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Recent Consultations</h3>
             <button className="text-xs font-black text-teal-500 uppercase tracking-widest italic">View All Records</button>
           </div>
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-slate-50 dark:bg-slate-800/50">
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Doctor</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Specialty</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Date</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-right">Report</th>
                   </tr>
                 </thead>
                 <tbody>
                   {medicalHistory.map((history) => (
                     <tr key={history.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                       <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 font-bold text-slate-900 dark:text-white">{history.doctor}</td>
                       <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400">{history.specialty}</td>
                       <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center text-sm font-bold text-slate-900 dark:text-white">{history.date}</td>
                       <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-right">
                         {history.report !== '-' ? (
                           <button className="flex items-center gap-2 text-[10px] font-black text-teal-500 uppercase tracking-widest italic hover:text-teal-600 ml-auto">
                             <Icons.activity className="w-3.5 h-3.5" />
                             {history.report}
                           </button>
                         ) : <span className="text-slate-400 font-bold">-</span>}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
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

           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
             <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-6">Prescription Status</h4>
             <div className="space-y-4">
               {[
                 { name: 'Amoxicillin', dose: '500mg, 3x Day', status: 'Ready' },
                 { name: 'Lisinopril', dose: '10mg, 1x Day', status: 'Pending' },
               ].map((med, idx) => (
                 <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                   <div>
                     <p className="text-sm font-bold text-slate-900 dark:text-white">{med.name}</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase">{med.dose}</p>
                   </div>
                   <span className={cn(
                     "text-[9px] font-black uppercase tracking-widest italic px-3 py-1 rounded-lg",
                     med.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                   )}>
                     {med.status}
                   </span>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;