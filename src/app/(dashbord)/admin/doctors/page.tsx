import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Doctor Management | HealBridge',
  description: 'Manage doctor profiles, verifications, and platform activity.',
};

const doctorsData = [
  { id: 1, name: "Dr. Charles Scott", specialty: "Neurology", joined: "24 Oct 2023", status: "Verified", rating: "4.8", image: "/specialties/neurology.png" },
  { id: 2, name: "Dr. Michael Brown", specialty: "Psychiatry", joined: "22 Oct 2023", status: "Verified", rating: "5.0", image: "/specialties/psychiatry.png" },
  { id: 3, name: "Dr. Sarah Johnson", specialty: "Cardiology", joined: "21 Oct 2023", status: "Pending", rating: "4.9", image: "/specialties/cardiology.png" },
  { id: 4, name: "Dr. Emily Davis", specialty: "Dermatology", joined: "20 Oct 2023", status: "Verified", rating: "4.7", image: "/specialties/dermatology.png" },
  { id: 5, name: "Dr. Robert Wilson", specialty: "Orthopedic", joined: "18 Oct 2023", status: "Suspended", rating: "4.5", image: "/specialties/orthopedics.png" },
];

const DoctorManagement = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Doctor <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Review and manage professional medical profiles on the platform.</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-teal-500 transition-all flex items-center gap-3">
          <Icons.userPlus className="w-5 h-5" />
          Add New Doctor
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Doctors', value: '1,240', color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Pending Verifications', value: '42', color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Active This Month', value: '+128', color: 'text-teal-500', bg: 'bg-teal-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
            <h3 className={cn("text-3xl font-black italic", stat.color)}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Doctors Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 px-6 py-2 rounded-xl border border-slate-100 dark:border-slate-800 w-full max-w-md">
            <Icons.search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or specialty..." 
              className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 dark:text-slate-300 w-full"
            />
          </div>
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-teal-500 transition-colors">
               <Icons.activity className="w-4 h-4" />
               Filter
             </button>
             <button className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-teal-500 transition-colors">
               <Icons.share2 className="w-4 h-4" />
               Export
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Doctor Profile</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Specialty</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Joined Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Rating</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctorsData.map((doc) => (
                <tr key={doc.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-teal-500/20 group-hover:border-teal-500 transition-colors">
                        <Image
                          src={doc.image}
                          alt={doc.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-base font-black text-slate-900 dark:text-white italic block">{doc.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">ID: HB-00{doc.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{doc.specialty}</span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{doc.joined}</span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Icons.star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                      <span className="text-sm font-black text-slate-900 dark:text-white">{doc.rating}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic ${
                      doc.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' :
                      doc.status === 'Pending' ? 'bg-orange-500/10 text-orange-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-500 transition-all">
                        <Icons.eye className="w-4 h-4" />
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

export default DoctorManagement;
