import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Patient Management | HealBridge',
  description: 'Manage patient accounts, medical history access, and system usage.',
};

const patientsData = [
  { id: 1, name: "John Doe", email: "john@example.com", joined: "15 Oct 2023", gender: "Male", age: "32", lastVisit: "24 Oct 2023" },
  { id: 2, name: "Sarah Jenkins", email: "sarah@example.com", joined: "12 Oct 2023", gender: "Female", age: "28", lastVisit: "22 Oct 2023" },
  { id: 3, name: "James Williams", email: "james@example.com", joined: "10 Oct 2023", gender: "Male", age: "45", lastVisit: "21 Oct 2023" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", joined: "08 Oct 2023", gender: "Female", age: "35", lastVisit: "20 Oct 2023" },
  { id: 5, name: "Robert Miller", email: "robert@example.com", joined: "05 Oct 2023", gender: "Male", age: "50", lastVisit: "18 Oct 2023" },
];

const PatientManagement = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Patient <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage user accounts and monitor patient activity across the platform.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-3">
             <Icons.share2 className="w-5 h-5" />
             Export Data
           </Button>
           <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex items-center gap-3">
             <Icons.userPlus className="w-5 h-5" />
             Register Patient
           </Button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 px-6 py-2 rounded-xl border border-slate-100 dark:border-slate-800 w-full max-w-md">
            <Icons.search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patients by name or email..." 
              className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 dark:text-slate-300 w-full"
            />
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Gender:</span>
             <select className="bg-transparent border-none outline-none text-xs font-black text-teal-500 uppercase italic cursor-pointer">
               <option>All Genders</option>
               <option>Male</option>
               <option>Female</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Patient</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Age / Gender</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Registered</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Last Visit</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientsData.map((pt) => (
                <tr key={pt.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500 font-black italic">
                        {pt.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-base font-black text-slate-900 dark:text-white italic block">{pt.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 lowercase">{pt.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{pt.age} Yrs</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase block italic">{pt.gender}</span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{pt.joined}</span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{pt.lastVisit}</span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-500 transition-all">
                        <Icons.activity className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 transition-all">
                        <Icons.share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;
