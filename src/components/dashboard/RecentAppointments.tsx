'use client';

import * as React from "react";
import { Icons } from "@/components/shared/Icons";
import Image from "next/image";

const appointments = [
  { id: 1, doctor: 'Dr. Charles Scott', patient: 'John Doe', date: '24 Oct 2023', time: '10:00 AM', status: 'Upcoming', amount: '$600' },
  { id: 2, doctor: 'Dr. Michael Brown', patient: 'Sarah Jenkins', date: '22 Oct 2023', time: '02:30 PM', status: 'Completed', amount: '$650' },
  { id: 3, doctor: 'Dr. Sarah Johnson', patient: 'James Williams', date: '21 Oct 2023', time: '11:15 AM', status: 'Cancelled', amount: '$700' },
  { id: 4, doctor: 'Dr. Harold Bryant', patient: 'Emily Davis', date: '20 Oct 2023', time: '04:00 PM', status: 'Completed', amount: '$500' },
];

const RecentAppointments = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
      <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Recent Appointments</h3>
        <button className="text-xs font-black text-teal-500 hover:text-teal-600 uppercase tracking-widest italic transition-colors">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Doctor</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Patient</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Date & Time</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Amount</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                      <Icons.userCheck className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{apt.doctor}</span>
                  </div>
                </td>
                <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 font-medium text-slate-500 dark:text-slate-400">{apt.patient}</td>
                <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                  <p className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{apt.date}</p>
                  <p className="text-[10px] font-black text-teal-500 uppercase italic">{apt.time}</p>
                </td>
                <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 font-black text-slate-900 dark:text-white italic">{apt.amount}</td>
                <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                  <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic ${
                    apt.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                    apt.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {apt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { RecentAppointments };
