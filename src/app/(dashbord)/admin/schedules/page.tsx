'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScheduleModal } from '@/components/dashboard/ScheduleModal';
import { AssignScheduleModal } from '@/components/dashboard/AssignScheduleModal';

const scheduleData = [
  { id: '1', date: '24 Oct 2023', startTime: '09:00 AM', endTime: '10:00 AM', status: 'Available' },
  { id: '2', date: '24 Oct 2023', startTime: '10:00 AM', endTime: '11:00 AM', status: 'Assigned' },
  { id: '3', date: '25 Oct 2023', startTime: '02:00 PM', endTime: '03:00 PM', status: 'Available' },
  { id: '4', date: '25 Oct 2023', startTime: '03:00 PM', endTime: '04:00 PM', status: 'Assigned' },
  { id: '5', date: '26 Oct 2023', startTime: '11:00 AM', endTime: '12:00 PM', status: 'Available' },
];

const doctorAssignmentsData = [
  { id: '1', doctor: "Dr. Charles Scott", specialty: "Neurology", date: "24 Oct 2023", time: "10:00 AM - 11:00 AM", status: "Booked" },
  { id: '2', doctor: "Dr. Michael Brown", specialty: "Psychiatry", date: "25 Oct 2023", time: "03:00 PM - 04:00 PM", status: "Available" },
  { id: '3', doctor: "Dr. Sarah Johnson", specialty: "Cardiology", date: "26 Oct 2023", time: "09:00 AM - 10:00 AM", status: "Available" },
];

const ScheduleManagement = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Schedule <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Define time slots and assign medical experts to shifts.</p>
        </div>
        <div className="flex gap-4">
           <ScheduleModal
             trigger={
               <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex items-center gap-3">
                 <Icons.plus className="w-5 h-5" />
                 Create Slot
               </Button>
             }
           />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Global Slots', value: '124', icon: Icons.activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Active Assignments', value: '86', icon: Icons.userCheck, color: 'text-teal-500', bg: 'bg-teal-500/10' },
          { label: 'Booked Sessions', value: '42', icon: Icons.calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center gap-6">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", stat.bg)}>
              <stat.icon className={cn("w-8 h-8", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white italic">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="global" className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <TabsList className="bg-slate-100 dark:bg-slate-900 p-2 rounded-[1.5rem] h-auto">
            <TabsTrigger value="global" className="px-8 py-3 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-teal-500 data-[state=active]:shadow-sm text-[10px] font-black uppercase tracking-widest italic">
              Global Time Slots
            </TabsTrigger>
            <TabsTrigger value="assignments" className="px-8 py-3 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-teal-500 data-[state=active]:shadow-sm text-[10px] font-black uppercase tracking-widest italic">
              Doctor Assignments
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs font-bold outline-none focus:border-teal-500 transition-colors"
              />
            </div>
            <Button variant="outline" className="h-12 w-12 p-0 rounded-xl border-slate-100 dark:border-slate-800">
              <Icons.filter className="w-4 h-4 text-slate-500" />
            </Button>
          </div>
        </div>

        <TabsContent value="global" className="mt-0">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Date</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Start Time</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">End Time</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 font-bold text-slate-900 dark:text-white italic">{item.date}</td>
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 font-black text-teal-500 italic uppercase tracking-wider text-xs">{item.startTime}</td>
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 font-black text-teal-500 italic uppercase tracking-wider text-xs">{item.endTime}</td>
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                        <span className={cn(
                          "inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic",
                          item.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
                        )}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-right">
                        <div className="flex justify-end gap-2">
                           <AssignScheduleModal
                             scheduleId={item.id}
                             trigger={
                               <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-500">
                                 <Icons.userPlus className="w-4 h-4" />
                               </Button>
                             }
                           />
                           <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500">
                             <Icons.close className="w-4 h-4" />
                           </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="mt-0">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Doctor</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Specialty</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Date & Time</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorAssignmentsData.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 italic">
                            {item.doctor.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{item.doctor}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest italic">{item.specialty}</span>
                      </td>
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                        <p className="text-sm font-bold text-slate-900 dark:text-white mb-0.5 italic">{item.date}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase italic">{item.time}</p>
                      </td>
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                        <span className={cn(
                          "inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic",
                          item.status === 'Booked' ? 'bg-orange-500/10 text-orange-500' : 'bg-emerald-500/10 text-emerald-500'
                        )}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-right">
                         <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500">
                           <Icons.close className="w-4 h-4" />
                         </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduleManagement;
