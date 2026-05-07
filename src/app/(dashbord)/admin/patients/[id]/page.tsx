import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Patient Profile | Admin Dashboard',
  description: 'Detailed view of patient medical history, billing, and activity.',
};

const PatientProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[2rem] bg-teal-500 flex items-center justify-center text-white text-3xl font-black italic shadow-2xl shadow-teal-500/20">
            JD
          </div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
              John <span className="text-teal-500">Doe</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Patient ID: HB-P-0024 | Member since Oct 2023</p>
          </div>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-3">
             <Icons.activity className="w-5 h-5" />
             Medical Records
           </Button>
           <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-teal-500 transition-all">
             Book Appointment
           </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Appointments', value: '12', icon: Icons.calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Completed', value: '10', icon: Icons.checkCircle, color: 'text-teal-500', bg: 'bg-teal-500/10' },
          { label: 'Cancelled', value: '2', icon: Icons.share2, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Total Spending', value: '$2,450', icon: Icons.activity, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Appointment History */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Appointment History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Doctor</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Date</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-right">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { doctor: 'Dr. Charles Scott', date: '24 Oct 2023', status: 'Completed', fee: '$600' },
                    { doctor: 'Dr. Sarah Johnson', date: '15 Oct 2023', status: 'Completed', fee: '$700' },
                    { doctor: 'Dr. Michael Brown', date: '10 Oct 2023', status: 'Cancelled', fee: '$0' },
                  ].map((apt, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 font-bold text-slate-900 dark:text-white">{apt.doctor}</td>
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center text-sm font-medium text-slate-500 dark:text-slate-400">{apt.date}</td>
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                        <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic ${
                          apt.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
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

        {/* Patient Details / Info */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
             <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-6">Patient Details</h4>
             <div className="space-y-6">
                {[
                  { label: 'Full Name', value: 'John Doe', icon: Icons.userCheck },
                  { label: 'Email', value: 'john@example.com', icon: Icons.mail },
                  { label: 'Phone', value: '+1 (315) 369-5943', icon: Icons.phone },
                  { label: 'Address', value: 'New York, USA', icon: Icons.mapPin },
                  { label: 'Date of Birth', value: '15 May 1992', icon: Icons.calendar },
                ].map((info, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{info.label}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{info.value}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
               <h4 className="text-xl font-black italic uppercase tracking-widest mb-2">Emergency Contact</h4>
               <p className="text-slate-400 font-medium text-sm mb-4">Jane Doe (Spouse)</p>
               <p className="text-2xl font-black tracking-tighter text-teal-400">+1 (315) 555-0123</p>
             </div>
             <Icons.phone className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
